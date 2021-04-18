import createDataContext from "./createDataContext";

const plannerReducer = (state, action) => {
  switch (action.type) {
    case "add_work_item":
      return [
        ...state,
        {
          title: action.payload.title,
          date: new Date(action.payload.dateString),
          schoolClass: action.payload.schoolClass,
          id: state.length + 1,
        },
      ];
    case "delete_work_item":
      //filter() goes through all the elements of the state array and runs a child function on it
      //if the function equals true, than it gets added to a new array
      //if the function equals false, than it gets rejected from the new array
      //return that new array
      return state.filter((workItem) => workItem.id !== action.payload);
    case "edit_work_item":
      //look at the classes one by one and determine if it should be replaced by action.payload
      return state.map((workItem) => {
        if (workItem.id === action.payload.id) {
          return action.payload;
        } else {
          return schoolClass;
        }
      });
  }
};

const addWorkItem = (dispatch) => {
  return (title, dateString, schoolClass, callback) => {
    dispatch({
      type: "add_work_item",
      payload: { title, dateString, schoolClass },
    });
    //if a callback exists, call it
    if (callback) {
      callback();
    }
  };
};

const editWorkItem = (dispatch) => {
  return (title, date, schoolClass, id, callback) => {
    dispatch({
      type: "add_work_item",
      payload: { title, date, schoolClass, id },
    });
    //if a callback exists, call it
    if (callback) {
      callback();
    }
  };
};

const deleteWorkItem = (dispatch) => {
  return (id) => {
    dispatch({ type: "delete_image", payload: id });
  };
};

export const { Context, Provider } = createDataContext(
  plannerReducer,
  { addWorkItem, editWorkItem, deleteWorkItem },
  [
    {
      title: "Math Test",
      date: new Date("1/1/2021"),
      schoolClass: "Calculus",
      id: 1,
    },
  ]
);
