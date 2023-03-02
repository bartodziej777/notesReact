import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  data: [],
};

const notesListSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    noteAdd(state, { payload }) {
      const note = {
        id: nanoid(),
        title: payload.title,
        content: payload.content,
        pinned: false,
        color: payload.color,
      };
      state.data.push(note);
    },
    noteDelete(state, { payload }) {
      const newState = state.data.filter((note) => note.id !== payload);
      return newState;
    },
    noteToggle(state, { payload }) {
      const index = state.data.findIndex((note) => note.id === payload);
      state.data[index].pinned = !state[index].pinned;
    },
    noteEdit(state, { payload }) {
      const index = state.data.findIndex((note) => note.id === payload.id);
      state.data[index] = payload;
    },
    updateSearchTerm(state, { payload }) {
      state.searchTerm = payload;
    },
  },
});

export const { noteAdd, noteDelete, noteToggle, noteEdit, updateSearchTerm } =
  notesListSlice.actions;
export const notesListReducer = notesListSlice.reducer;
