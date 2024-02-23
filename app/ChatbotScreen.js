import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import TypingAnimation from "./TypingAnimation";

const ChatbotScreen = () => {
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
        <Text style={styles.headerText}>London Navigator - ChatBot</Text>
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
                  ? require("./assets/user.png")
                  : require("./assets/robot.png")
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
              <Text style={styles.timestampStyle}>{message.timestamp}</Text>
            </View>
          </View>
        ))}
        {isBotThinking && (
          <View style={styles.messageRow}>
            <Image source={require("./assets/robot.png")} style={styles.icon} />
            <TypingAnimation />
          </View>
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <Image source={require("./assets/user.png")} style={styles.icon} />
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
    width: "100%", // Ensure the header fills the width
    height: 60, // Adjust the height as needed
    backgroundColor: "#335FFF",
    justifyContent: "center", // Centers the title text vertically
    alignItems: "center",
  },
  headerText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
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
