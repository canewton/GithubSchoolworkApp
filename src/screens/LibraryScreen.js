import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Context as ImageContext } from "../context/ImageContext";
import { Context as ClassesContext } from "../context/ClassesContext";
import ImageLibrary from "../components/ImageLibrary";
import { useNavigation } from "@react-navigation/native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LibraryScreen = () => {
  //determine if this screen is the screen that the user is on
  const isFocused = useIsFocused();
  //create state that determines if the delete button should be shown or not
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);
  const images = useContext(ImageContext);
  const classes = useContext(ClassesContext);
  const navigation = useNavigation();
  //make an edit button to the right of the header that triggers a menu
  //to slide in from the bottom of the screen
  //this menu gives the user several options to edit the notes
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Menu renderer={renderers.SlideInMenu}>
          <MenuTrigger children={<EditButton />} />
          <MenuOptions customStyles={optionsStyles}>
            <MenuOption text="Add Stickynote" />
            <MenuOption text="Staple Images" />
            <MenuOption text="Add Images to Folder" />
            <MenuOption
              //if the delete images editting option is pressed, reveal the delete buttons
              text="Delete Images"
              onSelect={() => setShowDeleteButtons(true)}
            />
          </MenuOptions>
        </Menu>
      ),
    });
  });

  //when the user navigates to this screen, do not show the delete buttons and deselect all images
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      //the screen is focused
      setShowDeleteButtons(false);
      images.deselectAllImages();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  //return an array of all the images that are selected
  const filterImagesBySelected = (imagesArray) => {
    return imagesArray.filter((image) => {
      return image.selected === true;
    });
  };

  //if one or less than one item is selected, make the text show "Delete Item"
  //if two or more items are selected, make the text show "Delete _ Items"
  const deleteItemsText = (numItems) => {
    if (numItems <= 1) {
      return "Delete Item";
    }
    return "Delete " + numItems + " Items";
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageLibrary
        classes={classes.state}
        images={images.state}
        //if the delete buttons are showing, then the mode that the user is in is the select mode
        //if the delete buttons are not showing, the user is in the app's default mode
        //the mode determines if certain elements (like checkmarks) are shown
        mode={showDeleteButtons === true ? "select" : "default"}
      />
      {showDeleteButtons && isFocused && (
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              //if the delete button is pressed, remove the corresponding images from the state and storage
              filterImagesBySelected(images.state).forEach((item) => {
                images.deleteImage(item.uri);
                AsyncStorage.removeItem(item.uri);
              });
              //hide the delete buttons after the user presses "Delete"
              setShowDeleteButtons(false);
            }}
          >
            <Text style={{ fontSize: 18, color: "#FC3158" }}>
              {deleteItemsText(filterImagesBySelected(images.state).length)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              //if the cancel button is pressed, deselect all of the images in the context
              images.deselectAllImages();
              //hide the delete buttons after the user presses "Cancel"
              setShowDeleteButtons(false);
            }}
          >
            <Text style={{ fontSize: 18, color: "#147EFB" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

//make a button that goes to the right of the header that saves the class being editted or added
const EditButton = () => {
  return (
    <View style={{ marginRight: 15, marginTop: 3 }}>
      <Text style={{ color: "white", fontSize: 18, fontWeight: "400" }}>
        Edit
      </Text>
    </View>
  );
};

const optionsStyles = {
  optionText: {
    fontSize: 20,
    marginVertical: 8,
    marginLeft: 10,
  },
  optionsWrapper: {
    marginBottom: 50,
  },
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    alignSelf: "stretch",
    backgroundColor: "white",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LibraryScreen;
