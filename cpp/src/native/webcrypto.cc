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
    cealgull::crypto::ringsig::RingSignSpec spec) {
  auto sig = cealgull::crypto::ringsig::sign(msg, spec);
  if (sig.has_value())
    return cealgull::encoding::b64::base64encode(sig.value());
  else
    return "";
}

}  // namespace facebook::react
