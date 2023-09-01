#include "native/webcrypto.h"
#include "encoding/base64.h"

namespace facebook::react {

NativeCrypto::NativeCrypto(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeCryptoCxxSpec(std::move(jsInvoker)) {}

std::string NativeCrypto::reverseString(jsi::Runtime& rt, std::string input) {
  return std::string(input.rbegin(), input.rend());
}

std::string NativeCrypto::ringSign(
    jsi::Runtime& rt, std::string msg,
    cealgull::crypto::ringsig::RingsigSpec spec) {
  return cealgull::crypto::ringsig::sign(spec, msg).value_or("");
}

}  // namespace facebook::react
