import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

export default function AnecdoteList() {
  const dispatch = useDispatch();
  const { anecdotes, filter } = useSelector((state) => ({
    anecdotes: state.anecdotes,
    filter: state.filter,
  }));

  // sorting + filtering anecdotes
  const filteredAnecdotes = anecdotes
    .filter((anecdote) =>
      filter === "ALL"
        ? true
        : anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => b.votes - a.votes);

  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(voteAnecdote({ id: anecdote.id }));
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
