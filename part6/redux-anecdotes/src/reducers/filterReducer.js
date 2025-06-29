import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "ALL",
  reducers: {
    setFilter(state, action) {
      return action.payload === "" ? "ALL" : action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { setFilter } = filterSlice.actions;
