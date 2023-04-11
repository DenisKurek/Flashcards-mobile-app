import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";

const FlashcardsScreen = ({ navigation }) => {
  const [flashcardSets, setFlashcardSets] = useState([]);

  useEffect(() => {
    const fetchFlashcardSets = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const allSets = await AsyncStorage.multiGet(keys);
        const sets = allSets.map((set) => {
          return { setName: set[0], flashcards: JSON.parse(set[1]) };
        });
        setFlashcardSets(sets);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFlashcardSets();
  }, []);

  const renderFlashcardSet = ({ item }) => (
    <TouchableOpacity
      style={styles.flashcardSet}
      onPress={() =>
        navigation.navigate("FlashcardScreen", { setName: item.setName })
      }
    >
      <Text style={styles.setName}>{item.setName}</Text>
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
