#include "native/webcrypto.h"
#include "encoding/base64.h"

namespace facebook::react {

NativeCrypto::NativeCrypto(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeCryptoCxxSpec(std::move(jsInvoker)) {}

std::string NativeCrypto::reverseString(jsi::Runtime& rt, std::string input) {
  return std::string(input.rbegin(), input.rend());
}

std::string NativeCrypto::ringSign(jsi::Runtime& rt, cealgull::crypto::ringsig::RingSignSpec spec) {
  // auto sig = cealgull::crypto::ringsig::sign(spec);
  // return cealgull::encoding::b64::base64encode(sig);
  return spec.priv;
}


} // namespace facebook::react
