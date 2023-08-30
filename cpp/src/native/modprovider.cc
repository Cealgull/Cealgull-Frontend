#include "native/webcrypto.h"
#include "native/webassembly.h"
#include "native/modprovider.h"

namespace facebook::react {

std::shared_ptr<TurboModule> TurboModuleProvider::getTurboModule(
    const std::string& name,
    std::shared_ptr<CallInvoker> jsInvoker) const {
  if (name == "NativeCrypto") {
    return std::make_shared<facebook::react::NativeCrypto>(jsInvoker);
  } else if (name == "NativeWebAssembly") {
    return std::make_shared<facebook::react::NativeWebAssembly>(jsInvoker);
  }
  // Other C++ Turbo Native Modules for you app
  return nullptr;
}

} // namespace facebook::react
