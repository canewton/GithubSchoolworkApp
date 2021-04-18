import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ImageList from "../components/ImageList";

const ImageLibrary = ({ classes, images, mode }) => {
  //Make an array of months to convert the date from number form (1/1/2021)
  //into word form (January 1, 2021)
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //return an array that returns an array of all the images that is tagged with
  //the give schoolclass within the imagesArray
  const filterImagesByClass = (schoolClass, imagesArray) => {
    return imagesArray.filter((image) => {
      return image.tags === schoolClass;
    });
  };

  //if there is a class that is active, return all of the classes that are tagged with that active class
  //if there is not a class that is active, do not filter the images
  var imagesFilteredByClass = filterImagesByClass(
    classes.find((schoolClass) => schoolClass.active === true) === undefined
      ? null
      : classes.find((schoolClass) => schoolClass.active === true).title,
    images
  );
  //if there are no active classes, assign all of the images to imagesFilteredByClass
  //this is because the user could be on the classes screen if there is no active class
  if (
    classes.find((schoolClass) => schoolClass.active === true) === undefined
  ) {
    imagesFilteredByClass = images;
  }

  //return an array that contains all of the images in the imagesArray that have the filterDate
  const filterImagesByDate = (filterDate, imagesArray) => {
    return imagesArray.filter((image) => {
      return (
        image.date.getDate() === filterDate.getDate() &&
        image.date.getMonth() === filterDate.getMonth() &&
        image.date.getYear() === filterDate.getYear()
      );
    });
  };

  //return an array that contains all of the images in the images Array that do not have the filterDate
  const removeImagesByDate = (filterDate, imagesArray) => {
    return imagesArray.filter((image) => {
      return (
        image.date.getDate() !== filterDate.getDate() &&
        image.date.getMonth() !== filterDate.getMonth() &&
        image.date.getYear() !== filterDate.getYear()
      );
    });
  };

  //Make a function that returns an array of arrays
  //The innermost array contains images that all have the same date
  //The outermost array contains these arrays with the last element being
  //the most recent date and the first element being the date farthest back in time
  const groupImagesByDate = (imagesArray) => {
    //Duplicate the images array and assign it to the remainingImages array
    var remainingImages = [...imagesArray];
    //Create an empty array that will be filled with arrays
    //that have images of the same date
    const newImagesArray = [];
    while (remainingImages.length > 0) {
      //add the images array of the oldest date to the end of the newImagesArray
      //this will put all of the old images at the end of the array and all
      //of the new images at the front of the array when the loop is finished
      newImagesArray.push(
        filterImagesByDate(remainingImages[0].date, imagesArray)
      );
      //remove the images added to newWorkoutsArray from remainingWorkouts
      remainingImages = removeImagesByDate(
        remainingImages[0].date,
        remainingImages
      );
    }
    return newImagesArray;
  };

  const imagesSortedByDate = groupImagesByDate(imagesFilteredByClass);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={imagesSortedByDate}
        keyExtractor={(imageGroup) => imageGroup[0].uri}
        renderItem={({ item }) => {
          return (
            <View>
              <Text style={styles.date}>
                {months[item[0].date.getMonth()]} {item[0].date.getDate()},{" "}
                {item[0].date.getFullYear()}
              </Text>
              <ImageList images={item} mode={mode} />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  date: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 10,
    marginLeft: 10,
  },
});

export default ImageLibrary;
