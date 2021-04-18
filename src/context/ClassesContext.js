import createDataContext from "./createDataContext";
import React from "react";
import { colors, icons } from "../icons/ClassFormIcons";

const classesReducer = (state, action) => {
  switch (action.type) {
    case "add_class":
      //add a new element to the state array
      return [
        ...state,
        {
          title: action.payload.title,
          backgroundColor: action.payload.backgroundColor,
          borderColor: action.payload.borderColor,
          icon: action.payload.icon,
          //create an id for the new class which is equal to the length of the current classes array + 1
          id: state.length + 1,
          active: false,
        },
      ];
    case "edit_class":
      //look at the classes one by one and determine if it should be replaced by action.payload
      return state.map((schoolClass) => {
        if (schoolClass.id === action.payload.id) {
          action.payload.active = false;
          return action.payload;
        } else {
          return schoolClass;
        }
      });
    case "delete_class":
      //filter() goes through all the elements of the state array and runs a child function on it
      //if the function equals true, than it gets added to a new array
      //if the function equals false, than it gets rejected from the new array
      //return that new array
      return state.filter((schoolClass) => schoolClass.id !== action.payload);
    case "make_class_active":
      //look at the classes one by one
      //if the action.payload id matches the schoolclass id, set active to true
      //if the action.payload id does not match the schoolclass id, set active to false
      return state.map((schoolClass) => {
        //console.log(action.payload.id);
        if (schoolClass.id === action.payload) {
          return {
            title: schoolClass.title,
            backgroundColor: schoolClass.backgroundColor,
            borderColor: schoolClass.borderColor,
            icon: schoolClass.icon,
            id: schoolClass.id,
            active: true,
          };
        } else {
          return {
            title: schoolClass.title,
            backgroundColor: schoolClass.backgroundColor,
            borderColor: schoolClass.borderColor,
            icon: schoolClass.icon,
            id: schoolClass.id,
            active: false,
          };
        }
      });
  }
};

const addClass = (dispatch) => {
  //take the folowing parameters when this function is called
  return (title, backgroundColor, borderColor, icon, callback) => {
    //tell the classes reducer that add class has been called and give it the following props
    dispatch({
      type: "add_class",
      payload: { title, backgroundColor, borderColor, icon },
    });
    //if a callback exists, call it
    if (callback) {
      callback();
    }
  };
};

const editClass = (dispatch) => {
  //take the folowing parameters when this function is called
  return (title, backgroundColor, borderColor, icon, id, callback) => {
    //tell the classes reducer that edit class has been called and give it the following props
    dispatch({
      type: "edit_class",
      payload: { title, backgroundColor, borderColor, icon, id },
    });
    //if a callback exists, call it
    if (callback) {
      callback();
    }
  };
};

const deleteClass = (dispatch) => {
  return (id) => {
    dispatch({ type: "delete_class", payload: id });
  };
};

const makeClassActive = (dispatch) => {
  return (id) => {
    dispatch({ type: "make_class_active", payload: id });
  };
};

//set all of the icons stored in the classes array to 30
const iconSize = 30;
const classes = [
  {
    title: "English",
    backgroundColor: colors[0].backgroundColor,
    borderColor: colors[0].borderColor,
    icon: icons(30, "black")[0].icon,
    id: 1,
    active: false,
  },
  {
    title: "Government",
    backgroundColor: colors[1].backgroundColor,
    borderColor: colors[1].borderColor,
    icon: icons(30, "black")[1].icon,
    id: 2,
    active: false,
  },
  {
    title: "Calculus",
    backgroundColor: colors[2].backgroundColor,
    borderColor: colors[2].borderColor,
    icon: icons(30, "black")[2].icon,
    id: 3,
    active: false,
  },
  {
    title: "Computer Science",
    backgroundColor: colors[3].backgroundColor,
    borderColor: colors[3].borderColor,
    icon: icons(30, "black")[3].icon,
    id: 4,
    active: false,
  },
  {
    title: "Graphic Design",
    backgroundColor: colors[4].backgroundColor,
    borderColor: colors[4].borderColor,
    icon: icons(30, "black")[4].icon,
    id: 5,
    active: false,
  },
  {
    title: "Physical Education",
    backgroundColor: colors[5].backgroundColor,
    borderColor: colors[5].borderColor,
    icon: icons(30, "black")[5].icon,
    id: 6,
    active: false,
  },
  {
    title: "Physics",
    backgroundColor: colors[6].backgroundColor,
    borderColor: colors[6].borderColor,
    icon: icons(30, "black")[6].icon,
    id: 7,
    active: false,
  },
  {
    title: "Statistics",
    backgroundColor: colors[7].backgroundColor,
    borderColor: colors[7].borderColor,
    icon: icons(30, "black")[7].icon,
    id: 8,
    active: false,
  },
];

export const { Context, Provider } = createDataContext(
  classesReducer,
  { addClass, editClass, deleteClass, makeClassActive },
  classes
);
