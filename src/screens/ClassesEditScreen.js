import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ClassForm from "../components/ClassForm";
import { Context as ClassesContext } from "../context/ClassesContext";
import { useNavigation } from "@react-navigation/native";

const ClassesEditScreen = ({ route }) => {
  const { state, editClass } = useContext(ClassesContext);
  const navigation = useNavigation();
  //find the class from the classContext that has the same id as the class that the user is editting
  const schoolClassFromContext = state.find(
    (schoolClass) => schoolClass.id === route.params.id
  );
  const [schoolClass, setSchoolClass] = useState();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            editClass(
              schoolClass.title,
              schoolClass.backgroundColor,
              schoolClass.borderColor,
              schoolClass.icon,
              schoolClassFromContext.id,
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
        //set the initial values of the class form to the values of the class that the user is editting
        initialValues={{
          title: schoolClassFromContext.title,
          backgroundColor: schoolClassFromContext.backgroundColor,
          borderColor: schoolClassFromContext.borderColor,
          iconName: schoolClassFromContext.icon.props.name,
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

export default ClassesEditScreen;
