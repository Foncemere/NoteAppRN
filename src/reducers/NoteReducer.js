const INITIAL_STATE = [
  { id: 0, itemGiven: { title: "tite", description: "hello world" } },
];

const NoteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      //spread operator, gets previous data + new object,
      // if this was used in an object,
      //any duplicate found will be replaced with the new one.
      return [...state, { id: action.id, itemGiven: action.item }];

    case "DELETE_NOTE":
      return state.filter((e) => e.id !== action.id);
    //they can be treated like a function, doesnt have to be a 1 liner return function, like EDIT_NOTE
    case "EDIT_NOTE": {
      const x = state.map((e) => {
        //will map out the entire state
        //if action id matches, it gives the new items and same id.
        if (e.id === action.id) {
          return { id: action.id, itemGiven: action.item };
        } else {
          // else it doesnt do anything to it.
          return e;
        }
      });
      // return new array
      return x;
    }
    default:
      return state;
  }
};

export default NoteReducer;
