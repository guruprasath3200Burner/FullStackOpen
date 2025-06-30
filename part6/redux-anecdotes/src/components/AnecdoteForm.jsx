import { useDispatch } from "react-redux";
import anecdoteService from "../services/anecdotes";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = () => {
    event.preventDefault();
    const quote = event.target[0].value;
    event.target[0].value = "";
    anecdoteService.createNew(quote).then((anecdote) => {
      dispatch(addAnecdote(anecdote));
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
