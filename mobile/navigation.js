import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LightHaptics } from "./helpers/common";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Screens } from "./screens";
import { lightColors } from "./theme/colors";

let navigationOptions = {
  headerBackButtonMenuEnabled: false,
  headerShown: false,
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const AppNavigation = () => {

  let [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {

  }, []);

  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Group screenOptions={{}}>
        { user && getAuthenticatedRoutes() }
        { !user && getUnauthenticatedRoutes() }
      </Stack.Group>
    </Stack.Navigator>
  </NavigationContainer>
};

// Authenticated Routes
function getAuthenticatedRoutes() {
  return <>
    <Stack.Screen name="TabNavigator" component={TabNavigator} options={navigationOptions}/>
    <Stack.Screen name="Home" component={Screens.Home} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
  </>
}

function getUnauthenticatedRoutes() {
  return <>
    <Stack.Screen name="TabNavigator" component={TabNavigator} options={navigationOptions}/>
    <Stack.Screen name="Home" component={Screens.Home} listeners={{ focus: () => LightHaptics() }} options={navigationOptions}/>
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
          borderTopColor: theme.grey,
        },
        tabBarIconStyle: {
          marginTop: 5,
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
