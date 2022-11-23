import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { lightColors } from "../theme/colors";
import { useDispatch, useSelector } from "react-redux";
// import {
//   setUserId,
//   setUserFirstName,
//   setUserLastName,
//   setUserRole,
// } from "../redux/actions";
import BackButton from "../components/common/back-button";
import { commonStyles, formStyles } from "../theme/styles";

const MyProfile = ({ navigation }) => {
  const { theme } = useSelector((state) => state.commonReducer);

  const { userId, userFirstName, userLastName, userRole, userEmail } =
    useSelector((state) => state.userReducer);

  const [email, setEmail] = useState(userEmail);
  const [firstName, setFirstName] = useState(userFirstName);
  const [lastName, setLastName] = useState(userLastName);

  const onBack = () => {
    navigation.goBack();
  };
  return (
    <View
      style={{
        ...commonStyles.mainContainer,
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <BackButton navigation={navigation}></BackButton>
        <Text style={{ ...commonStyles.mainHeading, color: theme.dark }}>
          My Profile
        </Text>
        <View>
          <Text style={{...formStyles.label, color: theme.darkGrey}}>First Name</Text>
          <TextInput
            style={{
              ...formStyles.input,
              backgroundColor: theme.light,
              color: theme.dark,
            }}
            placeholder="Your First Name"
            value={firstName}
            onChangeText={(a) => setFirstName(a)}
            editable={false}
          />
        </View>
        <View>
          <Text style={{...formStyles.label, color: theme.darkGrey}}>Last Name</Text>
          <TextInput
            style={{
              ...formStyles.input,
              backgroundColor: theme.light,
              color: theme.dark,
            }}
            placeholder="Your Last Name"
            value={lastName}
            onChangeText={(a) => setLastName(a)}
            editable={false}
          />
        </View>
        <View>
          <Text style={{...formStyles.label, color: theme.darkGrey}}>Email</Text>
          <TextInput
            style={{
              ...formStyles.input,
              backgroundColor: theme.light,
              color: theme.dark,
            }}
            placeholder="Your Email"
            value={email}
            onChangeText={(a) => setEmail(a)}
            editable={false}
          />
        </View>
        <TouchableOpacity style={formStyles.submitButton} onPress={onBack}>
          <Text style={formStyles.buttonText}>Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  
});
