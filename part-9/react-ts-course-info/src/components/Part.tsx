import { CoursePart } from "./Content";

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const renderCoursePart = (part: CoursePart) => {
  switch (part.kind) {
    case 'basic':
      return (
        <ul>
          <li>Name: {part.name}</li>
          <li>Exercise count: {part.exerciseCount}</li>
          <li>Description: {part.description}</li>
          <li>Kind: {part.kind}</li>
        </ul>
      );
    case 'group':
      return (
        <ul>
          <li>Name: {part.name}</li>
          <li>Exercise count: {part.exerciseCount}</li>
          <li>Group project count: {part.groupProjectCount}</li>
          <li>Kind: {part.kind}</li>
        </ul>
      );
    case 'background':
      return (
        <ul>
          <li>Name: {part.name}</li>
          <li>Exercise count: {part.exerciseCount}</li>
          <li>Description: {part.description}</li>
          <li>Background material: {part.backgroundMaterial}</li>
          <li>Kind: {part.kind}</li>
        </ul>
      );
    case 'special':
      return (
        <ul>
          <li>Name: {part.name}</li>
          <li>Exercise count: {part.exerciseCount}</li>
          <li>Description: {part.description}</li>
          <li>Requirements: {part.requirements.join(', ')}</li>
          <li>Kind: {part.kind}</li>
        </ul>
      );
    default:
      return assertNever(part);
  }
};

const Part = (props: PartProps) => {
  return (
    <>
      <h2>{props.part.name}</h2>
      {renderCoursePart(props.part)}
    </>
  );
};

export default Part;
