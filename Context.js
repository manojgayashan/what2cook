import React, { createContext, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import COLORS from "./src/constants/colors";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [homeUrl, setHomeUrl] = useState('https://dhabione.com/');

  return (
    <SafeAreaProvider>
      <AppContext.Provider
        value={{
          homeUrl,
          setHomeUrl
        }}
      >

        <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.whiteMain} />
        {children}
      </AppContext.Provider>
    </SafeAreaProvider>
  );
};