import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { commonStyles, formStyles } from '../../../theme/styles';
import { lightColors } from '../../../theme/colors';
import BackButton from '../../../components/common/back-button';
import { addTask, updateTask, getTask } from '../../../store/admin/tasks/taskActions';
import { getProjects } from '../../../store/admin/project/projectActions';
import DropDownPicker from "react-native-dropdown-picker";
import { STATUS } from '../../../helpers/common';
import { getUsers } from '../../../store/admin/user/userActions';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTask = (props) => {
    const { theme } = useSelector((state) => state.commonReducer);
    const { users } = useSelector((state) => state.userReducer);
    const { projects } = useSelector((state) => state.projectReducer);
    const { tasks } = useSelector((state) => state.taskReducer);
    let [isEdit, setIsEdit] = useState(false);
    let [editingItem, setEditingItem] = useState(null);
    let [initialValues, setInitialValues] = useState({});
    let [selectOpen, setSelectOpen] = useState([false, false, false, false, false, false]);

    const dispatch = useDispatch();
    const styles = getStyles(theme);

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getTask());
        dispatch(getProjects());
    }, []);

    const onFormSubmit = (e) => {
        let status = validateForm(initialValues);
        if (status.status && initialValues !== {}) {
            if(!isEdit) {
                dispatch(addTask({
                    ...initialValues,
                    id: new Date().getTime(),
                }));
                setInitialValues({});
                props.navigation.goBack();
            }
            else{
                dispatch(updateTask({
                    ...initialValues,
                    id: editingItem.id,
                }));
                props.navigation.goBack();
            }
        }
        else{
            alert(status.message);
        }
    }

    const validateForm = (values) => {
        if (!values.name && values.name != "") return {message: "Please enter project name", status: false};
        if (!values.description && values.description != "") return {message: "Please enter project description", status: false};
        if (!values.status && values.status != "") return {message: "Please enter project status", status: false};
        else return {status: true};
    }

    useEffect(() => {
        if (props.route.params && props.route.params.isEdit) {
            setIsEdit(true);
            let item = props.route.params.item;
            setEditingItem(item);
            // console.log(item);
            setInitialValues({
                ...item,
                hourlyRate: item.hourlyRate.toString(),
                hoursWorked: item.hoursWorked.toString(),
                assignedTo: item.assignedTo._id,
            });
        }
    }, []);

    const getTextInput = (field, placeholder, keyboardType = 'default', label) => {
        return <View style={styles.inputWrapper}>
            <Text style={{...formStyles.label, color: theme.darkGrey}}>{label}</Text>
            <TextInput
                style={{...formStyles.input, backgroundColor: theme.light, color: theme.dark}}
                onChangeText={(e) => {
                    let obj = {};
                    obj[field] = e;
                    setInitialValues({...initialValues, ...obj});
                }}
                keyboardType={keyboardType}
                placeholderTextColor={theme.darkGrey}
                value={initialValues[field]}
                placeholder={placeholder}
            />
        </View>
    }

    const getDropDown = (field, placeholder, items, label, selectIndex, multiple = false, mode = 'DEFAULT') => {
        return <View>
            <Text style={{...formStyles.label}}>{label}</Text>
            <DropDownPicker
                style={{...styles.dropdown, backgroundColor: theme.light, marginBottom: 15}}
                value={initialValues[field]}
                multiple={multiple}
                listMode="MODAL"
                searchable={true}
                mode={mode}
                open={selectOpen[selectIndex]}
                onClose={() => {setSelectOpen([...selectOpen.map((item, i) => i === selectIndex ? !item : item)])}}
                onPress={() => {setSelectOpen([...selectOpen.map((item, i) => i === selectIndex ? !item : item)])}}
                onSelectItem={(item) => {
                    let obj = {};
                    if(!multiple) obj[field] = item.value;
                    else obj[field] = item.map((item) => item.value);
                    setInitialValues({...initialValues, ...obj});
                    if(!multiple) setSelectOpen([...selectOpen.map((x, i) => i === selectIndex ? false : x)])
                }}
                theme={theme == lightColors ? "LIGHT" : "DARK"}
                items={items}
                placeholder={placeholder}
                placeholderStyle={{...styles.dropdownPlaceholder, color: theme.darkGrey}}
                zIndex={10000}
                modalTitle={placeholder}
                modalProps={{
                    animationType: 'slide',
                    hardwareAccelerated: true,
                }}
                dropDownDirection="DOWN"
                badgeDotColors={[theme.secondary]}
            />
        </View>
    }

    const getDatePicker = (field, label) => {
        return <View>
            <Text style={formStyles.label}>{label}</Text>
            <View style={{}}>
                <DateTimePicker
                    style={{height: 50, width: 110, display: 'flex', justifyContent: 'flex-start', marginBottom: 10}}
                    themeVariant={theme == lightColors ? "LIGHT" : "DARK"}
                    testID="dateTimePicker"
                    value={initialValues[field] ? new Date(initialValues[field]) : new Date()}
                    mode={'date'}
                    is24Hour={false}
                    onChange={(e, date) => {
                        let obj = {};
                        obj[field] = date;
                        setInitialValues({...initialValues, ...obj});
                    }}
                    textColor={theme.dark}
                    
                /> 
            </View>
        </View>
    }

    return (
        <View style={{...commonStyles.mainContainer, flex: 1, backgroundColor: theme.background}}>
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <BackButton navigation={props.navigation}/>
                    <View style={styles.header}>
                        <Text style={{
                            ...commonStyles.mainHeading, 
                            marginTop: 10,
                            color: theme.dark,
                        }}
                        >{isEdit ? `Edit Task`: `Add Task`}</Text>
                    </View>
                    
                    {/* FORM STARTS */}
                    <View style={styles.form}>

                        {getDropDown("projectId", "Select Project", projects.map(
                            (item) => ({label: `${item.name}`, value: item._id})
                        ), "Project", 0, false, "BADGE")}
                        {getTextInput("name", "Ex. Nodejs Task", "default", "Task Name")}
                        {getTextInput("description", "Ex. TODO", "default", "Task Description")}
                        {getDropDown("status", "Select Status", [
                            {label: "Not Started", value: STATUS.NOT_STARTED},
                            {label: "In Progress", value: STATUS.IN_PROGRESS},
                            {label: "In Review", value: STATUS.IN_REVIEW},
                            {label: "Completed", value: STATUS.COMPLETED},
                        ], "Task Status", 1, false, "SIMPLE")}
                        {getDropDown("assignedTo", "Select Member", users.map(
                            (item) => ({label: `${item.firstName} ${item.lastName}`, value: item._id})
                        ), "Member", 2, false, "BADGE")}

                        {getDatePicker("startDate", "Start Date")}
                        {getDatePicker("endDate", "End Date")}
                        {getDatePicker("completionDate", "Completion Date")}

                        {getTextInput("hourlyRate", "Ex. 2", "numeric", "Hourly Rate")}
                        {getTextInput("hoursWorked", "Ex. 250", "numeric", "Hours Worked")}
                        {!isEdit && getDropDown("dependentTask", "Dependent Task", tasks.filter(x => x.projectId == initialValues.projectId).map(
                            (item) => ({label: `${item.name}`, value: item._id})
                        ), "Dependent Task", 3, false, "BADGE")}

                        <TouchableOpacity onPress={onFormSubmit} style={formStyles.submitButton}>
                            <Text style={formStyles.buttonText}>{isEdit ? `Update`: `Create`}</Text>
                        </TouchableOpacity>

                    </View>
                    {/* FORM ENDS */}
                    <View style={{height: 300}} />
                </ScrollView>
            </SafeAreaView>
            <StatusBar style="auto" />
        </View>
    );
}

export default AddTask;

const getStyles = (theme) => {
    return StyleSheet.create({
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
        },
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
        }
    });
}