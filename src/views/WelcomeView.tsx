import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "@rneui/themed";
import {
  LoginTabScreenPropsGeneric,
  StackScreenPropsGeneric,
} from "@src/@types/navigation";
import { useSetUser } from "@src/hooks/useUser";
import { User } from "@src/models/User";
import { SafeAreaView } from "react-native-safe-area-context";

export type WelcomeViewProps = {
  user: User;
  mnemonic: string;
};

export default function WelcomeView({ mnemonic, user }: WelcomeViewProps) {
  const rootNavigation =
    useNavigation<StackScreenPropsGeneric<"Login">["navigation"]>();
  const loginNavigation =
    useNavigation<LoginTabScreenPropsGeneric<"UserAdd">["navigation"]>();
  const setUser = useSetUser();
  const handleOnEnter = () => {
    setUser(user);
    rootNavigation.navigate("Main");
  };
  return (
    <>
      <SafeAreaView>
        <Text h2>（此页面仍在开发）</Text>
        <Text h1>注册成功</Text>
        <Text>{user.profile.username}</Text>
        <Text>{mnemonic}</Text>
        <Button type="outline" title={"进入论坛"} onPress={handleOnEnter} />
        <Button
          type="outline"
          title={"返回主界面"}
          onPress={() => loginNavigation.navigate("UserLogin")}
        />
      </SafeAreaView>
    </>
  );
}
