import React from "react";
import { StyleSheet, Text } from "react-native";
import Colors from "../../contants/colors";

const GameTitle = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

export default GameTitle;

const styles = StyleSheet.create({
  title: {
    color: Colors.primary700,
    fontSize: 30,
    paddingBottom: 20,
    fontFamily: "OpenSans_800ExtraBold",
  },
});
