#include "crypto/ringsig.h"

#include <openssl/bn.h>
#include <openssl/ec.h>
#include <openssl/evp.h>

#include <string>

namespace cealgull {
namespace crypto {
namespace ringsig {
std::vector<EC_POINT *> pubs2EC_POINT(const std::string &pubs, int num) {
  return {};
}
std::vector<uint8_t> sign(const RingSignSpec &spec) {
  return {};
}

}  // namespace ringsig
}  // namespace crypto
}  // namespace cealgull
