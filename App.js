import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./app/navigation/AuthStackNavigator";
import DrawerNavigator from "./app/navigation/DrawerNavigator";

function App() {
  return (
    <NavigationContainer>
      {/* <AuthStack /> */}
      {<DrawerNavigator />}
    </NavigationContainer>
  );
}

export default App;
