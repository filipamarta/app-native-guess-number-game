import React, { useState } from "react";
import { Alert } from "react-native";
import GameTitle from "../components/ui/GameTitle";
import Card from "../components/ui/Card";

const StartGameScreen = ({ setUserNumber }) => {
  const [guessNumber, setGuessNumber] = useState("");

  const handleOnPressReset = () => {
    setGuessNumber("");
  };

  const handleOnPressConfirm = () => {
    setUserNumber(guessNumber);
  };

  const handleOnChangeInputText = (e) => {
    const chosenNumber = parseInt(e);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number", "Number has to be between 1 and 99.", [
        { text: "Got It", style: "default", onPress: handleOnPressReset },
      ]);
    } else {
      setGuessNumber(e);
    }
  };

  return (
    <>
      <GameTitle title="Guess my number" />
      <Card
        title="Enter a number"
        hasInputValue
        inputValue={guessNumber}
        onChangeInputValue={handleOnChangeInputText}
        firstButtonText="Reset"
        handleFirstButton={handleOnPressReset}
        secondButtonText="Confirm"
        handleSecondButton={handleOnPressConfirm}
      />
    </>
  );
};

export default StartGameScreen;
