cmake_minimum_required(VERSION 3.13)

set(CMAKE_VERBOSE_MAKEFILE on)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

add_compile_options(-fexceptions -frtti -std=c++17)

add_library(cppnative STATIC src/native.cc)

target_include_directories(cppnative PUBLIC include)
target_include_directories(react_codegen_AppSpecs PUBLIC include)
target_link_libraries(cppnative jsi react_nativemodule_core react_codegen_AppSpecs)
