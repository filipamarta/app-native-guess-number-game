import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import GameTitle from "../components/ui/GameTitle";
import Colors from "../contants/colors";
import Card from "../components/ui/Card";
import GuessedRound from "../components/ui/GuessedRound";

let MIN_NUMBER = 1;
let MAX_NUMBER = 100;
const LOWER = "lower";
const GREATER = "greater";

const generateRandomNumberBetween = (min, max, exclude) => {
  const randomNbr = Math.floor(Math.random() * (max - min)) + min;

  if (randomNbr === exclude) {
    return generateRandomNumberBetween(min, max, exclude);
  }
  return randomNbr;
};

const GameScreen = ({ userNumber, onGameOver }) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomNumberBetween(1, 100, userNumber)
  );

  const [guessedLog, setGuessedLog] = useState([
    { id: currentGuess, value: currentGuess },
  ]);

  useEffect(() => {
    if (currentGuess == userNumber) {
      onGameOver(guessedLog.length);
      setCurrentGuess(generateRandomNumberBetween(1, 100, ""));
    }
  }, [currentGuess, onGameOver, userNumber]);

  useEffect(() => {
    MIN_NUMBER = 1;
    MAX_NUMBER = 100;
  }, []);

  const nextGuessHandler = (direction) => {
    if (
      (direction === LOWER && currentGuess < userNumber) ||
      (direction === GREATER && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie", "You know that this is wrong", [
        { text: "Sorry", style: "default" },
      ]);
      return;
    }
    if (direction === LOWER) {
      MAX_NUMBER = currentGuess;
    } else {
      MIN_NUMBER = currentGuess + 1;
    }
    const newRandomNbr = generateRandomNumberBetween(
      MIN_NUMBER,
      MAX_NUMBER,
      currentGuess
    );
    setGuessedLog((prev) => [
      { id: newRandomNbr, value: newRandomNbr },
      ...prev,
    ]);
    setCurrentGuess(newRandomNbr);
  };

  return (
    <>
      <View style={styles.gameContainer}>
        <GameTitle title="Computer's guess" />
        <Text style={styles.confirmedGuessNumber}>{currentGuess}</Text>
        <Card
          title="Higher or lower?"
          firstButtonText="-"
          handleFirstButton={nextGuessHandler.bind(this, LOWER)}
          secondButtonText="+"
          handleSecondButton={nextGuessHandler.bind(this, GREATER)}
        />
      </View>
      <View style={styles.guessedLogContainer}>
        <FlatList
          data={guessedLog}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <GuessedRound
              round={guessedLog.length - itemData.index}
              value={itemData.item.value}
            />
          )}
        />
      </View>
    </>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  gameContainer: {
    marginTop: 60,
    flex: 1,
    alignItems: "center",
  },
  confirmedGuessNumber: {
    color: Colors.primary700,
    fontSize: 40,
    marginBottom: 30,
    fontFamily: "OpenSans_800ExtraBold",
  },
  guessedLogContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 30,
    width: 300,
    height: 200,
    overflow: "scroll",
  },
});
