import { useEffect, useState } from "react";
import { JournalEntry, Patient, Diagnosis } from '../../types';
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";
import HospitalEntryInfo from "./HospitalEntryInfo";
import OccupationalHealthcareEntryInfo from "./OccupationalHealthcareEntryInfo";
import HealthCheckEntryInfo from "./HealthCheckEntryInfo";

interface PatientInformationPageProps {
  patientId: string;
}

const assertNever = (value: JournalEntry): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const entryDetails = (entry: JournalEntry, diagnoses: Diagnosis[]) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryInfo key={entry.id} entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryInfo key={entry.id} entry={entry} diagnoses={diagnoses} />;
    case 'HealthCheck':
      return <HealthCheckEntryInfo key={entry.id} entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientInformationPage = ({ patientId } : PatientInformationPageProps) => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      const patientResource = await patientService.findOne(patientId);
      const diagnosisCodes = patientResource
        .entries
        .map(entry => entry.diagnosisCodes)
        .filter(diagnosisCodes => diagnosisCodes !== undefined) // Removes undefined values
        .flat();
      if (diagnosisCodes.length > 0) {
        const diagnoses = await diagnoseService.getAll();
        const filteredDiagnoses = diagnoses.filter(diagnosis => diagnosisCodes.includes(diagnosis.code));
        setDiagnoses(filteredDiagnoses);
      }
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
      {patient.entries.map((entry: JournalEntry) => entryDetails(entry, diagnoses))}
    </>
  );
};

export default PatientInformationPage;
