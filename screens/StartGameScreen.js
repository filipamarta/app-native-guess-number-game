import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import GameTitle from "../components/ui/GameTitle";
import Card from "../components/ui/Card";

const StartGameScreen = ({ setUserNumber }) => {
  const [guessNumber, setGuessNumber] = useState("");

  const { height } = useWindowDimensions();

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

  const marginTop = height < 480 ? 20 : 60;

  return (
    <ScrollView style={(styles.screen, { marginTop: marginTop })}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
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
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
