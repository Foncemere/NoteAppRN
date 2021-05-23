import { createStore } from "redux";

import NoteReducer from "./reducers/NoteReducer";
export const store = createStore(NoteReducer);

export default store;
