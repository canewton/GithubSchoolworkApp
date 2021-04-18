import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ClassForm from "../components/ClassForm";
import { Context as ClassesContext } from "../context/ClassesContext";
import { useNavigation } from "@react-navigation/native";

const ClassesAddScreen = () => {
  const { addClass } = useContext(ClassesContext);
  const navigation = useNavigation();
  const [schoolClass, setSchoolClass] = useState();
  //add a save button to the right of the header that adds a class to the context
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            addClass(
              schoolClass.title,
              schoolClass.backgroundColor,
              schoolClass.borderColor,
              schoolClass.icon,
              () => navigation.pop()
            );
          }}
        >
          <SaveClassButton />
        </TouchableOpacity>
      ),
    });
  });
  return (
    <View>
      <ClassForm
        //set all the initial values to null since a new class does not have any starting values
        initialValues={{
          title: null,
          backgroundColor: null,
          borderColor: null,
          iconName: null,
          id: null,
        }}
        //when the class is editted, the schoolclass state is updated with its current values
        onEdit={(title, backgroundColor, borderColor, icon) => {
          setSchoolClass({ title, backgroundColor, borderColor, icon });
        }}
      />
    </View>
  );
};

//make a button that goes to the right of the header that saves the class being editted or added
const SaveClassButton = () => {
  return (
    <View style={{ marginRight: 15 }}>
      <Text style={{ color: "white", fontSize: 18, fontWeight: "400" }}>
        Save
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ClassesAddScreen;
