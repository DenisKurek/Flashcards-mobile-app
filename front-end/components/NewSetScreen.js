import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { AuthContext } from "../store/AuthenticationContext";
import { API_URL } from "../store/Config";

function NewSetScreen({ navigation }) {
  const [setName, setSetName] = useState("");
  const ctx = useContext(AuthContext);

  const handleSetName = async () => {
    const response = await axios.post(API_URL + "/sets/add", {
      title: setName,
      user: ctx.state.user.emailAddress,
    });
    navigation.navigate("AddFlashcardScreen", { setName });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nazwa zestawu"
        value={setName}
        onChangeText={(value) => setSetName(value)}
      />
      <Button title="Dalej" onPress={handleSetName} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default NewSetScreen;
