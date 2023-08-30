#pragma once

#if __has_include(<React-Codegen/AppSpecsJSI.h>)  // CocoaPod headers on Apple
#include <React-Codegen/AppSpecsJSI.h>
#elif __has_include("AppSpecsJSI.h")  // CMake headers on Android
#include "AppSpecsJSI.h"
#endif

#include "crypto/ringsig.h"

#include <memory>
#include <string>
#include <vector>

namespace facebook::react {

class NativeCrypto : public NativeCryptoCxxSpec<NativeCrypto> {
 public:
  NativeCrypto(std::shared_ptr<CallInvoker> jsInvoker);
  std::string reverseString(jsi::Runtime &rt, std::string input);
  std::string ringSign(jsi::Runtime &rt, cealgull::crypto::ringsig::RingSignSpec spec);
};

}  // namespace facebook::react
