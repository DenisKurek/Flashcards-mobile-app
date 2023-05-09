import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

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
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          { backgroundColor: "#3498db", borderColor: "#2980b9" },
        ]}
        onPress={handleCreateSetPress}
        activeOpacity={0.7}
      >
        <Icon name="add-circle-outline" size={50} color="#fff" />
        <Text style={styles.buttonText}>Utwórz zestaw</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          { backgroundColor: "#e74c3c", borderColor: "#c0392b" },
        ]}
        onPress={handleSetsPress}
        activeOpacity={0.7}
      >
        <Icon name="albums-outline" size={50} color="#fff" />
        <Text style={styles.buttonText}>Moje zestawy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          { backgroundColor: "#2ecc71", borderColor: "#27ae60" },
        ]}
        onPress={handleLogoutPress}
        activeOpacity={0.7}
      >
        <Icon name="log-out-outline" size={50} color="#fff" />
        <Text style={styles.buttonText}>Wyloguj</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    width: "80%",
    borderRadius: 10,
    borderWidth: 2,
    paddingVertical: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
});

export default UserMenu;
