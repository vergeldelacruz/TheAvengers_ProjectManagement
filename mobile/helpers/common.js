import * as Haptics from 'expo-haptics';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RectButton } from 'react-native-gesture-handler';
import { Animated, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { lightColors } from '../theme/colors';
import { commonStyles } from '../theme/styles';
import Constants from 'expo-constants';

export const API_URL = Constants.expoConfig.extra.apiUrl;

const LocalStorage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
});

const SESSION_STORAGE_KEY = 'avengers-projects-user-session';
const THEME_STORAGE_KEY = 'avengers-projects-theme';

export const LightHaptics = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
}

export const setTheme = async (theme) => {
    console.log('setTheme => ', theme);
    LocalStorage.save({
        key: THEME_STORAGE_KEY,
        data: theme,
    });
}

export const getTheme = async () => {
    let theme = await LocalStorage.load({
        key: THEME_STORAGE_KEY,
    }).catch((err) => {
        console.log(err.message);
    });
    return theme;
}

// export const getSessionInfoFromLocal = async () => {
    
//     let session = await LocalStorage.load({
//         key: SESSION_STORAGE_KEY,
//     }).catch((err) => {
//         console.log(err.message);
//     });

//     return session;
// }

// export const removeSessionInfoFromLocal = async () => {
//     return await LocalStorage.remove({
//         key: SESSION_STORAGE_KEY,
//     });
// }

const styles = {
    deleteButton: {
        backgroundColor: 'red',
        marginTop: 0,
        marginBottom: 10,
        marginLeft: 10,
        width: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: lightColors.borderRadius
    },
};

export const rightSwipeDeleteAction = (progress, dragX, onPress) => {
    const trans = dragX.interpolate({
        inputRange: [0, 50, 100, 101],
        outputRange: [-20, 0, 0, 1],
    });
    return (
        <RectButton style={styles.deleteButton} onPress={onPress}>
            <Animated.Text style={[
                styles.actionText,
                // {transform: [{ translateX: trans }]},
            ]}>
                <Feather name="trash-2" size={25} style={styles.icon} color={lightColors.light} />
            </Animated.Text>
        </RectButton>
    );
}

export const PersonSingleLink = (title, icon, onClick, theme, styles, rightIcon = 'chevron-right') => {
    return (
      <TouchableOpacity style={styles.linkWrapper} onPress={onClick}>
        <Feather
          name={icon}
          size={25}
          style={styles.icon}
          color={theme.dark}
        />
        <Text style={{ ...styles.link, flexGrow: 1, color: theme.dark }}>{title}</Text>
        <Feather
          name={rightIcon}
          size={20}
          style={{ color: theme.grey }}
          color={theme.grey}
        />
      </TouchableOpacity>
    );
};

export const STATUS = {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    IN_REVIEW: 'in_review',
    COMPLETED: 'completed',
}
export const STATUS_COLORS = {
        [STATUS.PENDING]: lightColors.primary,
        [STATUS.IN_PROGRESS]: lightColors.secondary,
        [STATUS.IN_REVIEW]: lightColors.tertiary,
        [STATUS.COMPLETED]: '#558B2F',
}