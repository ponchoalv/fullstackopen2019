import React from "react";

const Header = ({ course }) => <h1>{course.name}</h1>;

const Part = props => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Content = ({ course }) => (
  <div>
    {course.parts.map(part => (
      <Part part={part} key={part.id} />
    ))}
  </div>
);

const Total = ({ course }) => {
  const total = course.parts.reduce((acc, part) => acc + part.exercises, 0);

  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </>
);

export default Course;
