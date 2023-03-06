import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import GameTitle from "../components/ui/GameTitle";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../contants/colors";

const GameOverScreen = ({ userNumber, roundsNumber, onStartNewGame }) => {
  return (
    <>
      <Text style={styles.subtitle}>Game Over</Text>
      <GameTitle title="We have a winner!" />
      <View style={styles.imageWrapper}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/winner-trophy-cup-prize-award-best-first-achievement-29309.png")}
            resizeMode="contain"
            style={styles.image}
            resizeMethod="resize"
          />
        </View>
      </View>
      <Text style={styles.result}>
        Your phone needed{" "}
        <Text style={styles.resultHighlight}>{roundsNumber}</Text> rounds to
        guess the number{" "}
        <Text style={styles.resultHighlight}>{userNumber}</Text>
      </Text>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          text="Start new game"
          handleOnPressButton={onStartNewGame}
        />
      </View>
    </>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: "OpenSans_500Medium",
    fontSize: 20,
  },
  imageWrapper: {
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
    width: "100%",
    backgroundColor: "black",
  },
  imageContainer: {
    borderRadius: 200,
    borderWidth: 5,
    width: 250,
    height: 250,
    borderColor: Colors.secondary500,
    overflow: "hidden",
    margin: 30,
    backgroundColor: "white",
  },
  image: { width: "100%", height: "100%" },
  result: {
    fontFamily: "OpenSans_500Medium",
    fontSize: 24,
    textAlign: "center",
  },
  resultHighlight: { fontFamily: "OpenSans_800ExtraBold", fontSize: 24 },
  buttonContainer: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "60%",
  },
});
