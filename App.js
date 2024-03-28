import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./app/navigation/AuthStackNavigator";
import DrawerNavigator from "./app/navigation/DrawerNavigator";
import { AuthProvider, useAuth } from "./app/navigation/AuthContext"; // Make sure to use the correct path

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </AuthProvider>
  );
}

// Extract the main content into a separate component to utilize useContext or useAuth hook
const AppContent = () => {
  const { isAuthenticated } = useAuth(); // Utilize the context to manage authentication state

  return isAuthenticated ? <DrawerNavigator /> : <AuthStack />;
};

export default App;
