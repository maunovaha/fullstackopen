export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

interface BaseJournalEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface Discharge {
  date: string;
  criteria: string;
}

export interface HealthCheckEntry extends BaseJournalEntry {
  type: 'HealthCheck',
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseJournalEntry {
  type: 'OccupationalHealthcare',
  employerName: string;
  sickLeave?: SickLeave;
}

export interface HospitalEntry extends BaseJournalEntry {
  type: 'Hospital',
  discharge: Discharge;
}

export type JournalEntry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: JournalEntry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;