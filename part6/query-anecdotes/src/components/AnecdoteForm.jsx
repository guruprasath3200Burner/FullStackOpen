import { useQuery, useMutation } from "@tanstack/react-query";
import { getAnecdotes, createAnecdote } from "../requests";
import { useQueryClient } from "@tanstack/react-query";
import { useNotification } from "../hooks/useNotification";

const AnecdoteForm = () => {
  const notify = useNotification();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      // Show notification
      notify(`anecdote '${newAnecdote.content}' created`);
    },
    onError: (error) => {
      const message =
        error.response?.data?.error ||
        "An error occurred while creating the anecdote";
      notify(message);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
