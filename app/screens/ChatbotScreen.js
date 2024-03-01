import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import TypingAnimation from "../components/TypingAnimation";
import { useNavigation } from "@react-navigation/native";
import { Theme } from "../styling/Theme";

const ChatbotScreen = () => {
  const navigation = useNavigation();

  const timestamp = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const [messages, setMessages] = useState([
    { text: "Hi, How can I assist you today?", type: "bot", timestamp },
  ]);
  const [input, setInput] = useState("");

  const [isBotThinking, setIsBotThinking] = useState(false);

  const suggestions = [
    "What the events happening in London this weekend?",
    "Plan a two-day trip to London for me.",
    "I have a medical emergency, what should I do?",
    "Where can I find a good barber shop?",
  ];

  const handleInputChange = (value) => {
    setInput(value);
  };

  const handleSendMessage = async (userInput) => {
    const userMessage = { text: userInput, type: "user", timestamp };
    console.log("message:", userMessage["text"]);
    setMessages([...messages, userMessage]);

    setIsBotThinking(true);
    try {
      const response = await fetch("http://10.0.2.2:5000/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const responseData = await response.json();
      const botMessage = {
        text: responseData.reply,
        sourceDocs: responseData.source_docs,
        type: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };
      setIsBotThinking(false);
      setMessages((messages) => [...messages, botMessage]);
    } catch (error) {
      setIsBotThinking(false);
      console.error("Error sending message:", error);
    }

    setInput("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.iconContainer}
        >
          <ImageBackground
            source={require("../assets/images/user-profile.jpg")}
            style={{ width: 35, height: 35 }}
            imageStyle={{ borderRadius: 25 }}
          />
        </TouchableOpacity> */}
        <Button
          title="Drawer"
          onPress={() => navigation.openDrawer()}
          style={styles.drawerButton}
        />

        <View style={styles.textContainer}>
          <Text style={styles.headerText}>London Navigator</Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>
            A few suggestions to get you started:
          </Text>
          <View>
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionButton}
                onPress={() => handleSendMessage(suggestion)}
              >
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {messages.map((message, index) => (
          <View key={index} style={styles.messageRow}>
            <Image
              source={
                message.type === "user"
                  ? require("../assets/user.png")
                  : require("../assets/robot.png")
              }
              style={styles.icon}
            />
            <View
              style={[
                styles.message,
                message.type === "user"
                  ? styles.userMessage
                  : styles.botMessage,
              ]}
            >
              <Text>{message.text}</Text>
              {message.sourceDocs &&
                message.sourceDocs.map((doc, docIndex) => (
                  <Text key={docIndex}>
                    Doc #{docIndex + 1}: {doc.content} ({doc.doc})
                  </Text>
                ))}
              <Text style={styles.timestampStyle}>{message.timestamp}</Text>
            </View>
          </View>
        ))}
        {isBotThinking && (
          <View style={styles.messageRow}>
            <Image
              source={require("../assets/robot.png")}
              style={styles.icon}
            />
            <TypingAnimation />
          </View>
        )}
      </ScrollView>
      <Button
        title="Drawer"
        onPress={() => navigation.openDrawer()}
        style={styles.drawerButton}
      />

      <View style={styles.inputContainer}>
        <Image source={require("../assets/user.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={handleInputChange}
          maxLength={150}
        />
        <Button title="Send" onPress={() => handleSendMessage(input)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  header: {
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Center vertically
    justifyContent: "space-between", // Distribute space between items
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: Theme.colors.primary,
  },
  headerText: {
    color: Theme.colors.primaryText,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
  },
  iconContainer: {
    marginLeft: 10, // Adjust as needed
    marginTop: 30,
  },
  drawerButton: {
    marginLeft: 10, // Adjust as needed
    marginTop: 80,
  },
  textContainer: {
    flex: 1, // Take up remaining space
    alignItems: "center", // Center horizontally
    marginLeft: -65, // Compensate for the space taken by the icon
  },
  message: {
    padding: 10,
    marginVertical: 4,
    borderRadius: 5,
  },
  botMessage: {
    backgroundColor: "#e0e0e0", // Light grey for bot messages
    padding: 10,
    borderRadius: 20, // Rounded corners for the bubble
    marginVertical: 4,
    marginLeft: 10, // Space from the left edge or icon
    maxWidth: "80%", // Maximum width for bubble
    alignSelf: "flex-start", // Align to the start
  },

  userMessage: {
    backgroundColor: "#50c878", // Blue for user messages
    color: "white", // White text color
    padding: 10,
    borderRadius: 20, // Rounded corners for the bubble
    marginVertical: 4,
    marginRight: 10, // Space from the right edge
    maxWidth: "80%", // Maximum width for bubble
    alignSelf: "flex-end", // Align to the end
  },

  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  timestampStyle: {
    fontSize: 10,
    color: "#666",
    marginLeft: 8,
    marginBottom: 2,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 5,
  },

  inputContainer: {
    flexDirection: "row",
    padding: 8,
    marginBottom: 40,
  },
  input: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 8,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  suggestionsContainer: {
    padding: 10,
  },
  suggestionButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  suggestionText: {
    color: "#000",
  },
  suggestionsTitle: {
    fontWeight: "bold",
    marginLeft: 10, // Adjust as needed
    marginBottom: 5, // Space before the suggestions start
  },
});

export default ChatbotScreen;
