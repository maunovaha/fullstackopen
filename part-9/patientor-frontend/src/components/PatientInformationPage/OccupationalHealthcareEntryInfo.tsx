import { Healing } from '@mui/icons-material';
import { OccupationalHealthcareEntry, Diagnosis } from '../../types';

interface OccupationalHealthcareEntryInfoProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryInfo = ({ entry, diagnoses }: OccupationalHealthcareEntryInfoProps) => {
  return (
    <div key={entry.id} style={{ border: '1px solid', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
      <div><Healing color="secondary" fontSize="large" /></div>
      <p><b>{entry.date}</b></p>
      <p>- {entry.description}</p>
      {entry.sickLeave && <p>- On a sick leave between {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>}
      {diagnoses &&
        <ul>
          {diagnoses.map((diagnosis: Diagnosis) => (
            <li key={diagnosis.code}>{diagnosis.code} {diagnosis.name}</li>
          ))}
        </ul>
      }
      <p>Diagnose by {entry.specialist} (Employer: {entry.employerName})</p>
    </div>
  );
};

export default OccupationalHealthcareEntryInfo;
