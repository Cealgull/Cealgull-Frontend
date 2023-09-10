import { useNavigation } from "@react-navigation/native";
import { Image } from "@rneui/base";
import { Icon } from "@rneui/themed";
import { StackScreenPropsGeneric } from "@src/@types/navigation";
import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const ProductionInfoView: React.FC = () => {
  const navigation =
    useNavigation<StackScreenPropsGeneric<"ProductionInfo">["navigation"]>();
  return (
    <View style={{ flex: 1 }}>
      <View style={ProductionInfoViewStyle.header}>
        <HeaderBarWrapper alignMethod="lc">
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Icon type="antdesign" name="left" size={24} />
          </TouchableOpacity>
          <Text style={ProductionInfoViewStyle.title}>产品信息</Text>
        </HeaderBarWrapper>
      </View>
      <View style={ProductionInfoViewStyle.content}>
        <View style={ProductionInfoViewStyle.imageWrapper}>
          <Image
            source={require("../Cealgull.png")}
            style={ProductionInfoViewStyle.image}
          />
        </View>
        <Text style={ProductionInfoViewStyle.text1}>Cealgull</Text>
        <Text style={ProductionInfoViewStyle.text2}>
          Next-generation fully anonymous forum software based on Web3
          technology and blockchain storage
        </Text>
        <View style={ProductionInfoViewStyle.develop}>
          <Text>Developer List:</Text>
          <Text>Fronted: Bojun Ren, Haocheng Wang</Text>
          <Text>Backend: Yiyang Wu, Ke Xv</Text>
        </View>
      </View>
      <View style={ProductionInfoViewStyle.bottom}>
        <Text style={ProductionInfoViewStyle.text3}>Version: 1.0</Text>
      </View>
    </View>
  );
};

const ProductionInfoViewStyle = StyleSheet.create({
  develop: {
    alignItems: "center",
    paddingTop: 30,
  },
  bottom: {
    flex: 2,
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 30,
  },
  imageWrapper: {
    width: "50%",
    aspectRatio: 1,
    marginTop: "8%",
  },
  header: {
    flex: 3,
    backgroundColor: "rgb(230,230,230)",
  },
  content: {
    flex: 20,
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text1: {
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
  },
  text2: {
    paddingTop: 10,
    fontSize: 16,
    color: "#828282",
    width: "80%",
    textAlign: "center",
  },
  text3: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
