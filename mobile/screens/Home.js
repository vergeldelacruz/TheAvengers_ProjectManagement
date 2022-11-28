import React, { useEffect, useState } from "react";
import Header from "../components/common/header";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getProjects } from "../store/admin/project/projectActions";
import { getTask } from "../store/admin/tasks/taskActions";
import { getUsers } from "../store/admin/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import { commonStyles } from "../theme/styles";
import ProjectCard from "../components/home/ProjectCard";
import TitleLink from "../components/common/title-link";
import UserCard from "../components/home/UserCard";
import TaskCard from "../components/common/task-card";

export default function Home(props) {
  const { theme } = useSelector((state) => state.commonReducer);
  const { projects } = useSelector((state) => state.projectReducer);
  const { tasks } = useSelector((state) => state.taskReducer);
  const { users } = useSelector((state) => state.userReducer);
  const { auth } = useSelector((state) => state.authReducer);

  const [userProjects, setUserProjects] = useState([]);
  const [userTasks, setUserTasks] = useState([]);

  const dispatch = useDispatch();
  const styles = getStyles(theme);

  useEffect(() => {   
    dispatch(getTask());
    dispatch(getProjects());
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    setUserProjects(projects.filter((a) => a.members.includes(auth?.user._id)));
    setUserTasks(tasks.filter((a) => a.assignedTo._id === auth?.user._id));
  }, [projects,tasks,auth]);

  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <SafeAreaView>
        <ScrollView>
          <StatusBar barStyle={theme.barStyle} />
          <Header userFirstName={auth?.user.firstName} />
          <View style={{ ...commonStyles.mainContainer }}>
            <FlatList
              data={userProjects}
              renderItem={({ item }) => <ProjectCard project={item} navigation={props.navigation} />}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <TitleLink title={"Users"} />
          <View style={{ ...commonStyles.mainContainer }}>
            <FlatList
              data={users}
              renderItem={({ item }) => <UserCard user={item} />}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <TitleLink title={"Tasks"} />
          <View style={{ ...commonStyles.mainContainer }}>

          <FlatList
              data={userTasks}
              renderItem={({ item }) => <TaskCard key={item._id} task={item} navigation={props.navigation} />}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      height: "100%",
      padding: 20,
      paddingTop: 40,
    },
    itemList: {
      width: "100%",
    },
    buttonWrapper: {
      marginTop: 10,
    },
    button: {
      width: "100%",
      height: 50,
      backgroundColor: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonLabel: {
      color: "black",
      fontWeight: "bold",
    },
    linkWrapper: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      marginBottom: 10,
      marginTop: 10,
      paddingBottom: 10,
    },
    icon: {
      marginRight: 10,
    },
    link: {
      color: theme.dark,
      fontSize: 16,
      fontFamily: commonStyles.fontMedium,
    },
  });
};
