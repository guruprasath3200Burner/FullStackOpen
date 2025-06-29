import { useDispatch } from "react-redux";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = () => {
    event.preventDefault();
    const quote = event.target[0].value;
    event.target[0].value = "";
    dispatch({
      type: "ADD",
      data: {
        content: quote,
        id: (100000 * Math.random()).toFixed(0),
        votes: 0,
      },
    });
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input />
        </div>
        <button>create</button>
      </form>
    </>
  );
};
export default AnecdoteForm;
