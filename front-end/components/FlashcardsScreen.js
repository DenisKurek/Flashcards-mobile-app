import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../store/AuthenticationContext";
import { API_URL } from "../store/Config";
import axios from "axios";

const FlashcardsScreen = ({ navigation }) => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const ctx = useContext(AuthContext);

  useEffect(() => {
    const fetchFlashcardSets = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/users/${ctx.state.user.emailAddress}/sets`
        );
        const data = response.data;
        const sets = data.map((set) => {
          return {
            id: set.id,
            name: set.title,
            flashcards: set.flashcardsIds,
          };
        });
        setFlashcardSets(sets);
      } catch (error) {
        //TODO add errorchandling
        console.error(error);
      }
    };
    fetchFlashcardSets();
  }, []);

  const renderFlashcardSet = ({ item }) => (
    <TouchableOpacity
      style={styles.flashcardSet}
      onPress={() =>
        navigation.navigate("FlashcardScreen", {
          setId: item.id,
          setName: item.name,
        })
      }
    >
      <View style={styles.flashcardSetRow}>
        <View style={styles.setNameContainer}>
          <Text style={styles.setName}>{item.name}</Text>
          <Text style={styles.setLength}>
            {item.flashcards ? item.flashcards.length : 0} fiszek
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.editButton, styles.button]}
            onPress={() =>
              navigation.navigate("EditFlashcardSetScreen", { setId: item.id })
            }
          >
            <Text style={styles.buttonText}>Edytuj</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.deleteButton, styles.button]}
            onPress={() =>
              deleteFlashcardSet(item.id, ctx.state.user.emailAddress)
            }
          >
            <Text style={styles.buttonText}>Usuń</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const deleteFlashcardSet = async (setId, userEmail) => {
    try {
      await axios.delete(`${API_URL}/sets/${setId}?userEmail=${userEmail}`);
      setFlashcardSets(flashcardSets.filter((set) => set.id !== setId));
    } catch (error) {
      console.error(error);
      //TODO add error handling
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Twoje zestawy fiszek:</Text>
      <FlatList
        data={flashcardSets}
        renderItem={renderFlashcardSet}
        keyExtractor={(item) => item.setId}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  flashcardSet: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    marginBottom: 10,
    padding: 20,
    width: "100%",
  },
  flashcardSetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  setNameContainer: {
    flex: 3,
  },
  setName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  setLength: {
    fontSize: 18,
    color: "#666",
  },
  buttonContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: "#0066cc",
  },
  deleteButton: {
    backgroundColor: "#cc0000",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  list: {
    width: "100%",
  },
});

export default FlashcardsScreen;
