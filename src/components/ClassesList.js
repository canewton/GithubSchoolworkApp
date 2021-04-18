import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Context as ClassesContext } from "../context/ClassesContext";

const ClassesList = ({ classes }) => {
  //get access to the navigation property
  const navigation = useNavigation();

  const { state, deleteClass, makeClassActive } = useContext(ClassesContext);

  return (
    <View>
      {/* Render a list of classes that navigate to the corresponding screen when pressed */}
      <FlatList
        data={classes}
        keyExtractor={(index) => index.id + ""}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  //if this class is pressed, set active to true in the classes context
                  makeClassActive(item.id);
                  navigation.navigate("Class", {
                    //pass the corresponding data to ClassBottomTabs
                    //since ClassBottomTabs is just a template for all class screens
                    title: item.title,
                    backgroundColor: item.backgroundColor,
                    tintColor: item.borderColor,
                    iconName: item.icon.props.name,
                  });
                }}
              >
                <View
                  style={[
                    styles.classButton,
                    {
                      backgroundColor: item.backgroundColor,
                      borderColor: item.borderColor,
                    },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 10,
                      flex: 1,
                    }}
                  >
                    <View style={{ marginTop: 10 }}>{item.icon}</View>
                    <View style={{ marginLeft: 10, marginTop: 10 }}>
                      <Text style={styles.classTitle}>{item.title}</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.detailsText}>0 ASSIGNMENTS</Text>
                        <Text style={[styles.detailsText, { marginLeft: 50 }]}>
                          0 NOTES
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        marginHorizontal: 11,
                        marginVertical: 5,
                        alignItems: "flex-end",
                      }}
                    >
                      {/* make a dropdown menu appear when the ... button is clicked */}
                      <Menu>
                        <MenuTrigger
                          children={
                            <View
                              style={{
                                paddingHorizontal: 5,
                              }}
                            >
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
                            onSelect={() =>
                              navigation.navigate("Edit Class", {
                                title: item.title,
                                backgroundColor: item.backgroundColor,
                                borderColor: item.borderColor,
                                iconName: item.icon.props.name,
                                id: item.id,
                              })
                            }
                            text="Edit"
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
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  classButton: {
    borderRadius: 5,
    marginHorizontal: 5,
    marginTop: 5,
    borderWidth: 2,
  },
  classTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  detailsText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "600",
    color: "black",
    marginBottom: 20,
  },
});

export default ClassesList;
