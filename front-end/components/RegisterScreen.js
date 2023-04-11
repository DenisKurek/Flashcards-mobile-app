import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../store/AuthenticationContext";
import axios from "axios";
const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { state, login, logout } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      const response = await axios.post(state.API_URL + "/users/register", {
        emailAddress: email,
        password: password,
      });
      console.log(response.data);
      navigation.navigate("GuestMenu");
    } catch (error) {
      console.log(error);
      //TODO
      //handle error visualization
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(value) => setEmail(value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Hasło"
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Zarejestruj" onPress={handleRegister} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: "100%",
  },
  buttonContainer: {
    width: 200,
  },
});

export default RegisterScreen;
