import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

// const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload.id;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
    },
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    loadAnecdote(state, action) {
      return action.payload;
    },
  },
});

export const { voteAnecdote, addAnecdote, loadAnecdote } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    console.log("anecdotes", anecdotes);
    dispatch(loadAnecdote(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(addAnecdote(newAnecdote));
  };
};

export const voteAnecdoteAction = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.voteAnecdote(anecdote);
    dispatch(voteAnecdote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
