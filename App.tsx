import Cealgull from "@src/Cealgull";
import configureApp from "@src/models/config";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

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
    </>
  );
}
