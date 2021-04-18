import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Context as ClassesContext } from "../context/ClassesContext";
import ClassesList from "../components/ClassesList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context as ImageContext } from "../context/ImageContext";

const ClassesScreen = () => {
  const { state } = useContext(ClassesContext);
  const { addImage } = useContext(ImageContext);

  //import all of the photos in storage
  const importAllData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    AsyncStorage.multiGet(keys)
      .then((response) => {
        //response[0][0] === Key1
        //response[0][1] === Value1
        //for each element in the dataArray, add it to the image context
        response.forEach((element) => {
          addImage(
            //get the uri
            element[0],
            //get the date
            new Date(element[1].split("{break}")[1]),
            //get the tags
            element[1].split("{break}")[0]
          );
        });
      })
      .catch((error) => {
        // Handle errors
        console.error(error.message);
      });
  };

  const removeAllData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    AsyncStorage.multiRemove(keys);
  };

  useEffect(() => {
    //removeAllData();
    importAllData();
  }, []);

  return (
    <View>
      <ClassesList classes={state} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ClassesScreen;
