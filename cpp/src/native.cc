#include "native.h"

namespace facebook::react {

NativeModule::NativeModule(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeModuleCxxSpec(std::move(jsInvoker)) {}

std::string NativeModule::reverseString(jsi::Runtime& rt, std::string input) {
  return std::string(input.rbegin(), input.rend());
}

} // namespace facebook::react
