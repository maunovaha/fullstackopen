import patientData from '../../data/patients';
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types';
import { v4 as uuid } from 'uuid';

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map((patient) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, entries, ...rest } = patient;
    return { ...rest };
  });
};

const findById = (id: string): PatientEntry | undefined => {
  const patient = patientData.find(patient => patient.id === id);
  return patient && { ...patient };
};

const addPatient = (patientEntry: NewPatientEntry): PatientEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const newPatientEntry = { id: uuid(), ...patientEntry, entries: [] };
  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getNonSensitiveEntries,
  addPatient,
  findById
};
