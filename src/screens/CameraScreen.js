import React, { useState, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity, Image, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import SelectMultiple from "react-native-select-multiple";
import { Context as ImageContext } from "../context/ImageContext";
import { Context as ClassesContext } from "../context/ClassesContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CameraSceen = () => {
  //make a function that stores data given a key and a value to
  //react native's asyncstorage
  const storeData = async (key, value, title) => {
    try {
      //put {break} in between the title and value so that they can be seperated by
      //the string.split() function when imported
      await AsyncStorage.setItem(key, title + "{break}" + value);
    } catch (e) {
      console.log(e);
    }
  };

  //get the function that adds images to Image Context so that other scripts
  //can access it
  const images = useContext(ImageContext);

  const classes = useContext(ClassesContext);

  //initialize state that contains whether the user can access the camera or not
  const [hasPermission, setHasPermission] = useState(null);

  //initialize state that references the expo camera
  const [cameraRef, setCameraRef] = useState(null);

  //initialize state that contains whether the phone's front camera or back camera is displayed
  const [type, setType] = useState(Camera.Constants.Type.back);

  //create variables that determine which checkmarks are shown and which checkmarks are checked on the initial render
  const tags = ["Homework", "Test", "Notes"];
  const [selectedTags, setSelectedTags] = useState([]);

  const onSelectionsChange = (selectedTags) => {
    // selectedTags is array of { label, value }
    setSelectedTags(selectedTags);
  };

  //ask the user to access the camera
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  //if the user does not choose if they are to grant permission or not, show a blank screen
  if (hasPermission === null) {
    return <View />;
  }
  //if the user denies permission to access camera, say that they don't have access to the camera
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  //if the user gives the app permission to use the camera, render the following
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "flex-end",
          }}
        >
          {/* <SelectMultiple
            items={tags}
            selectedItems={selectedTags}
            onSelectionsChange={onSelectionsChange}
            rowStyle={{
              backgroundColor: "transparent",
              borderBottomWidth: 0,
            }}
          /> */}
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignSelf: "center", marginBottom: 20 }}
            onPress={async () => {
              if (cameraRef) {
                //take a picture, add it to ImageContext, and store it in asyncstorage
                let photo = await cameraRef.takePictureAsync();
                var todaysDate = new Date();
                var dateString =
                  todaysDate.getMonth() +
                  1 +
                  "/" +
                  todaysDate.getDate() +
                  "/" +
                  todaysDate.getFullYear();
                storeData(
                  photo.uri,
                  dateString,
                  //store the title of the active class so that it can be filered later
                  classes.state.find(
                    (schoolClass) => schoolClass.active === true
                  ).title
                );
                images.addImage(
                  photo.uri,
                  todaysDate,
                  //add the title of the active class so that it can be filered later
                  classes.state.find(
                    (schoolClass) => schoolClass.active === true
                  ).title
                );
              }
            }}
          >
            <View
              style={{
                borderWidth: 2,
                borderRadius: "50%",
                borderColor: "white",
                height: 50,
                width: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: "50%",
                  borderColor: "white",
                  height: 40,
                  width: 40,
                  backgroundColor: "white",
                }}
              ></View>
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 50,
              width: Dimensions.get("window").width,
              backgroundColor: "white",
              /* state.find((schoolClass) => schoolClass.active === true) ===
                undefined
                  ? "white"
                  : state.find((schoolClass) => schoolClass.active === true)
                      .backgroundColor, */
            }}
          >
            <View
              style={{
                height: 50,
                aspectRatio: 1,
                alignSelf: "flex-start",
                backgroundColor: "red",
              }}
            ></View>
            <Image
              style={{
                height: 50,
                aspectRatio: 1,
                alignSelf: "flex-start",
                resizeMode: "contain",
              }}
              source={images.state[images.state.length - 1]}
            />
          </View>
        </View>
      </Camera>
    </View>
  );
};

export default CameraSceen;
