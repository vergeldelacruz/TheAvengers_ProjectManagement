import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { lightColors } from '../../theme/colors';
import { commonStyles } from '../../theme/styles';
import { Feather } from '@expo/vector-icons'; 
import { useSelector } from 'react-redux';
import BackButton from '../../components/common/back-button';
import { PersonSingleLink } from '../../helpers/common';

const Admin = (props) => {
    const { theme } = useSelector((state) => state.commonReducer);

    const styles = getStyles(theme);

    return (
        <View style={{...commonStyles.mainContainer, backgroundColor: theme.background, flex: 1}}>
            <SafeAreaView>
                <BackButton navigation={props.navigation}/>
                <Text style={{...commonStyles.mainHeading, marginTop: 10, color: theme.dark}}>Admin Panel</Text>
                {PersonSingleLink("Projects", "briefcase", () => {props.navigation.navigate('Projects')}, theme, styles)}
                {PersonSingleLink("Users", "users", () => {props.navigation.navigate('Users')}, theme, styles)}
            </SafeAreaView>
            <StatusBar style="auto"></StatusBar>
        </View>
    );
}

export default Admin;

const getStyles = (theme) => {
    return StyleSheet.create({
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
            color: lightColors.dark,
            fontSize: 16,
            fontFamily: commonStyles.fontMedium,
        },
    });
}