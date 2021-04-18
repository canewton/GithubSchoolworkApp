import createDataContext from "./createDataContext";

const folderReducer = (state, action) => {
  switch (action.type) {
    case "add_folder":
      return [
        ...state,
        {
          title: action.payload.title,
          date: action.payload.date,
          schoolClass: action.payload.schoolClass,
          id: state.length + 1,
        },
      ];
    case "delete_folder":
      //filter() goes through all the elements of the state array and runs a child function on it
      //if the function equals true, than it gets added to a new array
      //if the function equals false, than it gets rejected from the new array
      //return that new array
      return state.filter((workItem) => workItem.id !== action.payload);
  }
};

const addFolder = (dispatch) => {
  return (title, date, schoolClass) => {
    dispatch({
      type: "add_folder",
      payload: { title, date, schoolClass },
    });
  };
};

const deleteFolder = (dispatch) => {
  return (id) => {
    dispatch({ type: "delete_folder", payload: id });
  };
};

export const { Context, Provider } = createDataContext(
  folderReducer,
  { addFolder, deleteFolder },
  [
    {
      title: "Math Test",
      date: new Date("1/1/2021"),
      schoolClass: "Calculus",
      id: 1,
    },
  ]
);
