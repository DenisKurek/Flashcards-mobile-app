import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const SummaryScreen = ({ navigation, route }) => {
  const total = route.params?.total || 0;
  const correct = route.params?.correct || 0;
  const percent = total > 0 ? ((correct / total) * 100).toFixed(0) : 0;

  const handlePress = () => {
    navigation.navigate("UserMenu");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Podsumowanie</Text>
      <Text style={styles.text}>
        Znasz odpowiedź na {correct} z {total} fiszek ({percent}%)
      </Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Powrót do menu użytkownika</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 20,
  },
  text: {
    fontSize: 24,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#007aff",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SummaryScreen;
