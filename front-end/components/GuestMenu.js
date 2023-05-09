import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const GuestMenu = () => {
  const navigation = useNavigation();
  const [buttonScale] = React.useState(new Animated.Value(1));

  const handleLoginPress = () => {
    navigation.navigate("LoginScreen");
  };

  const handleSignUpPress = () => {
    navigation.navigate("RegisterScreen");
  };

  const handleExitPress = () => {
    BackHandler.exitApp();
  };

  const handleButtonPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Witaj w Fiszkomat!</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#2196F3" }]}
        onPress={handleLoginPress}
        onPressIn={handleButtonPress}
      >
        <Animated.Text
          style={[styles.buttonText, { transform: [{ scale: buttonScale }] }]}
        >
          Zaloguj
        </Animated.Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#3F51B5" }]}
        onPress={handleSignUpPress}
        onPressIn={handleButtonPress}
      >
        <Animated.Text
          style={[styles.buttonText, { transform: [{ scale: buttonScale }] }]}
        >
          Utwórz konto
        </Animated.Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#757575" }]}
        onPress={handleExitPress}
        onPressIn={handleButtonPress}
      >
        <Animated.Text
          style={[styles.buttonText, { transform: [{ scale: buttonScale }] }]}
        >
          Wyjdź
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 50,
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    marginVertical: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default GuestMenu;
