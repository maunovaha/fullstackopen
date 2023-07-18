import patientData from '../../data/patients';
import { NonSensitivePatientEntry, Gender, PatientEntry, NewPatientEntry } from '../types';
import { v4 as uuid } from 'uuid';

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map((patient) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...rest } = patient;
    return { ...rest, gender: patient.gender as Gender };
  });
};

const addPatient = (patientEntry: NewPatientEntry): PatientEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const newPatientEntry = { id: uuid(), ...patientEntry };
  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getNonSensitiveEntries,
  addPatient
};
