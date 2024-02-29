// import React from "react";
// import { View, Image, StyleSheet, Button } from "react-native";

// const WelcomeScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Image
//         source={require("../assets/background.jpg")}
//         style={StyleSheet.absoluteFill}
//       />
//       <View style={styles.logoContainer}>
//         <Image
//           source={require("../assets/logo.png")}
//           style={{ width: 200, height: 200 }}
//           resizeMode="contain"
//         />
//         <View style={styles.buttonContainer}>
//           <Button
//             title="Log In"
//             onPress={() => navigation.navigate("LogInScreen")}
//           />
//           <Button
//             title="Sign Up"
//             onPress={() => navigation.navigate("SignUpScreen")}
//           />
//           <Button
//             title="Continue without logging in"
//             onPress={() => navigation.navigate("ChatbotScreen")}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   logoContainer: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   buttonContainer: {
//     marginTop: 30,
//   },
// });

// export default WelcomeScreen;