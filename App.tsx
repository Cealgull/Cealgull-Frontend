import Cealgull from "@src/Cealgull";
import configureApp from "@src/models/config";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#76EE00" }}
      text1Style={{
        fontSize: 15,
        fontWeight: "bold",
      }}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#FFD700" }}
      text1Style={{
        fontSize: 15,
        fontWeight: "bold",
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "#FF4500" }}
      text1Style={{
        fontSize: 15,
        fontWeight: "bold",
      }}
    />
  ),
};

export default function App() {
  const [hasInitialized, setHasInitialized] = useState(false);
  useEffect(() => {
    const appInitialize = async () => {
      if (hasInitialized) {
        return;
      }
      await configureApp();
      setHasInitialized(true);
    };
    appInitialize();
  }, [hasInitialized]);

  return (
    <>
      {hasInitialized ? <Cealgull /> : null}
      <StatusBar style="auto" />
      <Toast config={toastConfig} />
    </>
  );
}
