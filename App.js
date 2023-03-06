import React, { useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  OpenSans_500Medium,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
import { StyleSheet, View, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "./contants/colors";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState("");
  const [gameIsOver, setGameIsOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({ OpenSans_500Medium, OpenSans_800ExtraBold });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const onGameOver = (rounds) => {
    setGameIsOver(true);
    setGuessRounds(rounds);
  };

  const startNewGameHandler = () => {
    setUserNumber("");
    setGameIsOver(false);
    setGuessRounds(0);
  };

  let screen = <StartGameScreen setUserNumber={setUserNumber} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={onGameOver} />;
  }

  if (userNumber && gameIsOver) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primary300, Colors.tertiary300]}
      style={styles.rootScreen}
      onLayout={onLayoutRootView}
    >
      <ImageBackground
        source={require("./assets/images/brett-jordan-4aB1nGtD_Sg-unsplash.jpg")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.innerRootScreen}>
          <View style={styles.innerRootScreen}>
            <StatusBar style="auto" />
            {screen}
          </View>
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    opacity: 0.1,
  },
  innerRootScreen: {
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
