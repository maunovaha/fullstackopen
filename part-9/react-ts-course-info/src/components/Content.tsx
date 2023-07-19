interface Course {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courses: Course[];
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courses.map((course: Course) => (
        <p key={course.name}>{course.name} {course.exerciseCount}</p>
      ))}
    </>
  );
};

export default Content;
