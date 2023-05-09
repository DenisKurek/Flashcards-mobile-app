import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

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
      <View style={styles.percentContainer}>
        <Ionicons
          name="md-checkmark-circle-outline"
          size={80}
          color="#7ED321"
        />
        <Text style={styles.percentText}>{percent}%</Text>
      </View>
      <Text style={styles.text}>
        Znasz odpowiedź na {correct} z {total} fiszek
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
    paddingHorizontal: 30,
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 20,
  },
  percentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 40,
  },
  percentText: {
    fontSize: 64,
    fontWeight: "bold",
    marginLeft: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 50,
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  button: {
    backgroundColor: "#48C774",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
});

export default SummaryScreen;
