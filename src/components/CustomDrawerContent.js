import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, LogBox } from "react-native";
import { Context as ClassesContext } from "../context/ClassesContext";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

const CustomDrawerContent = ({ props, navigation }) => {
  //Ignore the warnings that talk about Flatlists being nested in a Scrollview
  //This needs to happen because the Flatlist is in the drawer
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  //get the state of the ClassesContext
  const { state, makeClassActive } = useContext(ClassesContext);
  //set the item highlighted in the drawer to the home item
  const focusedClass = () => {
    return state.find((schoolClass) => schoolClass.active === true) ===
      undefined
      ? "Home"
      : state.find((schoolClass) => schoolClass.active === true).title;
  };
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      <DrawerItem
        activeTintColor="gray"
        labelStyle={{ color: "gray" }}
        label="Home"
        //if the focusedClass is equal to the name of this drawer item, highlight it in the drawer
        focused={"Home" === focusedClass()}
        onPress={() => {
          makeClassActive(-1);
          navigation.navigate("Home");
        }}
      />
      {/* Make a list of classes that the user can navigate to */}
      <FlatList
        data={state}
        keyExtractor={(index) => index.id + ""}
        scrollEnabled={false}
        renderItem={({ item }) => {
          return (
            <DrawerItem
              activeTintColor="gray"
              labelStyle={{ color: "gray" }}
              label={item.title}
              //if the focusedClass state is equal to this class, highlight this class in the drawer
              focused={item.title === focusedClass()}
              onPress={() => {
                makeClassActive(item.id);
                //if this class is pressed in the drawer, highlight it in the drawer
                //navigate to the corresponding screen and pass the corresponding colors and title
                navigation.navigate("Class", {
                  title: item.title,
                  iconName: item.icon.props.name,
                  backgroundColor: item.backgroundColor,
                  tintColor: item.borderColor,
                });
              }}
            />
          );
        }}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({});

export default CustomDrawerContent;
