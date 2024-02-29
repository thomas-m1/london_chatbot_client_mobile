import React from "react";

import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './app/navigation/AuthStackNavigator';

function App() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}

export default App;