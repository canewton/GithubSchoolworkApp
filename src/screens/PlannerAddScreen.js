import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PlannerForm from "../components/PlannerForm";
import { Context as PlannerContext } from "../context/PlannerContext";
import { useNavigation } from "@react-navigation/native";

const PlannerAddScreen = () => {
  const { addWorkItem } = useContext(PlannerContext);
  const navigation = useNavigation();
  const [workItem, setWorkItem] = useState();
  //add a save button to the right of the header that adds a class to the context
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            addWorkItem(
              workItem.title,
              workItem.dateString,
              workItem.schoolClass,
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
      <PlannerForm
        //set all the initial values to null since a new class does not have any starting values
        initialValues={{
          title: null,
          schoolClass: null,
          dateString: null,
          id: null,
        }}
        //when the class is editted, the schoolclass state is updated with its current values
        onEdit={(title, schoolClass, dateString) => {
          setWorkItem({ title, schoolClass, dateString });
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

export default PlannerAddScreen;
