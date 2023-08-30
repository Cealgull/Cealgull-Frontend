cmake_minimum_required(VERSION 3.13)

set(CMAKE_VERBOSE_MAKEFILE on)

add_compile_options(-fexceptions -frtti -std=c++17)

set(BUILD_OPENSSL ON)
set(OPENSSL_MODULES "")
set(OPENSSL_BUILD_VERSION "3.1.2")
if(${CMAKE_SYSTEM_NAME} MATCHES "Android")
  set(CROSS_ANDROID ON)
endif()

add_subdirectory(thirdparty/openssl-cmake openssl_build)

add_library(cppnative STATIC
  src/native/modprovider.cc
  src/native/webcrypto.cc
  src/native/webassembly.cc
  src/encoding/base64.cc
  src/crypto/ringsig.cc)

target_include_directories(cppnative PUBLIC include)
target_include_directories(react_codegen_AppSpecs PUBLIC include)
target_link_libraries(cppnative jsi react_nativemodule_core react_codegen_AppSpecs crypto)
