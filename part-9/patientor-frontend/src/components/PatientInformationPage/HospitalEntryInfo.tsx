import { LocalHospital } from '@mui/icons-material';
import { HospitalEntry, Diagnosis } from '../../types';

interface HospitalEntryInfoProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntryInfo = ({ entry, diagnoses }: HospitalEntryInfoProps) => {
  const filteredDiagnoses = diagnoses.filter(diagnosis => entry.diagnosisCodes?.includes(diagnosis.code));

  return (
    <div key={entry.id} style={{ border: '1px solid', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
      <div><LocalHospital color="secondary" fontSize="large" /></div>
      <p><b>{entry.date}</b></p>
      <p>- {entry.description}</p>
      {filteredDiagnoses &&
        <ul>
          {filteredDiagnoses.map((diagnosis: Diagnosis) => (
            <li key={diagnosis.code}>{diagnosis.code} {diagnosis.name}</li>
          ))}
        </ul>
      }
      <p><b>{entry.discharge.date}</b></p>
      <p>- {entry.discharge.criteria}</p>
      <p>Diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HospitalEntryInfo;
