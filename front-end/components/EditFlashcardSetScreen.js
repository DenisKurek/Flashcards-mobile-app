import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import { API_URL } from "../store/Config";
import axios from "axios";

const EditFlashcardSetScreen = ({ route }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [newFlashcard, setNewFlashcard] = useState("");
  const [editedFlashcard, setEditedFlashcard] = useState("");
  const { setId } = route.params;

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get(`${API_URL}/sets/${setId}`);
        const data = response.data;
        setFlashcards(data.flashcardsIds);
      } catch (error) {
        console.error(error);
        //TODO add error handling
      }
    };
    fetchFlashcards();
  }, [setId]);

  useEffect(() => {
    if (editedFlashcard == "") {
      return;
    }
    const chandleFlashcardChange = async () => {
      try {
        const response = await axios.put(
          `${API_URL}/flashcards/${editedFlashcard.id}`,
          {
            concept: editedFlashcard.concept,
            definition: editedFlashcard.definition,
          }
        );
        const data = response.data;
      } catch (error) {
        console.error(error);
        //TODO add error handling
      }
    };
    const changeTimeout = setTimeout(() => {
      chandleFlashcardChange();
    }, 1000);

    return () => {
      clearTimeout(changeTimeout);
    };
  }, [editedFlashcard]);

  const handleDeleteFlashcard = async (flashcardId) => {
    try {
      await axios.delete(`${API_URL}/flashcards/${flashcardId}`);
      setFlashcards(
        flashcards.filter((flashcard) => flashcard.id !== flashcardId)
      );
    } catch (error) {
      console.error(error);
      //TODO add error handling
    }
  };

  const handleAddFlashcard = async () => {
    try {
      const response = await axios.post(`${API_URL}/flashcards/add`, {
        setId,
        concept: newFlashcard.front,
        definition: newFlashcard.back,
      });
      setFlashcards([...flashcards, response.data]);
      setNewFlashcard("");
    } catch (error) {
      console.error(error);
      //TODO add error handling
    }
  };

  const renderFlashcard = ({ item }) => (
    <TouchableOpacity style={styles.flashcard}>
      <View style={styles.flashcardText}>
        <TextInput
          style={styles.input}
          defaultValue={item.concept}
          onChangeText={(concept) =>
            setEditedFlashcard({
              ...item,
              concept: concept,
            })
          }
        />
        <TextInput
          style={styles.input}
          defaultValue={item.definition}
          onChangeText={(definition) =>
            setEditedFlashcard({
              ...item,
              definition: definition,
            })
          }
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleDeleteFlashcard(item.id)}
        >
          <Text style={styles.buttonText}>Usuń</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zarządzaj fiszkami:</Text>
      <FlatList
        data={flashcards}
        renderItem={renderFlashcard}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
      <View style={styles.addFlashcard}>
        <Text style={styles.addFlashcardText}>Dodaj nową fiszkę:</Text>
        <View style={styles.addFlashcardInputs}>
          <TextInput
            style={styles.input}
            placeholder="angielski"
            value={newFlashcard.front}
            onChangeText={(text) =>
              setNewFlashcard({ ...newFlashcard, front: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="polski"
            value={newFlashcard.back}
            onChangeText={(text) =>
              setNewFlashcard({ ...newFlashcard, back: text })
            }
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddFlashcard}
          >
            <Text style={styles.buttonText}>Dodaj</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  flashcard: {
    padding: 10,
    backgroundColor: "#eee",
    marginBottom: 10,
    borderRadius: 5,
  },
  flashcardText: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 18,
  },
  addFlashcard: {
    marginTop: 20,
  },
  addFlashcardText: {
    fontSize: 20,
    marginBottom: 10,
  },
  addFlashcardInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#eee",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default EditFlashcardSetScreen;
