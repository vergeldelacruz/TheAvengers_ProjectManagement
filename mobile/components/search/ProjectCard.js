import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Feather } from "react-native-vector-icons";
import moment from "moment";
import { STATUS_COLORS } from "../../helpers/common";
import { lightColors } from "../../theme/colors";
import { commonStyles } from "../../theme/styles";

export default function ProjectCard({ project, navigation }) {
  const { theme } = useSelector((state) => state.commonReducer);
  const { tasks } = useSelector((state) => state.taskReducer);
  const { users } = useSelector((state) => state.userReducer);

  const [members, setMembers] = useState([]);

  const styles = getStyles(theme);

  let [progress, setProgress] = useState(0);

  useEffect(() => {
    let projectTasks = tasks.filter((task) => task.projectId === project._id);
    let completedTasks = projectTasks.filter(
      (task) => task.status.toLowerCase() == "completed"
    );
    let progress =
      completedTasks.length > 0
        ? Math.round((completedTasks.length / projectTasks.length) * 100)
        : 0;
    setProgress(progress);
    setMembers(users.filter((a) => project.members.includes(a._id)));
  }, []);

  return (
    <View
      style={{
        ...styles.cardWrapper,
        backgroundColor: project.color,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Details", { project, members , tasks  });
        }}
      >
        <Text numberOfLines={2} style={styles.heading}>
          {project.name}
        </Text>
        <Text numberOfLines={2} style={styles.subHeading}>
          {project.description}
        </Text>
        <View style={styles.calendar}>
          <Feather name={"calendar"} size={15} color={"#fff"} />
          <Text style={{ color: "#fff", marginLeft: 5 }}>
            {moment(project.createdAt).format("DD MMM, YYYY")}
          </Text>
        </View>
        <View style={styles.progressWrapper}>
          <View style={{ ...styles.progressBar, width: `${progress}%` }}></View>
        </View>
        <View style={styles.icons}>
          <View
            style={{
              ...styles.subIcon,
              backgroundColor: STATUS_COLORS[project.status],
            }}
          >
            <Feather name={"bookmark"} size={15} color={"#fff"} />
            <Text style={styles.iconText}>{project.status}</Text>
          </View>
        </View>
        <View style={styles.costWrapper}>
          <Text style={styles.cost}>$ {project.cost}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme) => {
  return StyleSheet.create({
    cardWrapper: {
      width: "48%",
      marginRight: 10,
      borderRadius: 10,
      padding: 20,
      display: "flex",
      marginBottom: 10,
    },
    heading: {
      color: "#fff",
      fontSize: 25,
      fontWeight: "bold",
      marginBottom: 20,
    },
    subHeading: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
    },
    calendar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
    },
    progressWrapper: {
      width: "100%",
      height: 10,
      backgroundColor: "#ffffff40",
      borderRadius: 10,
      marginTop: 20,
      position: "relative",
    },
    progressBar: {
      position: "absolute",
      height: 10,
      backgroundColor: "#fff",
      borderRadius: 10,
      left: 0,
      top: 0,
      width: "50%",
    },
    costWrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
      marginTop: 10,
    },
    cost: {
      flex: 1,
      color: "#fff",
      fontSize: 20,
      textAlign: "right",
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
