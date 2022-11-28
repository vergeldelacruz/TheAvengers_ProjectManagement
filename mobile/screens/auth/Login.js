import React, { useEffect, useState, useContext } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/auth/authActions";
import { commonStyles, formStyles } from "../../theme/styles";

const Login = ({ navigation }) => {
  const { theme } = useSelector((state) => state.commonReducer);
  const [email, setEmail] = useState("vergel@gmail.com");
  const [password, setPassword] = useState("password");
  const { error } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();

  const onSignUp = () => {
    navigation.navigate("Register");
  };

  const onLogin = () => {
    dispatch(
      loginUser({
        email,
        password,
      })
    );
  };

  useEffect(() => {
    if (error) Alert.alert(error);
  }, [error]);

  return (
    <View
      style={{
        ...commonStyles.mainContainer,
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <SafeAreaView>
        <Text style={{ ...commonStyles.mainHeading, color: theme.dark }}>
          Login to Continue
        </Text>
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
        <TouchableOpacity style={formStyles.submitButton}  onPress={onLogin}>
          <Text style={formStyles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.linksWrapper}>
          <TouchableOpacity onPress={onSignUp}>
            <Text style={{ ...formStyles.label, color: theme.darkGrey }}>New User?</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ ...formStyles.label, color: theme.darkGrey }}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};
export default Login;

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
