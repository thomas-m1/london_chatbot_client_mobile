import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import { Theme } from "../styling/Theme";
import { useAuth } from "../navigation/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(""); // Assuming you have state management for email
  const [password, setPassword] = useState(""); // Assuming you have state management for password
  const [loginStatusMessage, setLoginStatusMessage] = useState("");
  const { signIn } = useAuth();

  const handleLogin = () => {
    // Place the fetch call here
    fetch("http://172.30.92.218:8081/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Login successful") {
          setLoginStatusMessage("Login successful!");
          setTimeout(() => {
            navigation.navigate("Home"); // Replace 'Home' with the actual route name you want to navigate to
          }, 1500);

          signIn(); // Your AuthContext signIn function can be modified to accept parameters if needed
        } else {
          // Handle login failure
          // Show an error message to the user
          setLoginStatusMessage("Login Unsuccessful!");
          console.log(
            "Login failed. Please check your credentials and try again."
          );
        }
      })
      .catch((error) => {
        console.error(error); // Log the error or set an error message state to display
        setLoginStatusMessage("An error occurred. Please try again later.");
        // Handle network error
        // Show an error message to the user
      });
  };
  return (
    <ImageBackground
      source={require("../assets/images/chat-bg3.jpg")} // Use the background image used in other screens
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ paddingHorizontal: 25 }}>
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: 28,
              fontWeight: "500",
              color: Theme.colors.SecondaryText,
              marginBottom: 30,
            }}
          >
            Login
          </Text>

          <InputField
            label={"Email ID"}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color={Theme.colors.fadedText}
                style={{ marginRight: 5 }}
              />
            }
            value={email} // Set the value of input to the email state
            onChangeText={setEmail} //
            keyboardType="email-address"
          />

          <InputField
            label={"Password"}
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color={Theme.colors.fadedText}
                style={{ marginRight: 5 }}
              />
            }
            inputType="password"
            value={password} // Set the value of input to the password state
            onChangeText={setPassword} // Update the state when text changes
            // fieldButtonLabel={"Forgot?"}
            // fieldButtonFunction={() => {}}
          />

          <CustomButton label={"Login"} onPress={handleLogin} />
          <Text style={{ color: "green" }}>{loginStatusMessage}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Text>New to the app?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ color: Theme.colors.primary, fontWeight: "700" }}>
                {" "}
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;
