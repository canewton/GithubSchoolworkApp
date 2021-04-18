import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Fullscreen = ({ route }) => {
  const imageUri = route.params.uri;
  return (
    <View style={styles.containter}>
      <Image style={styles.image} source={{ uri: imageUri }} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  containter: {
    flex: 1,
  },
});

export default Fullscreen;
