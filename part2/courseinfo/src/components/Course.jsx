import React from "react";

const Course = ({ course }) => {
  const sum = course.parts.reduce(
    (i, currentValue) => i + currentValue.exercises,
    0
  );
  return (
    <div>
      <h3>{course.name}</h3>
      <ul>
        {course.parts.map((part) => {
          return (
            <li key={part.id}>
              {part.name} - {part.exercises} exercises
            </li>
          );
        })}
      </ul>
      <p>
        <strong>Total of {sum} exercises</strong>
      </p>
    </div>
  );
};

export default Course;
