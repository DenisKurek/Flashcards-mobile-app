import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

function NewSetScreen({ navigation }) {
  const [setName, setSetName] = useState("");

  const handleSetName = () => {
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
