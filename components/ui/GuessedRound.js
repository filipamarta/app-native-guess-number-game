import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../contants/colors";

const GuessedRound = ({ round, value }) => {
  return (
    <View style={styles.guessedRound}>
      <Text style={styles.guessedRoundText}>{`#${round}`}</Text>
      <Text style={styles.guessedRoundText}>{`Guessed number: ${value}`}</Text>
    </View>
  );
};

export default GuessedRound;

const styles = StyleSheet.create({
  guessedRound: {
    width: "100%",
    backgroundColor: Colors.primary700,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  guessedRoundText: {
    color: Colors.secondary500,
  },
});
