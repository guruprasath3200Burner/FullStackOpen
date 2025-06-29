import { useSelector, useDispatch } from "react-redux";

export default function AnecdoteList() {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

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
              onClick={() =>
                dispatch({
                  type: "VOTE",
                  data: { id: anecdote.id },
                })
              }
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
