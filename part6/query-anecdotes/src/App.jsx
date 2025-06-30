import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, createAnecdote, voteAnecdote } from "./requests";
import { useNotification } from "./hooks/useNotification";

const App = () => {
  const notify = useNotification();

  const queryClient = useQueryClient();
  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      // Show notification
      notify(`anecdote '${updatedAnecdote.content}' voted`);
    },
  });

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>Loading...</div>;
  }
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteMutation.mutate(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
