import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/common/header'
import { PersonSingleLink } from '../helpers/common';
import { changeTheme } from '../store/common/commonActions';
import { lightColors } from '../theme/colors';
import { commonStyles } from '../theme/styles'

export default function Person(props) {
  const { theme } = useSelector((state) => state.commonReducer);
  const dispatch = useDispatch();
  const styles = getStyles(theme);

  return (
    <View style={{
      ...commonStyles.mainContainer,
      flex: 1,
      backgroundColor: theme.background,
    }}>
      <SafeAreaView>
        <StatusBar barStyle={theme.barStyle}/>
        <View>
            <Text style={{...commonStyles.mainHeading, color: theme.dark}}>Hi! Litson</Text>
            {PersonSingleLink('My Profile', 'user', () => {
              props.navigation.navigate('MyProfile');
            }, theme, styles)}
            {PersonSingleLink('My Projects', 'briefcase', () => {}, theme, styles)}
            {PersonSingleLink('Admin Panel', 'database', () => {
              props.navigation.navigate('Admin');
            }, theme, styles)}
            {PersonSingleLink('Change Theme', theme == lightColors ? 'sun' : 'moon', () => {
              dispatch(changeTheme());
            }, theme, styles, theme == lightColors ? 'sun' : 'moon')}
            {PersonSingleLink("Settings", "settings", () => {}, theme, styles)}
            {PersonSingleLink("Help", "help-circle", () => {
                props.navigation.navigate('Details');
            }, theme, styles)}
            {PersonSingleLink("About", "info", () => {}, theme, styles)}
        </View>
      </SafeAreaView>
    </View>
  )
}

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      height: "100%",
      padding: 20,
      paddingTop: 40,
    },
    itemList: {
      width: "100%",
    },
    buttonWrapper: {
      marginTop: 10,
    },
    button: {
      width: "100%",
      height: 50,
      backgroundColor: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonLabel: {
      color: "black",
      fontWeight: "bold",
    },
    linkWrapper: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      marginBottom: 10,
      marginTop: 10,
      paddingBottom: 10,
    },
    icon: {
      marginRight: 10,
    },
    link: {
      color: theme.dark,
      fontSize: 16,
      fontFamily: commonStyles.fontMedium,
    },
  });
}