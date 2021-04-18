import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const colors = [
  {
    //red
    //backgroundColor: "#F8CECC",
    //borderColor: "#B85450",
    backgroundColor: "#E63946",
    borderColor: "#E63946",
  },
  {
    //orange
    //backgroundColor: "#FFE6CC",
    //borderColor: "#D79B00",
    backgroundColor: "#F8961E",
    borderColor: "#F8961E",
  },
  {
    //yellow
    //backgroundColor: "#FFF2CC",
    //borderColor: "#D6B656",
    backgroundColor: "#F9C74F",
    borderColor: "#F9C74F",
  },
  {
    //green
    //backgroundColor: "#D5E8D4",
    //borderColor: "#82B366",
    backgroundColor: "#90BE6D",
    borderColor: "#90BE6D",
  },
  {
    //turquoise
    //backgroundColor: "#B0E3E6",
    //borderColor: "#0E8088",
    backgroundColor: "#43AA8B",
    borderColor: "#43AA8B",
  },
  {
    //blue
    //backgroundColor: "#DAE8FC",
    //borderColor: "#6C8EBF",
    backgroundColor: "#277DA1",
    borderColor: "#277DA1",
  },
  {
    //purple
    //backgroundColor: "#E1D5E7",
    //borderColor: "#9673A6",
    backgroundColor: "#9673A6",
    borderColor: "#9673A6",
  },
  {
    //black
    //backgroundColor: "#BAC8D3",
    //borderColor: "#23445D",
    backgroundColor: "#23445D",
    borderColor: "#23445D",
  },
];

//const iconSize = 30;
const icons = (iconSize, iconColor) => [
  {
    icon: <FontAwesome5 name="book" size={iconSize} color={iconColor} />,
    id: 1,
  },
  {
    icon: <FontAwesome5 name="scroll" size={iconSize} color={iconColor} />,
    id: 2,
  },
  {
    icon: <Ionicons name="md-calculator" size={iconSize} color={iconColor} />,
    id: 3,
  },
  { icon: <Feather name="monitor" size={iconSize} color={iconColor} />, id: 4 },
  {
    icon: <FontAwesome name="paint-brush" size={iconSize} color={iconColor} />,
    id: 5,
  },
  {
    icon: <FontAwesome5 name="running" size={iconSize} color={iconColor} />,
    id: 6,
  },
  {
    icon: <FontAwesome5 name="satellite" size={iconSize} color={iconColor} />,
    id: 7,
  },
  {
    icon: <Foundation name="graph-pie" size={iconSize} color={iconColor} />,
    id: 8,
  },
  {
    icon: <FontAwesome5 name="dna" size={iconSize - 2} color={iconColor} />,
    id: 9,
  },
  {
    icon: <FontAwesome5 name="atom" size={iconSize} color={iconColor} />,
    id: 10,
  },
  {
    icon: <Entypo name="code" size={iconSize} color={iconColor} />,
    id: 11,
  },
  {
    icon: <Ionicons name="earth-sharp" size={iconSize} color={iconColor} />,
    id: 12,
  },
  {
    icon: <AntDesign name="heart" size={iconSize} color={iconColor} />,
    id: 13,
  },
  {
    icon: <FontAwesome name="gear" size={iconSize} color={iconColor} />,
    id: 14,
  },
  {
    icon: <FontAwesome5 name="history" size={iconSize} color={iconColor} />,
    id: 15,
  },
  {
    icon: (
      <Ionicons name="musical-notes" size={iconSize + 2} color={iconColor} />
    ),
    id: 16,
  },
  {
    icon: (
      <MaterialIcons
        name="local-fire-department"
        size={iconSize}
        color={iconColor}
      />
    ),
    id: 17,
  },
  {
    icon: <FontAwesome5 name="leaf" size={iconSize - 3} color={iconColor} />,
    id: 18,
  },
  {
    icon: <MaterialIcons name="camera-alt" size={iconSize} color={iconColor} />,
    id: 19,
  },
  {
    icon: (
      <MaterialCommunityIcons
        name="head-cog"
        size={iconSize + 4}
        color={iconColor}
      />
    ),
    id: 20,
  },
  {
    icon: <MaterialIcons name="message" size={iconSize} color={iconColor} />,
    id: 21,
  },
  {
    icon: (
      <FontAwesome5 name="theater-masks" size={iconSize} color={iconColor} />
    ),
    id: 22,
  },
  {
    icon: (
      <MaterialCommunityIcons
        name="elephant"
        size={iconSize}
        color={iconColor}
      />
    ),
    id: 23,
  },
  {
    icon: <Fontisto name="test-tube" size={iconSize} color={iconColor} />,
    id: 24,
  },
];

export { colors, icons };
