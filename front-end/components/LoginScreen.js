import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../store/AuthenticationContext";
import Icon from "react-native-vector-icons/FontAwesome";

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
      <Text style={styles.title}>Zaloguj się</Text>
      <View style={styles.inputContainer}>
        <Icon name="envelope-o" size={20} color="gray" />
        <TextInput
          style={styles.input}
          onChangeText={handleEmailChange}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="gray" />
        <TextInput
          style={styles.input}
          onChangeText={handlePasswordChange}
          value={password}
          placeholder="Hasło"
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Zaloguj</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        <Text style={styles.linkButtonText}>
          Nie masz jeszcze konta? Zarejestruj się!
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkButton} onPress={() => {}}>
        <Text style={styles.linkButtonText}>Nie pamiętasz hasła?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  linkButton: {
    marginTop: 10,
  },
  linkButtonText: {
    color: "gray",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
