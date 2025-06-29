import { useSelector, useDispatch } from "react-redux";
export default function AnecdoteList() {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <>
      <h2>Anecdotes</h2>

      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => {
          return (
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
          );
        })}
    </>
  );
}
