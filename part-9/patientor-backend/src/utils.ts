import {
  Discharge,
  Gender,
  SickLeave,
  NewPatientEntry,
  NewHospitalJournalEntry,
  NewHealthCheckEntry,
  NewOccupationalHealthcareEntry,
  NewJournalEntry
} from './types';

const parseString = (value: unknown, fieldName: string): string => {
  if (!isString(value)) {
    throw new Error(`Incorrect or missing ${fieldName}: ${value}`);
  }
  return value;
};

const parseNumber = (value: unknown, fieldName: string): number => {
  if (!value || (typeof value !== 'string' && typeof value !== 'number')) {
    throw new Error(`Incorrect or missing ${fieldName}: ${value}`);
  }
  return typeof value === 'string' ? Number(value) : value;
};

const parseStringArray = (value: unknown, fieldName: string): string[] => {
  if (!isStringArray(value)) {
    throw new Error(`Incorrect or missing ${fieldName}: ${value}`);
  }
  return value;
};

const parseDate = (value: unknown, fieldName: string): string => {
  if (!isString(value) || !isDate(value)) {
    throw new Error(`Incorrect or missing ${fieldName}: ${value}`);
  }
  return value;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!isObject(discharge)) {
    throw new Error('Incorrect or missing discharge');
  } else if (!('date' in discharge) || !isString(discharge.date) || !isDate(discharge.date)) {
    throw new Error('Incorrect or missing discharge.date');
  } else if (!('criteria' in discharge) || !isString(discharge.criteria)) {
    throw new Error('Incorrect or missing discharge.criteria');
  }
  return {
    date: parseDate(discharge.date, 'discharge.date'),
    criteria: parseString(discharge.criteria, 'discharge.criteria')
  };
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!isObject(sickLeave)) {
    throw new Error('Incorrect or missing sickLeave');
  } else if (!('startDate' in sickLeave) || !isString(sickLeave.startDate) || !isDate(sickLeave.startDate)) {
    throw new Error('Incorrect or missing sickLeave.startDate');
  } else if (!('endDate' in sickLeave) || !isString(sickLeave.endDate) || !isDate(sickLeave.endDate)) {
    throw new Error('Incorrect or missing sickLeave.endDate');
  }
  return {
    startDate: parseDate(sickLeave.startDate, 'sickLeave.startDate'),
    endDate: parseString(sickLeave.endDate, 'sickLeave.endDate')
  };
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error(`Incorrect or missing dateOfBirth: ${dateOfBirth}`);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isStringArray = (value: unknown): value is string[] => {
  return Array.isArray(value) && value.every(item => isString(item));
};

const isObject = (value: unknown): value is object => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(value => value.toString()).includes(gender);
};

const isHealthCheckEntry = (entry: object): boolean => {
  return 'type' in entry && isString(entry.type) && entry.type === 'HealthCheck';
};

const isOccupationalHealthcareEntry = (entry: object): boolean => {
  return 'type' in entry && isString(entry.type) && entry.type === 'OccupationalHealthcare';
};

const isHospitalEntry = (entry: object): boolean => {
  return 'type' in entry && isString(entry.type) && entry.type === 'Hospital';
};

const toNewHealthCheckEntry = (entry: object): NewHealthCheckEntry => {
  const requiredFieldsProvided = (
    'description' in entry &&
    'date' in entry &&
    'specialist' in entry &&
    'healthCheckRating' in entry
  );

  if (requiredFieldsProvided) {
    return {
      type: 'HealthCheck',
      description: parseString(entry.description, 'description'),
      date: parseDate(entry.date, 'date'),
      specialist: parseString(entry.specialist, 'specialist'),
      healthCheckRating: parseNumber(entry.healthCheckRating, 'healthCheckRating')
    };
  } else {
    throw new Error('Incorrect data: some fields are missing');
  }
};

const toNewOccupationalHealthcareEntry = (entry: object): NewOccupationalHealthcareEntry => {
  const requiredFieldsProvided = (
    'description' in entry &&
    'date' in entry &&
    'specialist' in entry &&
    'diagnosisCodes' in entry &&
    'employerName' in entry
  );

  if (requiredFieldsProvided) {
    const newOccupationalHealthcareEntry: NewOccupationalHealthcareEntry = {
      type: 'OccupationalHealthcare',
      description: parseString(entry.description, 'description'),
      date: parseDate(entry.date, 'date'),
      specialist: parseString(entry.specialist, 'specialist'),
      diagnosisCodes: parseStringArray(entry.diagnosisCodes, 'diagnosisCodes'),
      employerName: parseString(entry.employerName, 'employerName'),
    };
    if ('sickLeave' in entry) {
      newOccupationalHealthcareEntry.sickLeave = parseSickLeave(entry.sickLeave);
    }
    return newOccupationalHealthcareEntry;
  } else {
    throw new Error('Incorrect data: some fields are missing');
  }
};

const toNewHospitalJournalEntry = (entry: object): NewHospitalJournalEntry => {
  const requiredFieldsProvided = (
    'description' in entry &&
    'date' in entry &&
    'specialist' in entry &&
    'diagnosisCodes' in entry &&
    'discharge' in entry
  );

  if (requiredFieldsProvided) {
    return {
      type: 'Hospital',
      description: parseString(entry.description, 'description'),
      date: parseDate(entry.date, 'date'),
      specialist: parseString(entry.specialist, 'specialist'),
      diagnosisCodes: parseStringArray(entry.diagnosisCodes, 'diagnosisCodes'),
      discharge: parseDischarge(entry.discharge as object)
    };
  } else {
    throw new Error('Incorrect data: some fields are missing');
  }
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  const requiredFieldsProvided = (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  );
  
  if (requiredFieldsProvided) {
    const newPatientEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };
    return newPatientEntry;
  } else {
    throw new Error('Incorrect data: some fields are missing');
  }
};

export const toNewJournalEntry = (object: unknown): NewJournalEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (isHospitalEntry(object)) {
    return toNewHospitalJournalEntry(object);
  } else if (isHealthCheckEntry(object)) {
    return toNewHealthCheckEntry(object);
  } else if (isOccupationalHealthcareEntry(object)) {
    return toNewOccupationalHealthcareEntry(object);
  } else {
    throw new Error('Incorrect data: some fields are missing');
  }
};

export default toNewPatientEntry;
