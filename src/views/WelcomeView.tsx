import { Text } from "@rneui/themed";
import { User } from "@src/models/User";
import { SafeAreaView } from "react-native-safe-area-context";

export type WelcomeViewProps = {
  user: User;
  mnemonic: string;
};

export default function WelcomeView({ mnemonic, user }: WelcomeViewProps) {
  return (
    <>
      <SafeAreaView>
        <Text h1>注册成功</Text>
        <Text>{mnemonic}</Text>
      </SafeAreaView>
    </>
  );
}
