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
import { commonStyles, formStyles } from "../theme/styles";
import { Feather } from "@expo/vector-icons";
import { STATUS } from "../helpers/common";
import DropDownPicker from "react-native-dropdown-picker";
import { updateTask } from '../store/admin/tasks/taskActions';

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
  const onSave = (e) => {
    console.log(initialValues);
    dispatch(
      updateTask({
        ...initialValues,
        id: initialValues._id,
      })
    );
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
  useEffect(() => {
    console.log(props.route.params.item);
    if (props.route.params.item) {
      setTask(props.route.params.item);
      setInitialValues({
        ...props.route.params.item,
        hourlyRate: props.route.params.item.hourlyRate.toString(),
        hoursWorked: props.route.params.item.hoursWorked.toString(),
        assignedTo: props.route.params.item.assignedTo._id,
      });
    }
  }, [props.route.params.item]);

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

        {/* <View>
            <Text style={{ ...commonStyles.mainHeading, color: theme.dark }}>
              Hourly Rate
            </Text>
            <View style={{backgroundColor: theme.primary }}>
              <Text>{task?.hourlyRate}</Text>
            </View>
          </View> */}
        {getDropDown(
          "status",
          "Select Status",
          [
            { label: "Not Started", value: STATUS.NOT_STARTED },
            { label: "In Progress", value: STATUS.IN_PROGRESS },
            { label: "In Review", value: STATUS.IN_REVIEW },
            { label: "Completed", value: STATUS.COMPLETED },
          ],
          "Task Status",
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
