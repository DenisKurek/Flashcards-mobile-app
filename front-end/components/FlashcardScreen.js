import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FlashcardScreen = ({ route }) => {
  const { setName } = route.params;
  const [flashcards, setFlashcards] = useState([]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const flashcardsJSON = await AsyncStorage.getItem(setName);
        if (flashcardsJSON != null) {
          setFlashcards(JSON.parse(flashcardsJSON));
          setCurrentFlashcardIndex(0);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFlashcards();
  }, [setName]);

  useEffect(() => {
    if (
      currentFlashcardIndex >= flashcards.length &&
      flashcards &&
      flashcards.length > 0
    ) {
      navigation.navigate("SummaryScreen", {
        total: flashcards.length,
        correct: correctAnswersCount,
      });
    }
  }, [currentFlashcardIndex, correctAnswersCount, flashcards]);

  const handleCorrectAnswer = () => {
    setCurrentFlashcardIndex(
      (currentFlashcardIndex) => currentFlashcardIndex + 1
    );
    setIsFlipped(false);
    setCorrectAnswersCount(correctAnswersCount + 1);
  };

  const handleIncorrectAnswer = () => {
    setCurrentFlashcardIndex(
      (currentFlashcardIndex) => currentFlashcardIndex + 1
    );
    setIsFlipped(false);
  };

  const handleFlipCard = () => {
    setIsFlipped((isFlipped) => !isFlipped);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  if (!flashcards || !flashcards[currentFlashcardIndex]) {
    return null;
  }

  const currentFlashcard = flashcards[currentFlashcardIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{setName}</Text>
      <Text style={styles.counter}>
        {currentFlashcardIndex + 1}/{flashcards.length}
      </Text>
      <TouchableOpacity style={styles.flashcard} onPress={handleFlipCard}>
        <Text style={styles.title}>
          {isFlipped ? currentFlashcard.polish : currentFlashcard.english}
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.success]}
          onPress={handleCorrectAnswer}
        >
          <Text style={styles.buttonText}>Umiem</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.danger]}
          onPress={handleIncorrectAnswer}
        >
          <Text style={styles.buttonText}>Nie umiem</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  flashcard: {
    backgroundColor: "lightgray",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  success: {
    backgroundColor: "green",
  },
  danger: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  counter: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default FlashcardScreen;
