import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import Colors from "../../contants/colors";

const PrimaryButton = ({ text, handleOnPressButton }) => {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.buttonPressed]
            : styles.buttonInnerContainer
        }
        onPress={handleOnPressButton}
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    width: "auto",
    borderRadius: 50,
    marginHorizontal: 4,
    flex: 1,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    padding: 8,
    fontFamily: "OpenSans_500Medium",
  },
  buttonPressed: {
    opacity: 0.75,
  },
});
