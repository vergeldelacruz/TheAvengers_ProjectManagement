import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { commonStyles, formStyles } from '../../../theme/styles';
import { lightColors } from '../../../theme/colors';
import BackButton from '../../../components/common/back-button';
import { addProject, updateProject } from '../../../store/admin/project/projectActions';

const AddProject = (props) => {
    const { theme } = useSelector((state) => state.commonReducer);
    let [isEdit, setIsEdit] = useState(false);
    let [editingItem, setEditingItem] = useState(null);
    let [initialValues, setInitialValues] = useState({});

    const dispatch = useDispatch();
    const styles = getStyles(theme);

    const onFormSubmit = (initialValues) => {
        let status = validateForm(initialValues);
        if (status.status && initialValues !== {}) {
            if(!isEdit) {
                dispatch(addProject({
                    ...initialValues,
                    id: new Date().getTime(),
                }));
                setInitialValues({});
            }
            else{
                dispatch(updateProject({
                    ...initialValues,
                    id: editingItem.id,
                }));
            }
        }
        else{
            alert(status.message);
        }
    }

    const validateForm = (values) => {
        if (!values.name && values.name != "") return {message: "Please enter category name", status: false};
        else return {status: true};
    }

    useEffect(() => {
        if (props.route.params && props.route.params.isEdit) {
            setIsEdit(true);
            setEditingItem(props.route.params.item);
            setInitialValues(props.route.params.item);
        }
    }, []);

    return (
        <View style={commonStyles.mainContainer}>
            <SafeAreaView>
                <BackButton navigation={props.navigation}/>
                <View style={styles.header}>
                    <Text style={{...commonStyles.mainHeading, marginTop: 10}}> {isEdit ? `Edit Category`: `Add Category`}</Text>
                </View>
                
                {/* FORM STARTS */}
                <View style={styles.form}>
                    <View style={styles.inputWrapper}>
                        <Text style={formStyles.label}>Project Name</Text>
                            <TextInput
                                style={formStyles.input}
                                onChangeText={(e) => {
                                    setInitialValues({...initialValues, name: e});
                                }}
                                placeholderTextColor={lightColors.grey}
                                value={initialValues['name']}
                                placeholder={'Ex. Nodejs Project'}
                            />
                    </View>

                    <TouchableOpacity onPress={onFormSubmit} style={formStyles.submitButton}>
                        <Text style={formStyles.buttonText}>{isEdit ? `Update`: `Create`}</Text>
                    </TouchableOpacity>

                </View>
                {/* FORM ENDS */}

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