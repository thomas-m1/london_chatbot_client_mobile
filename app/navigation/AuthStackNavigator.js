import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingScreen from "../screens/OnboardingScreen";
// import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from "../screens/RegisterScreen";
import ChatbotScreen from "../screens/ChatbotScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ChatbotScreen" component={ChatbotScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
