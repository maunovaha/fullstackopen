import { Navigate } from "react-router-dom";
import { Patient } from "../../types";

interface PatientInformationPageProps {
  patient?: Patient;
}

const PatientInformationPage = ({ patient } : PatientInformationPageProps) => {
  if (!patient) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <h2>{patient.name}</h2>
      <p>Birthday: {patient.dateOfBirth || <em>Not set</em>}</p>
      <p>Gender: {patient.gender}</p>
      <p>Ssn: {patient.ssn || <em>Not set</em>}</p>
      <p>Occupation: {patient.occupation}</p>
    </>
  );
};

export default PatientInformationPage;
