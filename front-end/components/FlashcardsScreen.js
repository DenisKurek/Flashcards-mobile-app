import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { AuthContext } from "../store/AuthenticationContext";
import { StyleSheet } from "react-native";
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
      <Text style={styles.setName}>{item.name}</Text>
      <Text style={styles.setLength}>
        {item.flashcards ? item.flashcards.length : 0} fiszek
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Twoje zestawy fiszek:</Text>
      <FlatList
        data={flashcardSets}
        renderItem={renderFlashcardSet}
        keyExtractor={(item) => item.setName}
        style={styles.list}
      />
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
  list: {
    width: "100%",
  },
  flashcardSet: {
    backgroundColor: "lightgray",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  setName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  setLength: {
    fontSize: 14,
  },
});

export default FlashcardsScreen;
