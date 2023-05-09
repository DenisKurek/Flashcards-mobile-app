import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../store/AuthenticationContext";
import { API_URL } from "../store/Config";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { state, login, logout } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      const response = await axios.post(API_URL + "/users/register", {
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
      <View style={styles.iconContainer}>
        <MaterialIcons name="person-add" size={64} color="#4f4f4f" />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputIconContainer}>
          <MaterialIcons name="email" size={24} color="#4f4f4f" />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputIconContainer}>
          <MaterialIcons name="lock" size={24} color="#4f4f4f" />
          <TextInput
            placeholder="Hasło"
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry={true}
            style={styles.input}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleRegister}>
        <Text style={styles.buttonText}>Zarejestruj</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F5FCFF",
  },
  iconContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: "100%",
  },
  input: {
    marginLeft: 10,
    fontSize: 16,
    color: "#4f4f4f",
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#4f4f4f",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RegisterScreen;
