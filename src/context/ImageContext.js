import createDataContext from "./createDataContext";

const imageReducer = (state, action) => {
  switch (action.type) {
    case "add_image":
      return [
        ...state,
        {
          uri: action.payload.uri,
          date: action.payload.date,
          tags: action.payload.tags,
          selected: false,
        },
      ];
    case "toggle_select_image":
      //go through every image in the state, if the action.payload uri equals
      //one of the images in the state, toggle it's selected value
      return state.map((image) => {
        if (image.uri === action.payload) {
          return {
            uri: image.uri,
            date: image.date,
            tags: image.tags,
            selected: !image.selected,
          };
        } else {
          return image;
        }
      });
    case "deselect_all_images":
      return state.map((image) => {
        //make all of the images in the context have a selected value of false
        return {
          uri: image.uri,
          date: image.date,
          tags: image.tags,
          selected: false,
        };
      });
    case "delete_image":
      //filter() goes through all the elements of the state array and runs a child function on it
      //if the function equals true, than it gets added to a new array
      //if the function equals false, than it gets rejected from the new array
      //return that new array
      return state.filter((image) => image.uri !== action.payload);
  }
};

const addImage = (dispatch) => {
  return (uri, date, tags) => {
    dispatch({
      type: "add_image",
      payload: { uri, date, tags },
    });
  };
};

const toggleSelectImage = (dispatch) => {
  return (uri) => {
    dispatch({ type: "toggle_select_image", payload: uri });
  };
};

const deselectAllImages = (dispatch) => {
  return () => {
    dispatch({ type: "deselect_all_images" });
  };
};

const deleteImage = (dispatch) => {
  return (uri) => {
    dispatch({ type: "delete_image", payload: uri });
  };
};

export const { Context, Provider } = createDataContext(
  imageReducer,
  { addImage, toggleSelectImage, deselectAllImages, deleteImage },
  []
);
