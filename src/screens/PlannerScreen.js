import React from "react";
import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { Context as PlannerContext } from "../context/PlannerContext";
import { Context as ClassesContext } from "../context/ClassesContext";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { icons } from "../icons/ClassFormIcons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PlannerScreen = () => {
  const planner = useContext(PlannerContext);
  const classes = useContext(ClassesContext);
  return (
    <View>
      <CollapsibleHeader
        title="UPCOMING ASSIGNMENTS"
        assignmentsArray={planner.state}
        classesArray={classes.state}
      />
      <CollapsibleHeader
        title="COMPLETED ASSIGNMENTS"
        assignmentsArray={planner.state}
        classesArray={classes.state}
      />
    </View>
  );
};

const CollapsibleHeader = ({ title, assignmentsArray, classesArray }) => {
  const navigation = useNavigation();
  //create a state variable that defines if the collapsible list is collapsed or not
  const [collapsed, setCollapsed] = useState(false);
  //a function that collapses or expands the collapsible list
  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };
  return (
    <View>
      {/*Make a button that expands and collapses the collapsible list*/}
      <TouchableOpacity onPress={toggleExpanded}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      </TouchableOpacity>
      {/*Make a list that collapses and expands. Make the list start out as expanded.*/}
      <Collapsible collapsed={collapsed} align="center">
        <FlatList
          data={assignmentsArray}
          keyExtractor={(index) => index.id + ""}
          scrollEnabled={false}
          renderItem={({ item }) => {
            const schoolClass = classesArray.find(
              (schoolClass) => schoolClass.title === item.schoolClass
            );
            return (
              <View>
                <TouchableOpacity
                  style={styles.workItem}
                  onPress={() => navigation.navigate("Edit Assignment")}
                >
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: schoolClass.backgroundColor },
                    ]}
                  >
                    {schoolClass === undefined ? (
                      <MaterialCommunityIcons
                        name="note-text-outline"
                        size={30}
                        color="white"
                      />
                    ) : (
                      icons(30, "white").find(
                        (iconItem) =>
                          iconItem.icon.props.name ===
                          schoolClass.icon.props.name
                      ).icon
                    )}
                  </View>
                  <View style={styles.workItemTextContainer}>
                    <Text style={styles.workItemTitle}>{item.title}</Text>
                    <Text style={styles.workItemDueDate}>
                      DUE: {item.date.getMonth() + 1}/{item.date.getDate()}/
                      {item.date.getFullYear()}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "flex:start",
                      marginHorizontal: 16,
                      marginVertical: 7,
                      alignItems: "flex-end",
                    }}
                  >
                    <Menu>
                      <MenuTrigger
                        children={
                          <View>
                            <Entypo
                              name="dots-three-horizontal"
                              size={24}
                              color="black"
                            />
                          </View>
                        }
                      />
                      <MenuOptions>
                        <MenuOption
                          //make the edit button navigate to the edit class screen
                          text="Mark As Complete"
                        />
                        <MenuOption
                          //make the edit button navigate to the edit class screen
                          text="Add to Folder"
                        />
                        <MenuOption
                          //make the delete button delete this class
                          onSelect={() => deleteClass(item.id)}
                        >
                          <Text style={{ color: "red" }}>Delete</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    //backgroundColor: "#00022e",
    opacity: 0.85,
  },
  headerText: {
    fontSize: 15,
    marginLeft: 10,
    marginVertical: 10,
    fontWeight: "300",
    color: "black",
  },
  workItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  workItemTitle: {
    fontSize: 20,
  },
  workItemDueDate: {
    fontSize: 12,
    marginTop: 3,
    fontWeight: "300",
  },
  workItemTextContainer: {
    justifyContent: "center",
    marginLeft: 10,
    marginVertical: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
});

export default PlannerScreen;
