import { Text } from "@rneui/base";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Cealgull() {
  return (
    <SafeAreaProvider>
      <SafeAreaProvider style={styles.container}>
        <Text>Elements</Text>
      </SafeAreaProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
