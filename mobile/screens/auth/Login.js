
import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";


const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>

        <Text style={styles.title}>Login to Continue</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="eg. abcd@gmail.com"
            value={email}
            onChangeText={(a) => setEmail(a)}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Your Password"
            style={styles.input}
            value={password}
            onChangeText={(a) => setPassword(a)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={"hai"}>
          <Text style={styles.buttonLabel}>Login</Text>
        </TouchableOpacity>
        <View style={styles.linksWrapper}>
          <TouchableOpacity onPress={onSignUp}>
            <Text>New User?</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    padding: 20,
    marginTop: 40,
    display: "flex",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 20,
  },
  inputWrapper: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 60,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    marginVertical: 10,
    width: "100%",
    height: 60,
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabel: {
    color: "white",
    fontWeight: "400",
    fontSize: 20,
  },
  linksWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});