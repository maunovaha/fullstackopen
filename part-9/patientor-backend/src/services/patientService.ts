import patientDataSeed from '../../data/patients';
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry, NewJournalEntry } from '../types';
import { v4 as uuid } from 'uuid';

// Modifying the patient data via `addJournalEntry` is not possible, so we create a copy of the seed data
let patientData = [...patientDataSeed];

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

const addJournalEntry = (patient: PatientEntry, journalEntry: NewJournalEntry): PatientEntry => {
  const newJournalEntry = { id: uuid(), ...journalEntry };
  const updatedPatient = { ...patient, entries: [...patient.entries, newJournalEntry] };
  patientData = patientData.map(existingPatient => existingPatient.id === updatedPatient.id ? updatedPatient : existingPatient);
  return updatedPatient;
};

export default {
  getNonSensitiveEntries,
  addPatient,
  addJournalEntry,
  findById
};
