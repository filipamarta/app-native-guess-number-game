import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import Colors from "../../contants/colors";

const Card = ({
  title,
  inputValue,
  onChangeInputValue,
  firstButtonText,
  handleFirstButton,
  handleSecondButton,
  secondButtonText,
  hasInputValue,
}) => {
  return (
    <View style={styles.defineNumberContainer}>
      <Text style={styles.defineNumberTitle}>{title}</Text>
      {hasInputValue && (
        <TextInput
          style={styles.defineNumberInput}
          value={inputValue}
          onChangeText={onChangeInputValue}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
        />
      )}

      <View style={styles.buttonContainer}>
        <PrimaryButton
          text={firstButtonText}
          handleOnPressButton={handleFirstButton}
        />
        <PrimaryButton
          text={secondButtonText}
          handleOnPressButton={handleSecondButton}
        />
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  defineNumberTitle: {
    color: Colors.secondary500,
    fontSize: 20,
    paddingBottom: 6,
    fontFamily: "OpenSans_500Medium",
  },
  defineNumberContainer: {
    width: "100%",
    backgroundColor: Colors.primary600,
    borderRadius: 12,
    alignItems: "center",
    padding: 16,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  defineNumberInput: {
    width: 70,
    paddingBottom: 4,
    color: Colors.secondary500,
    borderBottomColor: Colors.secondary500,
    borderBottomWidth: 3,
    fontSize: 30,
    textAlign: "center",
    fontFamily: "OpenSans_800ExtraBold",
  },
  buttonContainer: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
  },
});
