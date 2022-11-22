import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { lightColors } from '../../theme/colors';
import { useSelector } from 'react-redux';
import { commonStyles } from '../../theme/styles';
import { Feather } from '@expo/vector-icons';
import { STATUS_COLORS } from '../../helpers/common';

export default function TaskCard({ task}) {
    const { theme } = useSelector((state) => state.commonReducer);
    const styles = getStyles(theme);

    const renderItem = () => {
        return task ? <View style={styles.itemWrapper}>
            <View style={{flex: 1}}>
                <Text style={styles.itemText}>{task.name}</Text>
                <Text style={{fontSize: 12, marginTop: 5, color: theme.darkGrey, width: '90%'}} numberOfLines={3} >{task.description}</Text>
                <View style={styles.icons}>
                    <View style={{...styles.subIcon, backgroundColor: STATUS_COLORS[task.status]}}>
                        <Feather name={'bookmark'} size={15} color={'#fff'} />
                        <Text style={styles.iconText}>{task.status}</Text>
                    </View>
                </View>
            </View>
            <Feather name="chevron-right" size={20} style={{color: lightColors.grey}} color={lightColors.dark} />
        </View> : null;
    }

    return (
        <View>
            {renderItem()}
        </View>
    )
}

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