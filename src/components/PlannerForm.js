import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import { Context as ClassesContext } from "../context/ClassesContext";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors, icons } from "../icons/ClassFormIcons";

//get the width of the window
const windowWidth = Dimensions.get("window").width;
const classCircleMargin = 5;
const classColumns = 4;
const edgeMargin = 5;
//calculate all of the white space around each of the color circles
const totalColorWhiteSpace =
  classColumns * classCircleMargin * 2 + edgeMargin * 2;
//calculate the circle diameter so that all of the circles can be spaced evenly on the screen
const classCircleDiameter = (windowWidth - totalColorWhiteSpace) / classColumns;

//get the function (onEdit) to call if the class is editted
//get the initial values of the assignment if the assignment is being edited
const ClassForm = ({ onEdit, initialValues }) => {
  const classes = useContext(ClassesContext);
  //if the class is being edited, set the corresponding state to the class's values
  //if the class is not being  edited, set the state to the default values
  const [title, setTitle] = useState(
    initialValues.title === null ? "" : initialValues.title
  );
  const [date, setDate] = useState(
    initialValues.dateString === null
      ? new Date()
      : new Date(initialValues.dateString)
  );
  const [schoolClass, setSchoolClass] = useState(
    initialValues.schoolClass === null ? "" : initialValues.schoolClass
  );

  //every time that title, backgroundcolor, bordercolor, or icon is editted
  //call the onEdit function and pass those values to it
  useEffect(() => {
    onEdit(
      title,
      schoolClass,
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
    );
  }, new Array(title, schoolClass, date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()));

  return (
    <View>
      <TextInput
        style={[styles.input]}
        value={title}
        placeholder="Assignment Name"
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.subtitle}>Choose Class:</Text>
      <View style={{ margin: edgeMargin }}>
        <FlatList
          data={classes.state}
          keyExtractor={(index) => index.id + ""}
          numColumns={classColumns}
          scrollEnabled={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                //if this icon is pressed, set the state to this icon so that
                //it can be used to change the values of classes context later
                onPress={() => {
                  setSchoolClass(item.title);
                }}
              >
                <View
                  style={
                    //if this icon is the one that the user chooses, make it have an opacity of 1
                    //if this icon is not the one that the user chooses, make it have an opacity of .25
                    item.title === schoolClass
                      ? [
                          styles.classCircle,
                          {
                            backgroundColor: item.backgroundColor,
                            borderColor: item.borderColor,
                          },
                        ]
                      : [
                          styles.classCircle,
                          {
                            backgroundColor: item.backgroundColor,
                            borderColor: item.borderColor,
                            opacity: 0.25,
                          },
                        ]
                  }
                >
                  {/* render the icon */}
                  {item.icon}
                  <Text style={styles.classLabel}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 10,
    marginTop: 20,
    fontSize: 25,
    borderColor: "black",
    marginBottom: 15,
    borderBottomWidth: 3,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15,
    marginLeft: 10,
  },
  classCircle: {
    height: classCircleDiameter,
    width: classCircleDiameter,
    borderRadius: classCircleDiameter / 2,
    borderWidth: 3,
    margin: classCircleMargin,
    alignItems: "center",
    justifyContent: "center",
  },
  classLabel: {
    marginTop: 5,
    marginHorizontal: 6,
    fontSize: 10,
    alignSelf: "center",
    fontWeight: "300",
    textAlign: "center",
  },
});

export default ClassForm;
