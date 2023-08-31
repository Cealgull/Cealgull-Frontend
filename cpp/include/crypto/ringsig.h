#pragma once

#if __has_include(<React-Codegen/AppSpecsJSI.h>)  // CocoaPod headers on Apple
#include <React-Codegen/AppSpecsJSI.h>
#elif __has_include("AppSpecsJSI.h")  // CMake headers on Android
#include "AppSpecsJSI.h"
#endif

#include <string>
#include <vector>
#include <memory>
#include <optional>
#include <functional>

namespace cealgull {
namespace crypto {
namespace ringsig {

struct RingSignSpec {
  std::string priv;
  std::string pubs;
  int num;
  int mine;

 public:
  RingSignSpec(const std::string &priv, const std::string &pubs, const int &num,
               const int &mine)
      : priv(priv), pubs(pubs), num(num), mine(mine) {}
};

std::optional<std::vector<uint8_t>> sign(const std::string &msg, const RingSignSpec &spec);

}  // namespace ringsig
}  // namespace crypto
}  // namespace cealgull

namespace facebook {
namespace react {
using RingSignSpec = cealgull::crypto::ringsig::RingSignSpec;
template <>
struct Bridging<RingSignSpec> {
  static RingSignSpec fromJs(jsi::Runtime &rt, const jsi::Object &value,
                             const std::shared_ptr<CallInvoker> &jsInvoker) {
    return RingSignSpec(
        bridging::fromJs<std::string>(rt, value.getProperty(rt, "priv"),
                                      jsInvoker),
        bridging::fromJs<std::string>(rt, value.getProperty(rt, "pubs"),
                                      jsInvoker),
        bridging::fromJs<int>(rt, value.getProperty(rt, "num"), jsInvoker),
        bridging::fromJs<int>(rt, value.getProperty(rt, "mine"), jsInvoker));
  }
  static jsi::Object toJs(jsi::Runtime &rt, const RingSignSpec &spec) {
    auto result = facebook::jsi::Object(rt);
    result.setProperty(rt, "priv", bridging::toJs(rt, spec.priv));
    result.setProperty(rt, "pubs", bridging::toJs(rt, spec.pubs));
    result.setProperty(rt, "num", bridging::toJs(rt, spec.num));
    result.setProperty(rt, "mine", bridging::toJs(rt, spec.mine));
    return result;
  }
};
}  // namespace react
}  // namespace facebook
