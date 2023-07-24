import { useEffect, useState } from "react";
import { JournalEntry, Patient } from '../../types';
import patientService from "../../services/patients";

interface PatientInformationPageProps {
  patientId: string;
}

const PatientInformationPage = ({ patientId } : PatientInformationPageProps) => {
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatientInfo = async () => {
      const patientResource = await patientService.findOne(patientId);
      setPatient(patientResource);
    };
    fetchPatientInfo();
  }, [patientId]);

  if (!patient) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2>{patient.name}</h2>
      <p>Birthday: {patient.dateOfBirth || <em>Not set</em>}</p>
      <p>Gender: {patient.gender}</p>
      <p>Ssn: {patient.ssn || <em>Not set</em>}</p>
      <p>Occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      {patient.entries.map((entry: JournalEntry) => (
        <div key={entry.id}>
          <p><b>{entry.date}</b></p>
          <p>- {entry.description}</p>
          {entry.diagnosisCodes &&
            <ul>
              {entry.diagnosisCodes?.map((diagnosis: string) => (
                <li key={diagnosis}>{diagnosis}</li>
              ))}
            </ul>
          }
        </div>
      ))}
    </>
  );
};

export default PatientInformationPage;
