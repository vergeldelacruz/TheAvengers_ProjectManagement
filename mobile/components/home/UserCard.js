import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { SvgXml } from 'react-native-svg';
import { commonStyles } from '../../theme/styles';

export default function UserCard({ user }) {
    const { theme } = useSelector((state) => state.commonReducer);
    const styles = getStyles(theme);

    return (
        <View style={styles.container}>
            <SvgXml xml={user.avatar} width={70} height={70} style={styles.image}/>
            <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
            <Text style={styles.designation}>{user.jobTitle}</Text>
        </View>
    )
}

const getStyles = (theme) => {
    return StyleSheet.create({
        container: {
            borderRadius: 10,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            width: 150,
            height: 150,
        },
        name: {
            fontSize: 14,
            fontFamily: commonStyles.fontMedium,
            color: theme.dark,
            marginTop: 15,
        },
        designation: {
            fontSize: 13,
            fontFamily: commonStyles.fontRegular,
            color: theme.darkGrey,
            marginTop: 5,
        },
        image: {
            borderRadius: 50,
            width: 80,
            height: 80,
        }
    })
}