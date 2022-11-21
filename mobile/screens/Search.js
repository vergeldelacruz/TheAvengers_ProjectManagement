import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { commonStyles } from '../theme/styles';
import SearchInput from '../components/common/search';

export default function Search(props) {
  const { theme } = useSelector((state) => state.commonReducer);
  const dispatch = useDispatch();
  const styles = getStyles(theme);

  return (
    <View style={{backgroundColor: theme.background, flex: 1}}>
      <SafeAreaView>
        <StatusBar barStyle={theme.barStyle}/>
        <View style={{...commonStyles.mainContainer, backgroundColor: theme.background}}>
          <SearchInput onSearch={() => {}} />
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