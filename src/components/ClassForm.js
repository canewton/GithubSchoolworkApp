import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors, icons } from "../icons/ClassFormIcons";

//get the width of the window
const windowWidth = Dimensions.get("window").width;
const colorCircleMargin = 5;
const colorColumns = 6;
const edgeMargin = 5;
//calculate all of the white space around each of the color circles
const totalColorWhiteSpace =
  colorColumns * colorCircleMargin * 2 + edgeMargin * 2;
//calculate the circle diameter so that all of the circles can be spaced evenly on the screen
const colorCircleDiameter = (windowWidth - totalColorWhiteSpace) / colorColumns;

//get the function (onEdit) to call if the class is editted
//get the initial values of the class if the class is being edited
const ClassForm = ({ onEdit, initialValues }) => {
  //if the class is being edited, set the corresponding state to the class's values
  //if the class is not being  edited, set the state to the default values
  const [title, setTitle] = useState(
    initialValues.title === null ? "" : initialValues.title
  );
  const [backgroundColor, setBackgroundColor] = useState(
    initialValues.backgroundColor === null
      ? colors[0].backgroundColor
      : initialValues.backgroundColor
  );
  const [borderColor, setborderColor] = useState(
    initialValues.borderColor === null
      ? colors[0].borderColor
      : initialValues.borderColor
  );
  const [icon, setIcon] = useState(
    initialValues.iconName === null
      ? icons(30, "black")[0].icon
      : //find the icon that corresponds to the icon name
        icons(30, "black").find(
          (iconItem) => iconItem.icon.props.name === initialValues.iconName
        ).icon
  );

  //every time that title, backgroundcolor, bordercolor, or icon is editted
  //call the onEdit function and pass those values to it
  useEffect(() => {
    onEdit(title, backgroundColor, borderColor, icon);
  }, new Array(title, backgroundColor, borderColor, icon));

  return (
    <View>
      <TextInput
        style={[styles.input, { borderColor: borderColor }]}
        value={title}
        placeholder="Class Name"
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.subtitle}>Choose Color:</Text>
      <View style={{ margin: edgeMargin }}>
        {/* make a grid of colors that the user can choose from */}
        <FlatList
          data={colors}
          keyExtractor={(index) => index.backgroundColor}
          numColumns={colorColumns}
          scrollEnabled={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                //if this color is pressed, set the state to this color so that
                //it can be used to change the values of classes context later
                onPress={() => {
                  setBackgroundColor(item.backgroundColor);
                  setborderColor(item.borderColor);
                }}
              >
                <View
                  //make a color that the user can choose a circle that has a border
                  //with a complementing color
                  style={[
                    styles.color,
                    {
                      backgroundColor: item.backgroundColor,
                      borderColor: item.borderColor,
                    },
                  ]}
                >
                  {/* if this is the color that the user selects, put a checkmark on it */}
                  {backgroundColor === item.backgroundColor &&
                    borderColor === item.borderColor && (
                      <FontAwesome name="check" size={28} color="black" />
                    )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <Text style={styles.subtitle}>Choose Icon:</Text>
        {/* make a grid of icons that the user can choose from */}
        <FlatList
          data={icons(30, "black")}
          keyExtractor={(index) => index.id + ""}
          numColumns={colorColumns}
          scrollEnabled={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                //if this icon is pressed, set the state to this icon so that
                //it can be used to change the values of classes context later
                onPress={() => {
                  setIcon(item.icon);
                }}
              >
                <View
                  style={
                    //if this icon is the one that the user chooses, make it have an opacity of 1
                    //if this icon is not the one that the user chooses, make it have an opacity of .25
                    icon.props.name === item.icon.props.name
                      ? [
                          styles.color,
                          {
                            backgroundColor: backgroundColor,
                            borderColor: borderColor,
                          },
                        ]
                      : [
                          styles.color,
                          {
                            backgroundColor: backgroundColor,
                            borderColor: borderColor,
                            opacity: 0.25,
                          },
                        ]
                  }
                >
                  {/* render the icon */}
                  {item.icon}
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
    marginTop: 15,
    fontSize: 40,
    borderColor: "black",
    marginBottom: 15,
    borderBottomWidth: 3,
  },
  color: {
    height: colorCircleDiameter,
    width: colorCircleDiameter,
    borderRadius: colorCircleDiameter / 2,
    borderWidth: 3,
    margin: colorCircleMargin,
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15,
    marginLeft: 10,
  },
  button: {
    marginTop: 10,
    height: 50,
    width: 180,
    borderRadius: 50,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
  },
});

export default ClassForm;
