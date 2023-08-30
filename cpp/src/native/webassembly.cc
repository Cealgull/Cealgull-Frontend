#include "native/webassembly.h"
#include "encoding/base64.h"

namespace facebook::react {

NativeWebAssembly::NativeWebAssembly(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeWebAssemblyCxxSpec(std::move(jsInvoker)) {}

std::string NativeWebAssembly::reverseString(jsi::Runtime& rt, std::string input) {
  return std::string(input.rbegin(), input.rend());
}

} // namespace facebook::react
