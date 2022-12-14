import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { lightColors } from "../../theme/colors";
import { commonStyles } from "../../theme/styles";
import Constants from "expo-constants";
import { useSelector } from "react-redux";

const Header = ({ userFirstName , userImage}) => {
  const { theme } = useSelector((state) => state.commonReducer);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.subTitle}>Welcome 👋🏻</Text>
        <Text style={{...styles.title, color: theme.dark}}>Hi, {userFirstName}</Text>
      </View>
      <View>
        {
          userImage && <TouchableOpacity>
            <Image
              style={styles.avatar}
              source={{
                uri: `${Constants.expoConfig.extra.userUrl}/${userImage}`,
              }}
            />
          </TouchableOpacity>
        }
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: lightColors.borderRadius,
  },
  subTitle: {
    color: lightColors.darkGrey,
    fontFamily: commonStyles.fontRegular,
  },
  title: {
    color: lightColors.dark,
    fontSize: 18,
    fontFamily: commonStyles.fontMedium,
  },
});
