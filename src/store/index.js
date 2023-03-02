import { configureStore } from "@reduxjs/toolkit";
import {
  noteAdd,
  noteDelete,
  noteToggle,
  noteEdit,
  updateSearchTerm,
} from "./slices/notesListSlice";
import { notesListReducer } from "./slices/notesListSlice";

const store = configureStore({
  reducer: {
    notesList: notesListReducer,
  },
});

export { store };
export { noteAdd, noteDelete, noteToggle, noteEdit, updateSearchTerm };
