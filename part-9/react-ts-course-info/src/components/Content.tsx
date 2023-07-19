import Part from "./Part";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescriptive extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescriptive {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartDescriptive {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartRequirement extends CoursePartDescriptive {
  requirements: string[];
  kind: 'special';
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirement;

interface ContentProps {
  courses: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courses.map((part: CoursePart) => <Part key={part.name} part={part} />)}
    </>
  );
};

export default Content;
