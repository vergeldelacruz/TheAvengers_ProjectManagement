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

const Register = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [role, setRole] = useState("");

  const onSignUp = () => {

  };
  const onExistingUser = () => {
    navigation.navigate("Login");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <SafeAreaView>

          <Text style={styles.title}>Sign up</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Your First Name"
              value={firstName}
              onChangeText={(a) => setFirstName(a)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Last Name"
              value={lastName}
              onChangeText={(a) => setLastName(a)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Email"
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
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Job Title</Text>
            <TextInput
              placeholder="Your Job"
              style={styles.input}
              value={jobTitle}
              onChangeText={(a) => setJobTitle(a)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Role</Text>
            <TextInput
              placeholder="Your Role"
              style={styles.input}
              value={role}
              onChangeText={(a) => setRole(a)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={onSignUp}>
            <Text style={styles.buttonLabel}>Register</Text>
          </TouchableOpacity>
          <View style={styles.linksWrapper}>
            <TouchableOpacity onPress={onExistingUser}>
              <Text>Existing User?</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
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
