import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Feather } from 'react-native-vector-icons';
import moment from 'moment';

export default function ProjectCard({ project }) {
  const { theme } = useSelector((state) => state.commonReducer);
  const { tasks } = useSelector((state) => state.taskReducer);
  const styles = getStyles(theme);

  let [progress, setProgress] = useState(0);

  useEffect(() => {
    let projectTasks = tasks.filter((task) => task.projectId === project._id);
    let completedTasks = projectTasks.filter((task) => task.status.toLowerCase() == "completed");
    let progress = completedTasks.length > 0 ? Math.round((completedTasks.length / projectTasks.length) * 100) : 0;
    setProgress(progress);
  }, []);

  return (
    <View style={{...styles.cardWrapper, backgroundColor: project.color}}>
      <Text numberOfLines={2} style={styles.heading}>{project.name}</Text>
      <View style={styles.calendar}>
        <Feather name={'calendar'} size={15} color={'#fff'}/>
        <Text style={{color: '#fff', marginLeft: 5}}>{moment(project.createdAt).format('DD MMM, YYYY')}</Text>
      </View>
      <View style={styles.progressWrapper}>
        <View style={{...styles.progressBar, width: `${progress}%`}}></View>
      </View>
    </View>
  )
}

const getStyles = (theme) => {
  return StyleSheet.create({
    cardWrapper: {
      width: 200,
      marginRight: 15,
      borderRadius: 10,
      padding: 20,
      display: "flex",
    },
    heading: {
      color: "#fff",
      fontSize: 25,
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
  })
}