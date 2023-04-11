import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../store/AuthenticationContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, login, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLoginPress = () => {
    login({ email, password })
      .then(() => {
        navigation.navigate("UserMenu");
      })
      .catch((error) => {
        console.log(error);
        //TODO
        //add errorhanling visualization
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleEmailChange}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={handlePasswordChange}
        value={password}
        placeholder="Hasło"
        secureTextEntry
      />
      <Button
        style={styles.button}
        title="Zaloguj"
        onPress={handleLoginPress}
      />
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
    padding: 30,
    marginVertical: 30,
    borderRadius: 5,
    fontSize: 20,
  },
  input: {
    width: "80%",
    height: 50,
    marginVertical: 20,
    padding: 10,
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
  },
});

export default LoginScreen;
