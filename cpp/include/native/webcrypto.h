#pragma once

#if __has_include(<React-Codegen/AppSpecsJSI.h>)  // CocoaPod headers on Apple
#include <React-Codegen/AppSpecsJSI.h>
#elif __has_include("AppSpecsJSI.h")  // CMake headers on Android
#include "AppSpecsJSI.h"
#endif

#include <memory>
#include <string>
#include <vector>

#include "crypto/ringsig.h"

namespace facebook::react {
class NativeCrypto : public NativeCryptoCxxSpec<NativeCrypto> {
 public:
  NativeCrypto(std::shared_ptr<CallInvoker> jsInvoker);
  std::string reverseString(jsi::Runtime &rt, std::string input);
  std::string ringSign(jsi::Runtime &rt, std::string msg,
                       cealgull::crypto::ringsig::RingsigSpec spec);
};

using RingsigSpec = cealgull::crypto::ringsig::RingsigSpec;
template <>
struct Bridging<RingsigSpec> {
  static RingsigSpec fromJs(jsi::Runtime &rt, const jsi::Object &value,
                            const std::shared_ptr<CallInvoker> &jsInvoker) {
    return RingsigSpec{
        bridging::fromJs<std::string>(rt, value.getProperty(rt, "priv"),
                                      jsInvoker),
        bridging::fromJs<std::string>(rt, value.getProperty(rt, "pubs"),
                                      jsInvoker),
        bridging::fromJs<int>(rt, value.getProperty(rt, "nr_mem"), jsInvoker),
        bridging::fromJs<int>(rt, value.getProperty(rt, "mine"), jsInvoker)};
  }

  static jsi::Object toJs(jsi::Runtime &rt, const RingsigSpec &value) {
    auto result = jsi::Object(rt);
    result.setProperty(rt, "priv", bridging::toJs(rt, value.priv));
    result.setProperty(rt, "pubs", bridging::toJs(rt, value.pubs));
    result.setProperty(rt, "nr_mem", bridging::toJs(rt, value.nr_mem));
    result.setProperty(rt, "mine", bridging::toJs(rt, value.mine));
    return result;
  }
};
}  // namespace facebook::react
