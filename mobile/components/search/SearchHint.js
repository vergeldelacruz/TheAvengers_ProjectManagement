import React from "react";
import { lightColors } from "../../theme/colors";
import { commonStyles } from "../../theme/styles";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const SearchHint = ({ count }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.showResultsText}>Showing {count} results</Text>
    </View>
  );
};
export default SearchHint;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  showResultsText: {
    fontSize: 13,
    fontFamily: commonStyles.fontRegular,
    color: lightColors.darkGrey,
  },
});