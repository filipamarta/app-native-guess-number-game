import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  useWindowDimensions,
} from "react-native";
import GameTitle from "../components/ui/GameTitle";
import Colors from "../contants/colors";
import Card from "../components/ui/Card";
import GuessedRound from "../components/ui/GuessedRound";
import PrimaryButton from "../components/ui/PrimaryButton";

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

  const { height, width } = useWindowDimensions();

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

  const marginTop = height < 480 ? 15 : 50;

  let content = (
    <>
      <Text style={styles.confirmedGuessNumber}>{currentGuess}</Text>
      <Card
        title="Higher or lower?"
        firstButtonText="-"
        handleFirstButton={nextGuessHandler.bind(this, LOWER)}
        secondButtonText="+"
        handleSecondButton={nextGuessHandler.bind(this, GREATER)}
      />
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.cardPortraitContainer}>
          <Text style={styles.subtitlePortrait}>Higher or lower?</Text>
          <View style={styles.buttonsPortraitContainer}>
            <PrimaryButton
              text="-"
              handleOnPressButton={nextGuessHandler.bind(this, LOWER)}
            />
            <Text style={styles.confirmedGuessNumberPortrait}>
              {currentGuess}
            </Text>
            <PrimaryButton
              text="+"
              handleOnPressButton={nextGuessHandler.bind(this, GREATER)}
            />
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <View style={(styles.gameContainer, { marginTop: marginTop })}>
        <GameTitle title="Computer's guess" />
        {content}
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
  confirmedGuessNumberPortrait: {
    color: Colors.primary700,
    fontSize: 40,
    marginHorizontal: 30,
    fontFamily: "OpenSans_800ExtraBold",
    textAlign: "center",
  },
  subtitlePortrait: {
    color: Colors.secondary500,
    fontSize: 20,
    paddingBottom: 6,
    fontFamily: "OpenSans_500Medium",
  },
  cardPortraitContainer: {
    flexDirection: "column",
    width: "100%",
    padding: 16,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    backgroundColor: Colors.primary600,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonsPortraitContainer: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gameContainer: {
    flex: 1,
    alignItems: "center",
  },
  confirmedGuessNumber: {
    color: Colors.primary700,
    fontSize: 40,
    marginBottom: 30,
    fontFamily: "OpenSans_800ExtraBold",
    textAlign: "center",
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
