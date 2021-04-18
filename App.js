import React, { useContext } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MenuProvider } from "react-native-popup-menu";

import LibraryScreen from "./src/screens/LibraryScreen";
import CameraScreen from "./src/screens/CameraScreen";
import Fullscreen from "./src/screens/Fullscreen";
import ClassesScreen from "./src/screens/ClassesScreen";
import PlannerScreen from "./src/screens/PlannerScreen";
import FolderScreen from "./src/screens/FolderScreen";
import ClassesAddScreen from "./src/screens/ClassesAddScreen";
import ClassesEditScreen from "./src/screens/ClassesEditScreen";
import PlannerAddScreen from "./src/screens/PlannerAddScreen";
import PlannerEditScreen from "./src/screens/PlannerEditScreen";
import { Provider as ImageProvider } from "./src/context/ImageContext";
import { Provider as ClassesProvider } from "./src/context/ClassesContext";
import { Provider as PlannerProvider } from "./src/context/PlannerContext";
import { Provider as FolderProvider } from "./src/context/FoldersContext";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomDrawerContent from "./src/components/CustomDrawerContent";
import { icons } from "./src/icons/ClassFormIcons";

//Create navigators for the app's tabs, stacks, and drawer
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const PlannerStack = createStackNavigator();
const FoldersStack = createStackNavigator();
const CameraStack = createStackNavigator();
const LibraryStack = createStackNavigator();
const ClassesStack = createStackNavigator();

//edit the default theme to customize the background color and header color
const Theme = {
  dark: false,
  colors: {
    //make the back button white
    primary: "white",
    //make the background color white
    background: "rgb(242, 242, 242)",
    //make the header color white
    card: "#ffffff",
    //make the header text black
    //text: "black",
  },
};

//Make a camera stack to get a header for the screen
const CameraStackScreen = ({
  title,
  backgroundColor,
  navigation,
  iconName,
}) => {
  return (
    <CameraStack.Navigator
      screenOptions={{
        headerTransparent: true,
      }}
    >
      <CameraStack.Screen
        name="Camera"
        component={CameraScreen}
        //Make the camera screen's header have the title and color of the class
        //that the user navigated to
        options={{
          title: title,
          headerStyle: {
            ...customHeaderStyle,
          },
          //make the header transparent
          headerTitleStyle: {
            ...customHeaderTitleStyle,
          },
          //put a drawer button on the left of the header
          //pass the navigation property and a title to the button
          headerLeft: () => (
            <DrawerButton navigation={navigation} title="">
              {/* if the iconName is undefined, render a home icon
              if the iconName is not undefined, find the corresponding icon from the
              icons array and set its size to 24 and color to white */}
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: backgroundColor,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {iconName === undefined ? (
                  <Entypo name="home" size={24} color="white" />
                ) : (
                  icons(24, "white").find(
                    (iconItem) => iconItem.icon.props.name === iconName
                  ).icon
                )}
              </View>
            </DrawerButton>
          ),
        }}
      />
    </CameraStack.Navigator>
  );
};

//Make a Library stack to get a header for the screen and to allow the user to fullscreen images on the same tab
const LibraryStackScreen = ({
  title,
  backgroundColor,
  navigation,
  iconName,
}) => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        name="Notes"
        component={LibraryScreen}
        options={{
          //Make the library screen's header have the title and color of the class
          //that the user navigated to
          title: title,
          headerStyle: {
            ...customHeaderStyle,
            backgroundColor:
              backgroundColor === undefined
                ? customHeaderStyle.backgroundColor
                : backgroundColor,
          },
          //make the header title transparent
          headerTitleStyle: {
            ...customHeaderTitleStyle,
          },
          //put a drawer button on the left of the header
          //pass the navigation property and a title to the button
          headerLeft: () => (
            <DrawerButton
              navigation={navigation}
              //title={title === undefined ? "Notes" : title}
              title="Notes"
            >
              {/* if the iconName is undefined, render a home icon
              if the iconName is not undefined, find the corresponding icon from the
              icons array and set its size to 24 and color to white */}
              {iconName === undefined ? (
                <Entypo name="home" size={24} color="white" />
              ) : (
                icons(24, "white").find(
                  (iconItem) => iconItem.icon.props.name === iconName
                ).icon
              )}
            </DrawerButton>
          ),
        }}
      />
      <LibraryStack.Screen
        name="Fullscreen"
        component={Fullscreen}
        options={{
          title: title,
          //Make the library screen's header have the title and color of the class
          //that the user navigated to
          headerStyle: {
            ...customHeaderStyle,
            backgroundColor:
              backgroundColor === undefined
                ? customHeaderStyle.backgroundColor
                : backgroundColor,
          },
          //make the header title transparent
          headerTitleStyle: {
            ...customHeaderTitleStyle,
          },
        }}
      />
    </LibraryStack.Navigator>
  );
};

//Make a folders stack to get a header for the screen
const FoldersStackScreen = ({
  title,
  backgroundColor,
  navigation,
  iconName,
}) => {
  return (
    <FoldersStack.Navigator>
      <FoldersStack.Screen
        name="Folders"
        component={FolderScreen}
        options={{
          //Make the folder screen's header have the title and color of the class
          //that the user navigated to
          title: title,
          headerStyle: {
            ...customHeaderStyle,
            backgroundColor:
              backgroundColor === undefined
                ? customHeaderStyle.backgroundColor
                : backgroundColor,
          },
          headerTitleStyle: {
            ...customHeaderTitleStyle,
          },
          //put a drawer button on the left of the header
          //pass the navigation property to the button
          headerLeft: () => (
            <DrawerButton
              navigation={navigation}
              //title={title === undefined ? "Folders" : title}
              title="Folders"
            >
              {/* if the iconName is undefined, render a home icon
              if the iconName is not undefined, find the corresponding icon from the
              icons array and set its size to 24 and color to white */}
              {iconName === undefined ? (
                <Entypo name="home" size={24} color="white" />
              ) : (
                icons(24, "white").find(
                  (iconItem) => iconItem.icon.props.name === iconName
                ).icon
              )}
            </DrawerButton>
          ),
        }}
      />
    </FoldersStack.Navigator>
  );
};

//Make a planner stack to get a header for the screen
const PlannerStackScreen = ({
  title,
  backgroundColor,
  navigation,
  iconName,
}) => {
  return (
    <PlannerStack.Navigator>
      <PlannerStack.Screen
        name="Planner"
        component={PlannerScreen}
        options={{
          //Make the planner screen's header have the title and color of the class
          //that the user navigated to
          title: title,
          headerStyle: {
            ...customHeaderStyle,
            backgroundColor:
              backgroundColor === undefined
                ? customHeaderStyle.backgroundColor
                : backgroundColor,
          },
          headerTitleStyle: {
            ...customHeaderTitleStyle,
          },
          //put a drawer button on the left of the header
          //pass the navigation property to the button
          headerLeft: () => (
            <DrawerButton
              navigation={navigation}
              //title={title === undefined ? "Planner" : title}
              title="Planner"
            >
              {/* if the iconName is undefined, render a home icon
              if the iconName is not undefined, find the corresponding icon from the
              icons array and set its size to 24 and color to white */}
              {iconName === undefined ? (
                <Entypo name="home" size={24} color="white" />
              ) : (
                icons(24, "white").find(
                  (iconItem) => iconItem.icon.props.name === iconName
                ).icon
              )}
            </DrawerButton>
          ),
          headerRight: () => (
            <AddButton navigation={navigation} destination="New Assignment" />
          ),
        }}
      />
      <PlannerStack.Screen
        name="New Assignment"
        component={PlannerAddScreen}
        options={{
          headerStyle: {
            ...customHeaderStyle,
            backgroundColor:
              backgroundColor === undefined
                ? customHeaderStyle.backgroundColor
                : backgroundColor,
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <PlannerStack.Screen
        name="Edit Assignment"
        component={PlannerEditScreen}
        options={{
          headerStyle: {
            ...customHeaderStyle,
            backgroundColor:
              backgroundColor === undefined
                ? customHeaderStyle.backgroundColor
                : backgroundColor,
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
    </PlannerStack.Navigator>
  );
};

//Make a classes stack to get a header for the screen
const ClassesStackScreen = ({ navigation }) => {
  return (
    <ClassesStack.Navigator>
      <ClassesStack.Screen
        name="Classes"
        component={ClassesScreen}
        options={{
          headerStyle: {
            ...customHeaderStyle,
          },
          headerTitleStyle: {
            ...customHeaderTitleStyle,
          },
          //put a drawer button on the left of the header
          //pass the navigation property to the button
          /* headerLeft: () => <DrawerButton navigation={navigation} />, */
          headerLeft: () => (
            <DrawerButton navigation={navigation} title="Classes">
              <Entypo name="home" size={24} color="white" />
            </DrawerButton>
          ),
          headerRight: () => (
            <AddButton navigation={navigation} destination="New Class" />
          ),
        }}
      />
      <ClassesStack.Screen
        name="New Class"
        component={ClassesAddScreen}
        options={{
          headerStyle: {
            ...customHeaderStyle,
          },
          headerTitleStyle: {
            color: "white",
          },
          //headerRight: () => <SaveClassButton navigation={navigation} />,
        }}
      />
      <ClassesStack.Screen
        name="Edit Class"
        component={ClassesEditScreen}
        options={{
          headerStyle: {
            ...customHeaderStyle,
          },
          headerTitleStyle: {
            color: "white",
          },
          //headerRight: () => <SaveClassButton navigation={navigation} />,
        }}
      />
    </ClassesStack.Navigator>
  );
};

//Make bottom tabs for the classes that the user can navigate to
function ClassBottomTabs({ route }) {
  return (
    <Tab.Navigator
      //customize the bottom tabs using the customTabBarStyle
      //edit some of the parameters from the customTabBarStyle to suit the class that the user navigated to
      tabBarOptions={{
        ...customTabBarStyle,
        activeTintColor: route.params.tintColor,
        style: {
          backgroundColor: "white",
        },
      }}
    >
      <Tab.Screen
        name="Camera"
        options={{
          //make the bottom tab icon a camera
          tabBarIcon: ({ color, size }) => (
            <Feather name="camera" size={size} color={color} />
          ),
        }}
      >
        {/* Customize the header of the camera screen to suit the class that the user navigated to */}
        {(props) => (
          <CameraStackScreen
            {...props}
            title={route.params.title}
            backgroundColor={route.params.backgroundColor}
            iconName={route.params.iconName}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Notes"
        options={{
          //make the bottom tab icon a notes icon
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="note" size={size} color={color} />
          ),
        }}
      >
        {/* Customize the header of the library screen to suit the class that the user navigated to */}
        {(props) => (
          <LibraryStackScreen
            {...props}
            title={route.params.title}
            backgroundColor={route.params.backgroundColor}
            iconName={route.params.iconName}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Folders"
        options={{
          //make the bottom tab icon a folder
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="folder1" size={size} color={color} />
          ),
        }}
      >
        {/* Customize the header of the folders screen to suit the class that the user navigated to */}
        {(props) => (
          <FoldersStackScreen
            {...props}
            title={route.params.title}
            backgroundColor={route.params.backgroundColor}
            iconName={route.params.iconName}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Planner"
        options={{
          //make the bottom tab icon a calendar
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="calendar-check" size={size} color={color} />
          ),
        }}
      >
        {/* Customize the header of the planner screen to suit the class that the user navigated to */}
        {(props) => (
          <PlannerStackScreen
            {...props}
            title={route.params.title}
            backgroundColor={route.params.backgroundColor}
            iconName={route.params.iconName}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

//Make bottom tabs for the homescreen
function HomeBottomTabs() {
  return (
    <Tab.Navigator
      //customize the bottom tabs using the customTabBarStyle
      tabBarOptions={customTabBarStyle}
    >
      <Tab.Screen
        name="Classes"
        //make this tab go to the classes screen
        component={ClassesStackScreen}
        options={{
          //make the icon for this tab a scholar's cap
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notes"
        //make this tab go to the library screen
        component={LibraryStackScreen}
        options={{
          //make the icon for this tab a notes icon
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="note" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Folders"
        //make this tab go to the folders screen
        component={FoldersStackScreen}
        options={{
          //make the icon for this tab a folder
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="folder1" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Planner"
        //make this tab go to the planner screen
        component={PlannerStackScreen}
        options={{
          //make the icon for this tab a calendar
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="calendar-check" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

//make a button that goes to the left of the header that opens up the drawer
const DrawerButton = (props) => {
  return (
    //when the button is pressed, make the drawer open or close
    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ marginLeft: 15 }}>{props.children}</View>
        <Text
          style={{
            fontSize: 30,
            color: "white",
            fontWeight: "bold",
            marginLeft: 12,
          }}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

//make a button that goes to the right of the header that adds a class
const AddButton = ({ navigation, destination }) => {
  return (
    //when the button is pressed, make the drawer open or close
    <TouchableOpacity onPress={() => navigation.navigate(destination)}>
      <View style={{ marginRight: 15 }}>
        <Entypo name="plus" size={30} color="white" />
      </View>
    </TouchableOpacity>
  );
};

//define the primary color of the home page
const homeColor = "#00022e";

//style the bottom tab bar
const customTabBarStyle = {
  activeTintColor: homeColor,
  inactiveTintColor: "gray",
  labelPosition: "below-icon",
  style: {
    backgroundColor: "white",
    height: 80,
  },
  tabStyle: {
    height: 40,
    marginTop: 5,
  },
};

//style the header
const customHeaderStyle = {
  height: 110,
  backgroundColor: homeColor,
};

const customHeaderTitleStyle = {
  color: "transparent",
};

export default () => {
  return (
    <ClassesProvider>
      <FolderProvider>
        <PlannerProvider>
          <ImageProvider>
            <MenuProvider>
              <NavigationContainer theme={Theme}>
                <Drawer.Navigator
                  edgeWidth={30}
                  drawerStyle={{
                    width: 250,
                  }}
                  //customize the items that the drawer shows
                  //pass navigation so that pressing the items in the drawer
                  //navigates the user to the corresponding screen
                  drawerContent={(props) => (
                    <CustomDrawerContent
                      props={props}
                      navigation={props.navigation}
                    />
                  )}
                >
                  <Drawer.Screen name="Home" component={HomeBottomTabs} />
                  <Drawer.Screen name="Class" component={ClassBottomTabs} />
                </Drawer.Navigator>
              </NavigationContainer>
            </MenuProvider>
          </ImageProvider>
        </PlannerProvider>
      </FolderProvider>
    </ClassesProvider>
  );
};
