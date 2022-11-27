import React, { useEffect, useState, useContext} from "react";
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
import { Feather } from '@expo/vector-icons'; 



const mainProject={
  name: "Project Details",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu velit quam. Aenean ligula mi, imperdiet et tellus a, consectetur dignissim magna. Fusce laoreet ac orci sit amet tempus.",
  status: "Pending",
  hours: 10,
  cost:50000,
  color: "yellow",
  createdAt: "",
  members: ["Alfy","Litson","Sagar","Vergel"],

}
let tasks=[{
name:
"Do login page",
description:
"Work on the login page",
status:
"in_progress",
},{
  name:
  "Do login page 2",
  description:
  "Work on the login page for task 2",
  status:
  "Completed",
  }]

const Details = ({ navigation }) => {

  const { theme } = useSelector((state) => state.commonReducer);
  const styles = getStyles(theme);
  const { userId, userFirstName, userLastName, userRole, userEmail } =
    useSelector((state) => state.userReducer);

  const [email, setEmail] = useState(userEmail);
  const [firstName, setFirstName] = useState(userFirstName);
  const [lastName, setLastName] = useState(userLastName);

  const renderItem = ( item ) => {
    
    return item ?
    
        <TouchableOpacity onPress={() => {
            //props.navigation.navigate("AddTask", { item, isEdit: true });
        }}>
            <View style={styles.itemWrapper}>
                <View>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <Text style={{fontSize: 12, marginTop: 5, color: theme.darkGrey}} numberOfLines={3}>{item.description}</Text>
                    <View style={styles.icons}>
                        <View style={{...styles.subIcon, backgroundColor: theme.primary}}><Feather name={'bookmark'} size={15} color={'#fff'} /><Text style={styles.iconText}>{item.status}</Text></View>
                    </View>
                </View>
                <Feather name="chevron-right" size={20} style={{color: lightColors.grey}} color={lightColors.dark} />
            </View>
        </TouchableOpacity>

    : null;
}
const renderMember = ( item ) => {
    
  return item ?
  
      <TouchableOpacity onPress={() => {
          //props.navigation.navigate("AddTask", { item, isEdit: true });
      }}>
          <View style={styles.itemWrapper}>
              
                  <Text style={styles.itemText}>{item}</Text>
                  
           </View>
      </TouchableOpacity>

  : null;
}

  const onBack = () => {
    navigation.goBack();
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
        <ScrollView>
        <BackButton navigation={navigation}></BackButton>
        <Text style={{ ...commonStyles.mainHeading, color: theme.dark }}>
          {mainProject.name}
        </Text>
        <View>
          <Text style={{...commonStyles.fontRegular, color: theme.dark}}>{mainProject.description}</Text>
          
        </View>
        <View>
          <Text style={{...commonStyles.mainHeading, color: theme.dark}}>Status</Text>
          <View style={{...styles.subIcon, backgroundColor: theme.primary}}><Feather name={'bookmark'} size={25} color={'#fff'} /><Text style={styles.iconText}>{mainProject.status}</Text></View>

        </View>
        <View>
          <Text style={{...commonStyles.mainHeading, color: theme.dark}}>Tasks</Text>
       
          <FlatList 
                    //style={styles.item}
                    data={tasks}  
                    renderItem={({item}) =>  
                    renderItem(item)} 
                />
        </View>
        <View>
        <Text style={{...commonStyles.mainHeading, color: theme.dark}}>Members</Text>
       
       <FlatList 
                 //style={styles.item}
                 data={mainProject.members}  
                 renderItem={({item}) =>  
                 renderMember(item)} 
             />
        </View>
      
        <TouchableOpacity style={formStyles.submitButton} onPress={onBack}>
          <Text style={formStyles.buttonText}>Mark as complete</Text>
        </TouchableOpacity>
        </ScrollView>
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
  color: '#fff',
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
          color: '#fff',
          fontSize: 10,
          marginLeft: 3,
          fontFamily: commonStyles.fontMedium,
      },
  });
}
