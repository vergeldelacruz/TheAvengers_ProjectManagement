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
import BackButton from "../components/common/back-button";
import { commonStyles } from "../theme/styles";
import { Feather } from "@expo/vector-icons";
import { STATUS_COLORS } from "../helpers/common";

const Details = (props) => {
  const { theme } = useSelector((state) => state.commonReducer);
  const styles = getStyles(theme);
  const [project, setProject] = useState();
  const [members, setMembers] = useState();
  const { projects } = useSelector((state) => state.projectReducer);
  const { tasks } = useSelector((state) => state.taskReducer);
  const [projectTasks, setProjectTasks] = useState([]);

  useEffect(() => {
    setProject(
      projects.filter((a) => a._id === props.route.params.project._id)[0]
    );
    setProjectTasks(
      tasks.filter((a) => a.projectId === props.route.params.project._id)
    );
    setMembers(props.route.params.members);
  }, [projects, tasks]);

  const renderItem = (item) => {
    return item ? (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("TaskDetails", {
            item,
          });
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
                style={{
                  ...styles.subIcon,
                  backgroundColor: STATUS_COLORS[item.status],
                }}
              >
                <Feather name={"bookmark"} size={15} color={"#fff"} />
                <Text style={styles.iconText}>{item.status}</Text>
              </View>

              <View
                style={{
                  ...styles.subIcon,
                }}
              >
                <Feather name={"clock"} size={15} color={theme.dark} />
                <Text style={styles.iconText}>{item.hoursWorked}</Text>
              </View>

              <View
                style={{
                  ...styles.subIcon,
                }}
              >
                <Feather name={"dollar-sign"} size={15} color={theme.dark} />
                <Text style={styles.iconText}>
                  {item.hoursWorked * item.hourlyRate}
                </Text>
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
        <View style={styles.itemAttributeWrappers}>
          <View style={styles.itemAttributeWrapper}>
            <View style={styles.itemAttribute}>
              <Text
                style={{
                  color: theme.dark,
                  fontFamily: commonStyles.fontMedium,
                }}
              >
                Status
              </Text>
            </View>
            <View
              style={{
                ...styles.subIcon,
                backgroundColor: STATUS_COLORS[project?.status],
              }}
            >
              <Feather name={"bookmark"} size={25} color={"#fff"} />
              <Text style={styles.iconText}>{project?.status}</Text>
            </View>
          </View>

          <View style={styles.itemAttributeWrapper}>
            <View style={styles.itemAttribute}>
              <Text
                style={{
                  color: theme.dark,
                  fontFamily: commonStyles.fontMedium,
                }}
              >
                Hours Worked
              </Text>
            </View>
            <View
              style={{
                ...styles.subIcon,
              }}
            >
              <Feather name={"clock"} size={25} color={theme.dark} />
              <Text style={styles.iconText}>{project?.hours}</Text>
            </View>
          </View>

          <View style={styles.itemAttributeWrapper}>
            <View style={styles.itemAttribute}>
              <Text
                style={{
                  color: theme.dark,
                  fontFamily: commonStyles.fontMedium,
                }}
              >
                Cost
              </Text>
            </View>
            <View
              style={{
                ...styles.subIcon,
              }}
            >
              <Feather name={"dollar-sign"} size={25} color={theme.dark} />
              <Text style={styles.iconText}>{project?.cost}</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={{ ...commonStyles.mainHeading, color: theme.dark }}>
            Tasks
          </Text>
          <FlatList
            keyExtractor={(item) => item._id}
            data={projectTasks}
            renderItem={({ item }) => renderItem(item)}
          />
        </View>
        <View>
          <Text style={{ ...commonStyles.mainHeading, color: theme.dark }}>
            Members
          </Text>
          <FlatList
            keyExtractor={(item) => item._id}
            data={members}
            renderItem={({ item }) => renderMember(item)}
          />
        </View>

        {/* <TouchableOpacity style={formStyles.submitButton} onPress={onBack}>
            <Text style={formStyles.buttonText}>Mark as complete</Text>
          </TouchableOpacity> */}
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
      borderRadius: lightColors.borderRadius,
    },
    iconText: {
      color: theme.dark,
      fontSize: 10,
      marginLeft: 3,
      fontFamily: commonStyles.fontMedium,
    },
    itemAttributeWrappers: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "column",
      marginTop: 10,
      marginBottom: 10,
      padding: 15,
      borderRadius: lightColors.borderRadius,
      backgroundColor: theme.light,
    },
    itemAttributeWrapper: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
    },
    itemAttribute: {
      flex: 1,
      marginTop: 10,
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
    },
  });
};
