import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { lightColors } from '../../theme/colors';
import { commonStyles } from '../../theme/styles';

const BackButton = ({ navigation }) => {
    const { theme } = useSelector((state) => state.commonReducer);

    return (
        <View style={{...styles.container, backgroundColor: theme.light}}>
            <TouchableOpacity onPress={() => {navigation.goBack()}}>
                <Ionicons name='chevron-back' size={25} color={theme.dark} />
            </TouchableOpacity>
        </View>
    );
}

export default BackButton;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: lightColors.light,
        width: 40,
        height: 40,
        borderRadius: lightColors.borderRadius,
    },
});