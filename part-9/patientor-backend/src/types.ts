export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

interface BaseJournalEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

interface HealthCheckEntry extends BaseJournalEntry {
  type: 'HealthCheck',
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseJournalEntry {
  type: 'OccupationalHealthcare',
  employerName: string;
  sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseJournalEntry {
  type: 'Hospital',
  discharge: Discharge;
}

type JournalEntry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: JournalEntry[];
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;

export type NewHospitalJournalEntry = Omit<HospitalEntry, 'id'>;

export type NewJournalEntry = NewHealthCheckEntry | NewOccupationalHealthcareEntry | NewHospitalJournalEntry;

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;
