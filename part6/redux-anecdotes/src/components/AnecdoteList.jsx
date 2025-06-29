import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notifReducer";

export default function AnecdoteList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

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
                dispatch(
                  setNotification(`You voted for "${anecdote.content}"`, 5)
                );
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
