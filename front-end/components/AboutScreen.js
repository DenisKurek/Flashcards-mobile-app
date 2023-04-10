import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>O aplikacji</Text>
      <Text style={styles.text}>
        Ta aplikacja została stworzona w celach edukacyjnych i demonstracyjnych.
      </Text>
      <Text style={styles.text}>
        Wykorzystano w niej technologie React oraz React Native.
      </Text>
      <Text style={styles.text}>
        Aplikacja jest narzędziem do nauki poprzez fiszki. Użytkownik może
        tworzyć zestawy fiszek składające się z pytań i odpowiedzi, a następnie
        uczyć się ich w trybie powtórki.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default AboutScreen;
