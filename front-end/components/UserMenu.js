import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const UserMenu = ({ navigation }) => {
  const handleCreateSetPress = () => {
    navigation.navigate("NewSetScreen");
  };

  const handleSetsPress = () => {
    navigation.navigate("FlashcardsScreen");
  };

  const handleLogoutPress = () => {
    navigation.navigate("GuestMenu");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Witaj w menu użytkownika</Text>
      <View style={styles.buttonContainer}>
        <Button title="Utwórz zestaw" onPress={handleCreateSetPress} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Zestawy" onPress={handleSetsPress} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Wyloguj" onPress={handleLogoutPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 50,
    width: "80%",
  },
});

export default UserMenu;
