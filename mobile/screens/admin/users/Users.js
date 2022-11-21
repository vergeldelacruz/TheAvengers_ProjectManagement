import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Alert, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { commonStyles } from '../../../theme/styles';
import { getUsers, deleteUser } from '../../../store/admin/user/userActions';
import { lightColors } from '../../../theme/colors';
import { Feather } from '@expo/vector-icons'; 
import BackButton from '../../../components/common/back-button';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { rightSwipeDeleteAction } from '../../../helpers/common';

const Users = (props) => {
    const { theme } = useSelector((state) => state.commonReducer);
    const { users } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const styles = getStyles(theme);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const swipeRight = (progress, dragX, item) => {
        return rightSwipeDeleteAction(progress, dragX, () => {
            Alert.alert(
                "Are you sure?",
                "You want to delete this user?",
                [
                    { text: "Cancel", onPress: () => {} },
                    { text: "OK", onPress: () => dispatch(deleteUser(item)) },
                ],
            );
        })
    }

    const renderItem = ({ item }) => {
        return item ? <Swipeable renderRightActions={
            (progress, dragX) => swipeRight(progress, dragX, item)
        }>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate("AddUser", { item, isEdit: true });
            }}>
                <View style={styles.itemWrapper}>
                    <View>
                        <Text style={styles.itemText}>{item.firstName} {item.lastName}</Text>
                        <Text style={{fontSize: 12, marginTop: 5, color: theme.darkGrey}}>{item.email}</Text>
                        <View style={styles.icons}>
                            <View style={{...styles.subIcon, backgroundColor: item.role == 'Member' ? theme.secondary : theme.primary}}><Feather name={'user'} size={10} color={'#fff'} /><Text style={styles.iconText}>{item.role}</Text></View>
                        </View>
                    </View>
                    <Feather name="chevron-right" size={20} style={{color: lightColors.grey}} color={lightColors.dark} />
                </View>
            </TouchableOpacity>
        </Swipeable> : null;
    }

    return (
        <View style={{flex: 1, backgroundColor: theme.background, }}>
            <SafeAreaView style={{...styles.mainContent, margin: 20}}>
                <BackButton navigation={props.navigation}/>
                <View style={{...styles.header}}>
                    <Text style={{...commonStyles.mainHeading, marginTop: 10, color: theme.dark}}>Users</Text>
                    <TouchableOpacity onPress={() => {props.navigation.navigate('AddUser')}}>
                        <Feather name="plus-circle" size={25} style={styles.icon} color={theme.dark} />
                    </TouchableOpacity>
                </View>
                <FlatList 
                    style={{flex: 1}}
                    data={users}
                    renderItem={({item}) => renderItem({item})}
                />
            </SafeAreaView>
        </View>
    );
}

export default Users;

const getStyles = (theme) => {
    return StyleSheet.create({
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
        },
        mainContent: {
            flex: 1, 
            flexDirection: 'column'
        },
        itemWrapper: {
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 10,
            padding: 15,
            borderRadius: lightColors.borderRadius,
            backgroundColor: theme.light,
        },
        itemText: {
            color: theme.dark,
            fontSize: 16,
            fontFamily: commonStyles.fontMedium,
        },
        icons: {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
        },
        subIcon: {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 10,
            marginRight: 10,
            padding: 3,
            paddingHorizontal: 10,
            backgroundColor: theme.secondary,
            borderRadius: lightColors.borderRadius,
        },
        iconText: {
            color: '#fff',
            fontSize: 10,
            marginLeft: 3,
            fontFamily: commonStyles.fontMedium,
        },
    });
}
