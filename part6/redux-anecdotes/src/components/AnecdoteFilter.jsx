import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

export default function AnecdoteFilter() {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();

    dispatch(setFilter(event.target.value));
  };
  return (
    <>
      <div>
        filter <input onChange={handleChange} />
      </div>
    </>
  );
}
