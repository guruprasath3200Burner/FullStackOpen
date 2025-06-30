import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { createAnecdote } from "../reducers/anecdoteReducer";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = () => {
    event.preventDefault();
    const quote = event.target[0].value;
    event.target[0].value = "";
    dispatch(createAnecdote(quote));
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
