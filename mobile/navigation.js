import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getTheme, LightHaptics } from "./helpers/common";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Screens } from "./screens";
import { lightColors } from "./theme/colors";
import { changeTheme } from "./store/common/commonActions";

let navigationOptions = {
  headerBackButtonMenuEnabled: false,
  headerShown: false,
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const AppNavigation = () => {
  const { theme } = useSelector((state) => state.commonReducer);
  let [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getTheme().then((theme) => {
      dispatch(changeTheme(theme));
    });
  }, []);

  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Group screenOptions={{}}>
        { user && getAuthenticatedRoutes() }
        { !user && getAuthenticatedRoutes() }
      </Stack.Group>
    </Stack.Navigator>
  </NavigationContainer>
};

// Authenticated Routes
function getAuthenticatedRoutes() {
  return <>
    <Stack.Screen name="TabNavigator" component={TabNavigator} options={navigationOptions}/>
    <Stack.Screen name="Details" component={Screens.Details} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
    <Stack.Screen name="Admin" component={Screens.Admin} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
    <Stack.Screen name="Projects" component={Screens.Projects} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
    <Stack.Screen name="AddProject" component={Screens.AddProject} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
    <Stack.Screen name="Users" component={Screens.Users} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
    <Stack.Screen name="AddUser" component={Screens.AddUser} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
    <Stack.Screen name="Tasks" component={Screens.Tasks} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
    <Stack.Screen name="AddTask" component={Screens.AddTask} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
  </>
}

function getUnauthenticatedRoutes() {
  return <>
    <Stack.Screen name="Login" component={Screens.Login} options={navigationOptions}/>
    <Stack.Screen name="Register" component={Screens.Register} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
  </>
}

// Tabs navigator component
function TabNavigator() {

  const { theme } = useSelector((state) => state.commonReducer);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Search") iconName = "search";
          else if (route.name === "Person") iconName = "user";
          else if (route.name === "Calendar") iconName = "calendar";
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: theme.light,
          paddingTop: 5,
          borderTopColor: theme.light,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarLabelStyle: {
          display: "none",
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.grey,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Screens.Home}
        options={navigationOptions}
      />
      <Tab.Screen
        name="Search"
        component={Screens.Search}
        options={navigationOptions}
      />
      <Tab.Screen
        name="Calendar"
        component={Screens.Calendar}
        options={navigationOptions}
      />
      <Tab.Screen
        name="Person"
        component={Screens.Person}
        options={navigationOptions}
      />
    </Tab.Navigator>
  );
}
