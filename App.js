import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import SignUpScreen from "./app/screens/SignUpScreen";
import LogInScreen from "./app/screens/LogInScreen";
import ChatbotScreen from "./app/screens/ChatbotScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            title: "Welcome Screen",
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="LogInScreen"
          component={LogInScreen}
          options={{
            title: "LogInScreen",
            headerShown: true,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{
            title: "SignUpScreen",
            headerShown: true,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="ChatbotScreen"
          component={ChatbotScreen}
          options={{
            title: "Chatbot Screen",
            headerShown: true,
            animation: "fade",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
