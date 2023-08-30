#pragma once

#include <string>
#include <vector>

namespace cealgull{
namespace encoding{
namespace b64{
std::vector<uint8_t> base64decode(const std::string &encoded);
std::string base64encode(const std::vector<uint8_t> &plain);
}
}
}
