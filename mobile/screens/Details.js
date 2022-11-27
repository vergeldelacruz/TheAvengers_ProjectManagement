import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
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
import { Feather } from "@expo/vector-icons";

const Details = (props) => {
  const { theme } = useSelector((state) => state.commonReducer);
  const styles = getStyles(theme);

  const [project, setProject] = useState();
  const [tasks, setTasks] = useState();
  const [members, setMembers] = useState();

  useEffect(() => {
    setProject(props.route.params.project);
    setTasks(
      props.route.params.tasks.filter(
        (a) => a.projectId === props.route.params.project._id
      )
    );
    setMembers(props.route.params.members);
  }, []);

  const renderItem = (item) => {
    return item ? (
      <TouchableOpacity
        onPress={() => {
          //props.navigation.navigate("AddTask", { item, isEdit: true });
        }}
      >
        <View style={styles.itemWrapper}>
          <View>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text
              style={{ fontSize: 12, marginTop: 5, color: theme.darkGrey }}
              numberOfLines={3}
            >
              {item.description}
            </Text>
            <View style={styles.icons}>
              <View
                style={{ ...styles.subIcon, backgroundColor: theme.primary }}
              >
                <Feather name={"bookmark"} size={15} color={"#fff"} />
                <Text style={styles.iconText}>{item.status}</Text>
              </View>
            </View>
          </View>
          <Feather
            name="chevron-right"
            size={20}
            style={{ color: lightColors.grey }}
            color={lightColors.dark}
          />
        </View>
      </TouchableOpacity>
    ) : null;
  };

  const renderMember = (item) => {
    return item ? (
      <View style={styles.itemWrapper}>
        <Text style={styles.itemText}>
          {item.firstName} {item.lastName}{" "}
        </Text>
      </View>
    ) : null;
  };

  const onBack = () => {
    props.navigation.goBack();
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
          <BackButton navigation={props.navigation}></BackButton>
          <Text style={{ ...commonStyles.mainHeading, color: theme.dark }}>
            {project?.name}
          </Text>
          <View>
            <Text style={{ ...commonStyles.fontRegular, color: theme.dark }}>
              {project?.description}
            </Text>
          </View>
          <View>
            <Text style={{ ...commonStyles.mainHeading, color: theme.dark }}>
              Status
            </Text>
            <View style={{ ...styles.subIcon, backgroundColor: theme.primary }}>
              <Feather name={"bookmark"} size={25} color={"#fff"} />
              <Text style={styles.iconText}>{project?.status}</Text>
            </View>
          </View>
          <View>
            <Text style={{ ...commonStyles.mainHeading, color: theme.dark }}>
              Tasks
            </Text>
            <FlatList
              keyExtractor={item => item._id}
              data={tasks}
              renderItem={({ item }) => renderItem(item)}
            />
          </View>
          <View>
            <Text style={{ ...commonStyles.mainHeading, color: theme.dark }}>
              Members
            </Text>
            <FlatList
              keyExtractor={item => item._id}
              data={members}
              renderItem={({ item }) => renderMember(item)}
            />
          </View>

          <TouchableOpacity style={formStyles.submitButton} onPress={onBack}>
            <Text style={formStyles.buttonText}>Mark as complete</Text>
          </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  itemWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
    padding: 15,
    borderRadius: lightColors.borderRadius,
    //backgroundColor: theme.light,
  },

  itemText: {
    //color: theme.dark,
    fontSize: 16,
    fontFamily: commonStyles.fontMedium,
  },
  icons: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  subIcon: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    marginRight: 10,
    padding: 3,
    paddingHorizontal: 10,
    // backgroundColor: theme.secondary,
    borderRadius: lightColors.borderRadius,
  },
  iconText: {
    color: "#fff",
    fontSize: 10,
    marginLeft: 3,
    fontFamily: commonStyles.fontMedium,
  },
});

const getStyles = (theme) => {
  return StyleSheet.create({
    itemWrapper: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      marginBottom: 10,
      padding: 15,
      borderRadius: lightColors.borderRadius,
      backgroundColor: theme.light,
    },
    itemText: {
      color: theme.dark,
      fontSize: 16,
      fontFamily: commonStyles.fontMedium,
    },
    icons: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
    },
    subIcon: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      marginTop: 10,
      marginRight: 10,
      padding: 3,
      paddingHorizontal: 10,
      backgroundColor: theme.secondary,
      borderRadius: lightColors.borderRadius,
    },
    iconText: {
      color: "#fff",
      fontSize: 10,
      marginLeft: 3,
      fontFamily: commonStyles.fontMedium,
    },
  });
};
