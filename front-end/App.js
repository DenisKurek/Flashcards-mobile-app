import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import GuestMenu from "./components/GuestMenu";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import UserMenu from "./components/UserMenu";
import FlashcardsScreen from "./components/FlashcardsScreen";
import FlashcardScreen from "./components/FlashcardScreen";
import SummaryScreen from "./components/SummaryScreen";
import AddFlashcardScreen from "./components/AddFlashcardScreen";
import NewSetScreen from "./components/NewSetScreen";
import AboutScreen from "./components/AboutScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GuestMenu">
        <Stack.Screen name="GuestMenu" component={GuestMenu} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="UserMenu" component={UserMenu} />
        <Stack.Screen name="FlashcardsScreen" component={FlashcardsScreen} />
        <Stack.Screen name="FlashcardScreen" component={FlashcardScreen} />
        <Stack.Screen name="SummaryScreen" component={SummaryScreen} />
        <Stack.Screen
          name="AddFlashcardScreen"
          component={AddFlashcardScreen}
        />
        <Stack.Screen name="NewSetScreen" component={NewSetScreen} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
