import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/auth/authActions";
import { commonStyles, formStyles } from "../../theme/styles";

const Register = ({ navigation }) => {

  const { theme } = useSelector((state) => state.commonReducer);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [role, setRole] = useState("");
  const { error } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();

  const onSignUp = () => {
    dispatch(
      registerUser({
        email,
        password,
        firstName,
        lastName,
        jobTitle,
        role,
      })
    );
  };
  useEffect(() => {
    if (error) Alert.alert(error);
  }, [error]);

  const onExistingUser = () => {
    navigation.navigate("Login");
  };
  return (
    <View
      style={{
        ...commonStyles.mainContainer,
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <ScrollView>
        <SafeAreaView>
          <Text style={{ ...commonStyles.mainHeading, color: theme.dark }}>
            Register to Continue
          </Text>


          <View style={styles.inputWrapper}>
            <Text style={{ ...formStyles.label, color: theme.darkGrey }}>
              First Name
            </Text>
            <TextInput
              placeholder="Your First Name"
              placeholderTextColor={theme.darkGrey}
              style={{
                ...formStyles.input,
                backgroundColor: theme.light,
                color: theme.dark,
              }}
              value={firstName}
              onChangeText={(a) => setFirstName(a)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={{ ...formStyles.label, color: theme.darkGrey }}>
              Last Name
            </Text>
            <TextInput
              placeholder="Your Last Name"
              placeholderTextColor={theme.darkGrey}
              style={{
                ...formStyles.input,
                backgroundColor: theme.light,
                color: theme.dark,
              }}
              value={lastName}
              onChangeText={(a) => setLastName(a)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={{ ...formStyles.label, color: theme.darkGrey }}>
              Email
            </Text>
            <TextInput
              style={{
                ...formStyles.input,
                backgroundColor: theme.light,
                color: theme.dark,
              }}
              placeholderTextColor={theme.darkGrey}
              placeholder="eg. abcd@gmail.com"
              value={email}
              onChangeText={(a) => setEmail(a)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={{ ...formStyles.label, color: theme.darkGrey }}>
              Password
            </Text>
            <TextInput
              placeholder="Your Password"
              placeholderTextColor={theme.darkGrey}
              style={{
                ...formStyles.input,
                backgroundColor: theme.light,
                color: theme.dark,
              }}
              value={password}
              onChangeText={(a) => setPassword(a)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={{ ...formStyles.label, color: theme.darkGrey }}>
              Job Title
            </Text>
            <TextInput
              placeholder="Your Job Title"
              placeholderTextColor={theme.darkGrey}
              style={{
                ...formStyles.input,
                backgroundColor: theme.light,
                color: theme.dark,
              }}
              value={jobTitle}
              onChangeText={(a) => setJobTitle(a)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={{ ...formStyles.label, color: theme.darkGrey }}>
              Role
            </Text>
            <TextInput
              placeholder="Your Role"
              placeholderTextColor={theme.darkGrey}
              style={{
                ...formStyles.input,
                backgroundColor: theme.light,
                color: theme.dark,
              }}
              value={role}
              onChangeText={(a) => setRole(a)}
            />
          </View>
          <TouchableOpacity style={formStyles.submitButton} onPress={onSignUp}>
            <Text style={formStyles.buttonText}>Register</Text>
          </TouchableOpacity>
          <View style={styles.linksWrapper}>
            <TouchableOpacity onPress={onExistingUser}>
              <Text style={{ ...formStyles.label, color: theme.darkGrey }}>Existing User?</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ ...formStyles.label, color: theme.darkGrey }}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
export default Register

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    padding: 20,
    marginTop: 40,
    display: "flex",
  },
  inputWrapper: {
    marginVertical: 10,
  },
  linksWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
