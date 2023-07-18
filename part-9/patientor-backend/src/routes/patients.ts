import express from 'express';
import patientService from '../services/patientService';
import { NewPatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newPatientEntry: NewPatientEntry = { name, dateOfBirth, ssn, gender, occupation };
  const addedPatientEntry = patientService.addPatient(newPatientEntry);
  res.json(addedPatientEntry);
});

export default router;
