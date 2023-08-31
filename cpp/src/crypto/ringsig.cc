#include "crypto/ringsig.h"

#include <openssl/bn.h>
#include <openssl/ec.h>
#include <openssl/evp.h>

#include <exception>
#include <optional>
#include <string>

#include "encoding/base64.h"

namespace cealgull {
namespace crypto {
namespace ringsig {
constexpr int POINT_SIZE = 65;
constexpr int PRIV_SIZE = 32;

using BN_unique_ptr = std::unique_ptr<BIGNUM, std::function<decltype(BN_free)>>;
using BN_CTX_unique_ptr =
    std::unique_ptr<BN_CTX, std::function<decltype(BN_CTX_free)>>;
using EC_POINT_unique_ptr =
    std::unique_ptr<EC_POINT, std::function<decltype(EC_POINT_free)>>;
using EC_GROUP_unique_ptr =
    std::unique_ptr<EC_GROUP, std::function<decltype(EC_GROUP_free)>>;
using BN_CTX_unique_ptr =
    std::unique_ptr<BN_CTX, std::function<decltype(BN_CTX_free)>>;
using EVP_MD_CTX_unique_ptr =
    std::unique_ptr<EVP_MD_CTX, std::function<decltype(EVP_MD_CTX_free)>>;

static inline BN_unique_ptr ring_BN_rand() {
  BN_unique_ptr bn(BN_new(), BN_free);
  if (BN_rand(bn.get(), PRIV_SIZE * 8, BN_RAND_TOP_TWO, BN_RAND_BOTTOM_ANY) ==
      0) {
    throw std::bad_alloc();
  }
  return bn;
}

static std::vector<EC_POINT_unique_ptr> pubs2EC_POINT(const EC_GROUP *g,
                                                      const std::string &pubs,
                                                      int num) {
  auto b = encoding::b64::base64decode(pubs);
  if (b.size() != num * POINT_SIZE) throw std::bad_alloc();

  std::vector<EC_POINT_unique_ptr> points(num);

  for (int i = 0; i < num; i++) {
    points[i] = EC_POINT_unique_ptr(EC_POINT_new(g), EC_POINT_free);

    if (points[i] == nullptr) throw new std::bad_alloc();

    if (EC_POINT_oct2point(g, points[i].get(), b.data() + i * POINT_SIZE,
                           POINT_SIZE, nullptr) <= 0)
      throw std::bad_alloc();
  }
  return points;
}

static BN_unique_ptr priv2BN(const std::string &priv) {
  auto b = encoding::b64::base64decode(priv);
  auto bn = BN_unique_ptr(BN_bin2bn(b.data(), b.size(), nullptr), BN_free);
  if (bn == nullptr) throw std::bad_alloc();
  return bn;
}

EVP_MD_CTX_unique_ptr initH1ctx(const std::string &msg) {
  auto mctx = EVP_MD_CTX_unique_ptr(EVP_MD_CTX_new(), EVP_MD_CTX_free);

  if (mctx == nullptr) throw std::bad_alloc();

  if (EVP_DigestInit(mctx.get(), EVP_sm3()) <= 0) throw new std::bad_alloc();

  if (EVP_DigestUpdate(mctx.get(), msg.data(), msg.size()) <= 0)
    throw std::bad_alloc();

  return mctx;
}

static BN_unique_ptr hash_msg2BN(const EVP_MD_CTX *mctx,
                                 const std::vector<uint8_t> &msg) {
  uint32_t dst_len;
  uint8_t buf[32];

  auto bn = BN_unique_ptr(BN_new(), BN_free);

  if (bn == nullptr) throw std::bad_alloc();

  auto new_mctx = EVP_MD_CTX_unique_ptr(EVP_MD_CTX_dup(mctx), EVP_MD_CTX_free);

  if (new_mctx == nullptr) throw std::bad_alloc();

  if (EVP_DigestUpdate(new_mctx.get(), msg.data(), msg.size()) <= 0)
    throw std::bad_alloc();
  if (EVP_DigestFinal(new_mctx.get(), buf, &dst_len) <= 0)
    throw std::bad_alloc();

  if (BN_bin2bn(buf, dst_len, bn.get()) == nullptr) throw std::bad_alloc();
  return bn;
}

static BN_unique_ptr hash_EC_POINT2BN(const EVP_MD_CTX *mctx, const EC_GROUP *g,
                                      const EC_POINT_unique_ptr &&p) {
  auto sz = EC_POINT_point2oct(g, p.get(), POINT_CONVERSION_UNCOMPRESSED,
                               nullptr, 0, nullptr);
  if (sz == 0) throw std::bad_alloc();

  std::vector<uint8_t> msg(sz, 0);

  if (EC_POINT_point2oct(g, p.get(), POINT_CONVERSION_UNCOMPRESSED, msg.data(),
                         sz, nullptr) <= 0)
    throw std::bad_alloc();

  return hash_msg2BN(mctx, msg);
}

static std::vector<uint8_t> serialize(
    const EC_GROUP_unique_ptr &&g, const BN_unique_ptr &&c0,
    const std::vector<EC_POINT_unique_ptr> &&pubs,
    const std::vector<BN_unique_ptr> &&r) {
  std::vector<uint8_t> ret = std::vector<uint8_t>();

  {
    std::vector<uint8_t> buf(32, 0);
    std::string sig;
    BN_bn2bin(c0.get(), buf.data());
    ret.insert(ret.end(), buf.begin(), buf.end());
  }

  for (auto &&pub : pubs) {
    auto sz = EC_POINT_point2oct(
        g.get(), pub.get(), POINT_CONVERSION_UNCOMPRESSED, nullptr, 0, nullptr);
    std::vector<uint8_t> buf(sz, 0);
    EC_POINT_point2oct(g.get(), pub.get(), POINT_CONVERSION_UNCOMPRESSED,
                       buf.data(), sz, nullptr);
    ret.insert(ret.end(), buf.begin(), buf.end());
  }

  for (auto &&bn : r) {
    std::vector<uint8_t> buf(32, 0);
    std::string sig;
    BN_bn2bin(bn.get(), buf.data());
    ret.insert(ret.end(), buf.begin(), buf.end());
  }

  return ret;
}

std::optional<std::vector<uint8_t>> sign(const std::string &msg,
                                         const RingSignSpec &spec) {
  try {
    auto g =
        EC_GROUP_unique_ptr(EC_GROUP_new_by_curve_name(NID_sm2), EC_GROUP_free);
    auto order = BN_unique_ptr(BN_new(), BN_free);
    if (EC_GROUP_get_order(g.get(), order.get(), nullptr) == 0)
      throw std::bad_alloc();
    auto mctx = initH1ctx(msg);
    auto pubs = pubs2EC_POINT(g.get(), spec.pubs, spec.num);
    auto priv = priv2BN(spec.priv);
    auto k = ring_BN_rand();
    int n = spec.num;
    int pi = spec.mine;
    std::vector<BN_unique_ptr> r(n);
    std::vector<BN_unique_ptr> c(n);
    {
      auto p = EC_POINT_unique_ptr(EC_POINT_new(g.get()), EC_POINT_free);
      if (p == nullptr) throw std::bad_alloc();
      if (EC_POINT_mul(g.get(), p.get(), k.get(), nullptr, nullptr, nullptr) ==
          0)
        throw std::bad_alloc();
      c[(pi + 1) % n] = hash_EC_POINT2BN(mctx.get(), g.get(),
                                         std::move(p));  // c_i+1 = H(m, k * G)
    }

    for (int i = (pi + 1) % n; i != pi; i = (i + 1) % n) {
      r[i] = ring_BN_rand();
      auto p = EC_POINT_unique_ptr(EC_POINT_new(g.get()), EC_POINT_free);
      if (EC_POINT_mul(g.get(), p.get(), r[i].get(), pubs[i].get(), c[i].get(),
                       nullptr) == 0) {
        throw std::bad_alloc();
      }
      c[(i + 1) % n] = hash_EC_POINT2BN(mctx.get(), g.get(), std::move(p));
    }

    r[pi] = ring_BN_rand();

    auto bctx = BN_CTX_unique_ptr(BN_CTX_new(), BN_CTX_free);
    if (BN_mod_mul(r[pi].get(), c[pi].get(), priv.get(), order.get(),
                   bctx.get()) == 0)
      throw std::bad_alloc();

    if (BN_mod_sub(r[pi].get(), k.get(), r[pi].get(), order.get(),
                   bctx.get()) == 0)
      throw std::bad_alloc();

    return serialize(std::move(g), std::move(c[0]), std::move(pubs),
                     std::move(r));

  } catch (std::bad_alloc &) {
    return std::nullopt;
  }
}

}  // namespace ringsig
}  // namespace crypto
}  // namespace cealgull
