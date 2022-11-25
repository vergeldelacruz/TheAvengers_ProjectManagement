import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { commonStyles, formStyles } from '../../../theme/styles';
import { lightColors } from '../../../theme/colors';
import BackButton from '../../../components/common/back-button';
import { addProject, updateProject } from '../../../store/admin/project/projectActions';
import DropDownPicker from "react-native-dropdown-picker";
import { STATUS } from '../../../helpers/common';
import { getUsers } from '../../../store/admin/user/userActions';

const AddProject = (props) => {
    const { theme } = useSelector((state) => state.commonReducer);
    const { users } = useSelector((state) => state.userReducer);
    let [isEdit, setIsEdit] = useState(false);
    let [editingItem, setEditingItem] = useState(null);
    let [initialValues, setInitialValues] = useState({});
    let [selectOpen, setSelectOpen] = useState([false, false, false, false, false, false]);

    const dispatch = useDispatch();
    const styles = getStyles(theme);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const onFormSubmit = (e) => {
        let status = validateForm(initialValues);
        if (status.status && initialValues !== {}) {
            if(!isEdit) {
                dispatch(addProject({
                    ...initialValues,
                    id: new Date().getTime(),
                }));
                setInitialValues({});
                props.navigation.goBack();
            }
            else{
                dispatch(updateProject({
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
        if (!values.hours && values.hours != "") return {message: "Please enter project hours", status: false};
        if (!values.cost && values.cost != "") return {message: "Please enter project cost", status: false};
        else return {status: true};
    }

    useEffect(() => {
        if (props.route.params && props.route.params.isEdit) {
            setIsEdit(true);
            let item = props.route.params.item;
            setEditingItem(item);
            setInitialValues({
                ...item,
                cost: item.cost.toString(),
                hours: item.hours.toString(),
                members: item.members.map((item) => item),
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
                        >{isEdit ? `Edit Project`: `Add Project`}</Text>
                    </View>
                    
                    {/* FORM STARTS */}
                    <View style={styles.form}>

                        {getTextInput("name", "Ex. Nodejs Project", "default", "Project Name")}
                        {getTextInput("description", "Ex. TODO", "default", "Project Description")}
                        {getTextInput("hours", "Ex. 2", "numeric", "Project Hours")}
                        {getTextInput("cost", "Ex. 250", "numeric", "Project Cost")}
                        {getDropDown("status", "Select Status", [
                            {label: "Pending", value: STATUS.PENDING},
                            {label: "In Progress", value: STATUS.IN_PROGRESS},
                            {label: "In Review", value: STATUS.IN_REVIEW},
                            {label: "Completed", value: STATUS.COMPLETED},
                        ], "Project Status", 0, false, "SIMPLE")}
                        {getDropDown("members", "Select Members", users.map(
                            (item) => ({label: `${item.firstName} ${item.lastName}`, value: item._id})
                        ), "Members", 1, true, "BADGE")}

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

export default AddProject;

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