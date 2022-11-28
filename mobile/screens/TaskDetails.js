import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { lightColors } from "../theme/colors";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../components/common/back-button";
import { commonStyles, formStyles } from "../theme/styles";
import { Feather } from "@expo/vector-icons";
import { STATUS } from "../helpers/common";
import DropDownPicker from "react-native-dropdown-picker";
import { getTask, updateTask } from "../store/admin/tasks/taskActions";
import { updateProject } from "../store/admin/project/projectActions";
import { STATUS_COLORS } from "../helpers/common";

const TaskDetails = (props) => {
  const { theme } = useSelector((state) => state.commonReducer);
  const styles = getStyles(theme);
  const dispatch = useDispatch();

  let [initialValues, setInitialValues] = useState({});
  let [selectOpen, setSelectOpen] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [task, setTask] = useState();
  const [project, setProject] = useState();
  const [projectTasks, setProjectTasks] = useState();
  const { projects } = useSelector((state) => state.projectReducer);

  const { tasks } = useSelector((state) => state.taskReducer);
  const [dependentTask, setDependentTask] = useState();

  useEffect(() => {
    setProject(
      projects.filter((a) => a._id === props.route.params.item.projectId)[0]
    );
    setProjectTasks(
      tasks.filter((a) => a.projectId === props.route.params.item.projectId)
    );
    if (props.route.params.item) {
      let task = tasks.filter((a) => a._id === props.route.params.item._id)[0];
      setTask(task);
      if (task.dependentTask) {
        setDependentTask(task.dependentTask);
      }
      setInitialValues({
        ...props.route.params.item,
        hourlyRate: props.route.params.item.hourlyRate.toString(),
        hoursWorked: props.route.params.item.hoursWorked.toString(),
        assignedTo: props.route.params.item.assignedTo._id,
      });
    }
  }, [props.route.params.item, tasks]);

  const onSave = (e) => {
    if (dependentTask && dependentTask.status !== "completed") {
      Alert.alert("Cannot start task until the dependent task has completed.");
      return;
    }
    let completionDate = "";
    if (initialValues.status === "completed") {
      if (initialValues.hoursWorked <= 0) {
        Alert.alert("Please enter hours worked.");
        return;
      }
      completionDate = new Date();
    }
    dispatch(
      updateTask({
        ...initialValues,
        id: initialValues._id,
        completionDate,
      })
    );
    let status = "not_started";
    let someInProgress =
      projectTasks
        .filter((a) => a._id !== task._id)
        .some((a) => a.status === "in_progress") ||
      initialValues.status === "in_progress";

    let someInReview =
      projectTasks
        .filter((a) => a._id !== task._id)
        .some((a) => a.status === "in_review") ||
      initialValues.status === "in_review";

    let someInCompleted =
      projectTasks
        .filter((a) => a._id !== task._id)
        .some((a) => a.status === "completed") ||
      initialValues.status === "completed";

    let allInCompleted =
      projectTasks
        .filter((a) => a._id !== task._id)
        .every((a) => a.status === "completed") &&
      initialValues.status === "completed";

    // console.log("someInProgress " + someInProgress);
    // console.log("someInReview " + someInReview);
    // console.log("allInCompleted " + allInCompleted);

    if (allInCompleted) {
      status = "completed";
    } else if (someInReview) {
      status = "in_review";
    } else if (someInProgress) {
      status = "in_progress";
    } else if (someInCompleted) {
      status = "in_progress";
    }

    let cost = projectTasks
      .filter((a) => a._id !== task._id)
      .map((a) => a.hoursWorked * a.hourlyRate)
      .reduce((prev, next) => prev + next, 0);
    cost += initialValues.hourlyRate * initialValues.hoursWorked;

    let hours = projectTasks
      .filter((a) => a._id !== task._id)
      .map((a) => a.hoursWorked)
      .reduce((prev, next) => prev + next, 0);
    hours += +initialValues.hoursWorked;

    dispatch(
      updateProject({
        ...project,
        cost,
        hours,
        status,
        id: project._id,
      })
    );
    dispatch(getTask());
    props.navigation.goBack();
  };
  const getDropDown = (
    field,
    placeholder,
    items,
    label,
    selectIndex,
    multiple = false,
    mode = "DEFAULT"
  ) => {
    return (
      <View>
        <Text style={{ ...formStyles.label }}>{label}</Text>
        <DropDownPicker
          style={{
            ...styles.dropdown,
            backgroundColor: theme.light,
            marginBottom: 15,
          }}
          value={initialValues[field]}
          multiple={multiple}
          listMode="MODAL"
          searchable={true}
          mode={mode}
          open={selectOpen[selectIndex]}
          onClose={() => {
            setSelectOpen([
              ...selectOpen.map((item, i) =>
                i === selectIndex ? !item : item
              ),
            ]);
          }}
          onPress={() => {
            setSelectOpen([
              ...selectOpen.map((item, i) =>
                i === selectIndex ? !item : item
              ),
            ]);
          }}
          onSelectItem={(item) => {
            let obj = {};
            if (!multiple) obj[field] = item.value;
            else obj[field] = item.map((item) => item.value);
            setInitialValues({ ...initialValues, ...obj });
            if (!multiple)
              setSelectOpen([
                ...selectOpen.map((x, i) => (i === selectIndex ? false : x)),
              ]);
          }}
          theme={theme == lightColors ? "LIGHT" : "DARK"}
          items={items}
          placeholder={placeholder}
          placeholderStyle={{
            ...styles.dropdownPlaceholder,
            color: theme.darkGrey,
          }}
          zIndex={10000}
          modalTitle={placeholder}
          modalProps={{
            animationType: "slide",
            hardwareAccelerated: true,
          }}
          dropDownDirection="DOWN"
          badgeDotColors={[theme.secondary]}
        />
      </View>
    );
  };
  const getTextInput = (
    field,
    placeholder,
    keyboardType = "default",
    label
  ) => {
    return (
      <View style={styles.inputWrapper}>
        <Text style={{ ...formStyles.label, color: theme.darkGrey }}>
          {label}
        </Text>
        <TextInput
          style={{
            ...formStyles.input,
            backgroundColor: theme.light,
            color: theme.dark,
          }}
          onChangeText={(e) => {
            let obj = {};
            obj[field] = e;
            setInitialValues({ ...initialValues, ...obj });
          }}
          keyboardType={keyboardType}
          placeholderTextColor={theme.darkGrey}
          value={initialValues[field]}
          placeholder={placeholder}
        />
      </View>
    );
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
          {task?.name}
        </Text>
        <View>
          <Text
            style={{
              ...commonStyles.fontRegular,
              color: theme.dark,
              marginBottom: 10,
            }}
          >
            {task?.description}
          </Text>
        </View>
        <View style={styles.itemAttributeWrappers}>
          <View style={styles.itemAttributeWrapper}>
            <View style={styles.itemAttribute}>
              <Text
                style={{
                  color: theme.darkGrey,
                  fontFamily: commonStyles.fontMedium,
                }}
              >
                Hourly Rate
              </Text>
            </View>
            <View
              style={{
                ...styles.subIcon,
              }}
            >
              <Feather name={"dollar-sign"} size={25} color={theme.dark} />
              <Text style={styles.iconText}>{task?.hourlyRate}</Text>
            </View>
          </View>
          {dependentTask && (
            <View style={styles.itemAttributeWrapper}>
              <View style={styles.itemAttribute}>
                <Text
                  style={{
                    color: theme.darkGrey,
                    fontFamily: commonStyles.fontMedium,
                  }}
                >
                  Dependent Task
                </Text>
              </View>
              <View
                style={{
                  ...styles.subIcon,
                }}
              >
                <Text style={styles.iconText}>{dependentTask?.name}</Text>
              </View>
            </View>
          )}
          {dependentTask && (
            <View style={styles.itemAttributeWrapper}>
              <View style={styles.itemAttribute}>
                <Text
                  style={{
                    color: theme.darkGrey,
                    fontFamily: commonStyles.fontMedium,
                  }}
                >
                  Dependent Task Status
                </Text>
              </View>
              <View
                style={{
                  ...styles.subIcon,
                  backgroundColor: STATUS_COLORS[dependentTask?.status],
                }}
              >
                <Feather name={"bookmark"} size={15} color={"#fff"} />
                <Text style={styles.iconText}>{dependentTask?.status}</Text>
              </View>
            </View>
          )}
        </View>
        {getDropDown(
          "status",
          "Select Status",
          [
            { label: "Not Started", value: STATUS.NOT_STARTED },
            { label: "In Progress", value: STATUS.IN_PROGRESS },
            { label: "In Review", value: STATUS.IN_REVIEW },
            { label: "Completed", value: STATUS.COMPLETED },
          ],
          "Status",
          1,
          false,
          "SIMPLE"
        )}
        {getTextInput("hoursWorked", "Ex. 250", "numeric", "Hours Worked")}

        <View>
          <TouchableOpacity style={formStyles.submitButton} onPress={onSave}>
            <Text style={formStyles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default TaskDetails;

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
      //backgroundColor: theme.secondary,
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
