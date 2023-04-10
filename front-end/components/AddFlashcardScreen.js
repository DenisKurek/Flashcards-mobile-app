import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddFlashcardScreen = ({ navigation, route }) => {
  const { setName } = route.params;
  const [english, setEnglish] = useState("");
  const [polish, setPolish] = useState("");
  const [flashcards, setFlashcards] = useState([]);

  const handleSaveFlashcards = async () => {
    try {
      await AsyncStorage.setItem(setName, JSON.stringify(flashcards));
      navigation.navigate("FlashcardsScreen", {
        setName: setName,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddFlashcard = () => {
    const newFlashcards = [...flashcards, { english, polish }];
    setFlashcards(newFlashcards);
    setEnglish("");
    setPolish("");
  };

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
      <TouchableOpacity style={styles.addButton} onPress={handleAddFlashcard}>
        <Text style={styles.buttonText}>Dodaj fiszkę</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.saveButton}
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
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    width: "80%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default AddFlashcardScreen;
