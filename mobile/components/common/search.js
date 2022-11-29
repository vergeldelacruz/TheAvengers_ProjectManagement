import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { lightColors } from '../../theme/colors';
import { commonStyles } from '../../theme/styles';
import { Feather } from '@expo/vector-icons'; 
import { useSelector } from 'react-redux';

const SearchInput = ({searchString,onSearch}) => {
    const { theme } = useSelector((state) => state.commonReducer);

    return (
        <View style={{...styles.inputWrapper, backgroundColor: theme.light}}>
            <TextInput 
                placeholderTextColor={lightColors.grey}
                placeholder='Search here...' 
                style={{...styles.input, color: theme.dark, backgroundColor: theme.light, borderRadius: theme.borderRadius}} value={searchString} onChangeText={onSearch.bind(this)} />
            <Feather name="search" size={23} style={styles.icon} color={lightColors.grey} />
        </View>
    );
}

export default SearchInput;

const styles = StyleSheet.create({
    inputWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: lightColors.light,
        borderRadius: lightColors.borderRadius,
        // marginLeft: 20,
        // marginRight: 20,
    },
    input: {
        backgroundColor: lightColors.light,
        padding: 15,
        flexGrow: 2,
        fontFamily: commonStyles.fontMedium,
        maxWidth: '90%',
    },
    icon: {
        marginRight: 10,
        flexGrow: 0,
    }
})