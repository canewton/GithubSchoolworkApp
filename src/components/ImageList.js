import React, { useState, usseContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Context as ImageContext } from "../context/ImageContext";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

const imagesPerRow = 3;
const windowWidth = Dimensions.get("window").width;

//determine the size that images need to be in order to full up the entire screen space
const calculatedImageSize = () => {
  var size = windowWidth / imagesPerRow;
  return size;
};

const ImageList = ({ images, mode }) => {
  //determine if this is the page that the user is on
  const isFocused = useIsFocused();
  const { state, toggleSelectImage } = useContext(ImageContext);
  const navigation = useNavigation();

  return (
    <View>
      <FlatList
        numColumns={imagesPerRow}
        data={images}
        keyExtractor={(image) => image.uri}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={
                //if this image is pressed and the mode is not "select", enter fullscreen
                //if this image is pressed and the mode is "select",
                //change the select property in the image context
                mode !== "select"
                  ? () =>
                      navigation.navigate("Fullscreen", {
                        uri: item.uri,
                      })
                  : () => {
                      toggleSelectImage(item.uri);
                    }
              }
            >
              <ImageButton
                uri={item.uri}
                height={calculatedImageSize()}
                width={calculatedImageSize()}
                state={state}
                mode={mode}
                focused={isFocused}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const ImageButton = (props) => {
  return (
    <View>
      <Image
        style={{ height: props.height, width: props.width }}
        source={{ uri: props.uri }}
      />
      {/* if this image is selected according to the image context,
      display a check mark on the top left corner of it */}
      {props.state.find((item) => item.uri === props.uri).selected === true &&
        props.mode === "select" &&
        props.focused && (
          <View style={{ position: "absolute", margin: 5 }}>
            <Ionicons name="checkmark-circle-sharp" size={24} color="#147EFB" />
          </View>
        )}
      {/* if this image is not selected according to the image context,
      display an empty circle on the top left corner of it */}
      {props.state.find((item) => item.uri === props.uri).selected === false &&
        props.mode === "select" &&
        props.focused && (
          <View
            style={{ position: "absolute", marginLeft: 6.5, marginTop: 7.2 }}
          >
            <View style={styles.emptyCircle}></View>
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyCircle: {
    borderRadius: 10,
    borderWidth: 1.5,
    height: 20,
    width: 20,
    borderColor: "#147EFB",
  },
});

export default ImageList;
