import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Alert, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { commonStyles } from '../../../theme/styles';
import { getProjects, deleteProject } from '../../../store/admin/project/projectActions';
import { lightColors } from '../../../theme/colors';
import { Feather } from '@expo/vector-icons'; 
import BackButton from '../../../components/common/back-button';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { rightSwipeDeleteAction } from '../../../helpers/common';

const Projects = (props) => {
    const { theme } = useSelector((state) => state.commonReducer);
    const { projects } = useSelector((state) => state.projectReducer);
    const dispatch = useDispatch();
    const styles = getStyles(theme);

    useEffect(() => {
        dispatch(getProjects());
    }, []);

    const swipeRight = (progress, dragX, item) => {
        return rightSwipeDeleteAction(progress, dragX, () => {
            Alert.alert(
                "Are you sure?",
                "You want to delete this project?",
                [
                    { text: "Cancel", onPress: () => {} },
                    { text: "OK", onPress: () => dispatch(deleteProject(item)) },
                ],
            );
        })
    }

    const renderItem = ({ item }) => {
        return item ? <Swipeable renderRightActions={
            (progress, dragX) => swipeRight(progress, dragX, item)
        }>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate("AddCategory", { item, isEdit: true });
            }}>
                <View style={styles.itemWrapper}>
                        <Text style={styles.itemText}>{item.name}</Text>
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
                    <Text style={{...commonStyles.mainHeading, marginTop: 10, color: theme.dark}}>Projects</Text>
                    <TouchableOpacity onPress={() => {props.navigation.navigate('AddProject')}}>
                        <Feather name="plus-circle" size={25} style={styles.icon} color={theme.dark} />
                    </TouchableOpacity>
                </View>
                <FlatList 
                    style={{flex: 1}}
                    data={projects}
                    renderItem={({item}) => renderItem({item})}
                />
            </SafeAreaView>
        </View>
    );
}

export default Projects;

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
        }
    });
}
