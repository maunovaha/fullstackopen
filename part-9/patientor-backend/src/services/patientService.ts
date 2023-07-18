import patientData from '../../data/patients';
import { NonSensitivePatientEntry, Gender } from '../types';

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map((patient) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...rest } = patient;
    return { ...rest, gender: patient.gender as Gender };
  });
};

export default {
  getNonSensitiveEntries
};
