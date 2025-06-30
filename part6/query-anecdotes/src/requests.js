import axios from "axios";
export const getAnecdotes = async () => {
  const response = await axios.get("http://localhost:3001/anecdotes");
  return response.data;
};

export const createAnecdote = async (anecdote) => {
  const response = await axios.post(
    "http://localhost:3001/anecdotes",
    anecdote
  );
  return response.data;
};

export const voteAnecdote = async (anecdote) => {
  const response = await axios.put(
    `http://localhost:3001/anecdotes/${anecdote.id}`,
    { ...anecdote, votes: anecdote.votes + 1 }
  );
  return response.data;
};
