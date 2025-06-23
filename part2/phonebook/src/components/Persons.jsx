const Persons = ({ persons, onDeletePerson }) => {
  return (
    <ul>
      {persons.map((person, index) => (
        <li key={index}>
          {person.name} {person.number}
          <button onClick={() => onDeletePerson(person.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};
export default Persons;
