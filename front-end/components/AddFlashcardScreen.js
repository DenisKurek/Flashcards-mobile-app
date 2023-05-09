import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../store/Config";
import axios from "axios";

const AddFlashcardScreen = ({ navigation, route }) => {
  const { setName } = route.params;
  const [english, setEnglish] = useState("");
  const [polish, setPolish] = useState("");
  const [buttonAnim] = useState(new Animated.Value(0));

  const handleSaveFlashcards = async () => {
    try {
      navigation.navigate("UserMenu");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddFlashcard = async () => {
    const response = await axios.post(API_URL + "/flashcards/add", {
      concept: english,
      definition: polish,
      set: setName,
    });
    console.log(response);
    setEnglish("");
    setPolish("");
    animateButton();
  };

  const animateButton = () => {
    Animated.timing(buttonAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(buttonAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  const buttonScale = buttonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dodaj fiszkę do zestawu {setName}</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Słowo po angielsku"
          value={english}
          onChangeText={(text) => setEnglish(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Słowo po polsku"
          value={polish}
          onChangeText={(text) => setPolish(text)}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, styles.addButton]}
        onPress={handleAddFlashcard}
      >
        <Animated.Text
          style={[styles.buttonText, { transform: [{ scale: buttonScale }] }]}
        >
          Dodaj fiszkę
        </Animated.Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.saveButton]}
        onPress={handleSaveFlashcards}
      >
        <Text style={styles.buttonText}>Zapisz fiszki</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 18,
    borderColor: "#ccc",
  },
  addButton: {
    backgroundColor: "#4caf50",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#2196f3",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 100,
  },
});

export default AddFlashcardScreen;
