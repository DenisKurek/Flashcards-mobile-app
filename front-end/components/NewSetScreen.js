import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { AuthContext } from "../store/AuthenticationContext";
import { API_URL } from "../store/Config";

function NewSetScreen({ navigation }) {
  const [setName, setSetName] = useState("");
  const ctx = useContext(AuthContext);
  const [buttonOpacity] = useState(new Animated.Value(1));

  const handleSetName = async () => {
    // Animacja przycisku
    Animated.timing(buttonOpacity, {
      toValue: 0.5,
      duration: 200,
      useNativeDriver: true,
    }).start();

    const response = await axios.post(API_URL + "/sets/add", {
      title: setName,
      user: ctx.state.user.emailAddress,
    });

    const data = response.data;
    navigation.navigate("AddFlashcardScreen", {
      setId: data.id,
      setName: data.title,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Stwórz nowy zestaw</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="md-create" size={24} color="#ccc" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nazwa zestawu"
          value={setName}
          onChangeText={(value) => setSetName(value)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSetName}>
        <Animated.View style={[styles.buttonInner, { opacity: buttonOpacity }]}>
          <Text style={styles.buttonText}>Dalej</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5FCFF",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 60,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 20,
  },
  button: {
    marginTop: 40,
  },
  buttonInner: {
    backgroundColor: "#2980b9",
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NewSetScreen;
