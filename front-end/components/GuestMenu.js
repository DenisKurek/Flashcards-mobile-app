import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const GuestMenu = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate("LoginScreen");
  };

  const handleSignUpPress = () => {
    navigation.navigate("RegisterScreen");
  };

  const handleExitPress = () => {
    BackHandler.exitApp();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Zaloguj</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
        <Text style={styles.buttonText}>Utwórz konto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleExitPress}>
        <Text style={styles.buttonText}>Wyjdź</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 20,
    marginVertical: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GuestMenu;
