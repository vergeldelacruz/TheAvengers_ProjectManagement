import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import BackButton from "../components/common/back-button";
import { commonStyles, formStyles } from "../theme/styles";

const MyProfile = ({ navigation }) => {
  const { theme } = useSelector((state) => state.commonReducer);
  const { auth } = useSelector((state) => state.authReducer);
  const [email, setEmail] = useState(auth?.user.email);
  const [firstName, setFirstName] = useState(auth?.user.firstName);
  const [lastName, setLastName] = useState(auth?.user.lastName);

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
          <Text style={{ ...formStyles.label, color: theme.darkGrey }}>
            First Name
          </Text>
          <TextInput
            style={{
              ...formStyles.input,
              backgroundColor: theme.light,
              color: theme.dark,
            }}
            placeholder="Your First Name"
            placeholderTextColor={theme.darkGrey}
            value={firstName}
            onChangeText={(a) => setFirstName(a)}
            editable={false}
          />
        </View>
        <View>
          <Text style={{ ...formStyles.label, color: theme.darkGrey }}>
            Last Name
          </Text>
          <TextInput
            style={{
              ...formStyles.input,
              backgroundColor: theme.light,
              color: theme.dark,
            }}
            placeholder="Your Last Name"
            placeholderTextColor={theme.darkGrey}
            value={lastName}
            onChangeText={(a) => setLastName(a)}
            editable={false}
          />
        </View>
        <View>
          <Text style={{ ...formStyles.label, color: theme.darkGrey }}>
            Email
          </Text>
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

const styles = StyleSheet.create({});
