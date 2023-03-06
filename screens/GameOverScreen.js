import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  useWindowDimensions,
  Platform,
} from "react-native";
import GameTitle from "../components/ui/GameTitle";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../contants/colors";

const GameOverScreen = ({ userNumber, roundsNumber, onStartNewGame }) => {
  const { width } = useWindowDimensions();
  let imageSize = 300;

  if (width > 600) {
    imageSize = 100;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
  };

  const content = (
    <View style={styles.screenRoot}>
      <Text style={styles.subtitle}>Game Over</Text>
      <GameTitle title="We have a winner!" />

      <View style={[styles.imageContainer, imageStyle]}>
        <Image
          source={require("../assets/images/winner-trophy-cup-prize-award-best-first-achievement-29309.png")}
          resizeMode="contain"
          style={styles.image}
          resizeMethod="resize"
        />
      </View>

      <Text style={styles.result}>
        Your phone needed{" "}
        <Text style={styles.resultHighlight}>{roundsNumber}</Text> rounds to
        guess the number{" "}
        <Text style={styles.resultHighlight}>{userNumber}</Text>
      </Text>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          text={Platform.OS === "android" ? "Start again" : "Let's do it again"}
          handleOnPressButton={onStartNewGame}
        />
      </View>
    </View>
  );

  return (
    <>
      {width > 600 ? (
        <ScrollView style={styles.screen}>{content}</ScrollView>
      ) : (
        <>{content}</>
      )}
    </>
  );
};

export default GameOverScreen;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenRoot: { justifyContent: "center", flex: 1, alignItems: "center" },
  subtitle: {
    fontFamily: "OpenSans_500Medium",
    fontSize: 20,
  },
  imageContainer: {
    borderRadius: 500,
    borderWidth: Platform.select({ ios: 3, android: 5 }),
    borderColor: Colors.secondary500,
    overflow: "hidden",
    margin: 20,
    backgroundColor: "white",
  },
  image: { width: "100%", height: "100%" },
  result: {
    fontFamily: "OpenSans_500Medium",
    fontSize: deviceWidth < 380 ? 20 : 24,
    textAlign: "center",
  },
  resultHighlight: {
    fontFamily: "OpenSans_800ExtraBold",
    fontSize: deviceWidth < 380 ? 20 : 24,
  },
  buttonContainer: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "60%",
  },
});
