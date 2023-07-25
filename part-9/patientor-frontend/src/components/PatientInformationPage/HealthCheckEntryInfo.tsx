import { Favorite } from '@mui/icons-material';
import { HealthCheckEntry } from '../../types';

interface HealthCheckEntryInfoProps {
  entry: HealthCheckEntry;
}

const HealthCheckEntryInfo = ({ entry }: HealthCheckEntryInfoProps) => {
  return (
    <div key={entry.id} style={{ border: '1px solid', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
      <div><Favorite color="secondary" fontSize="large" /></div>
      <p><b>{entry.date}</b></p>
      <p>- {entry.description}</p>
      <p>- Health check rating: {entry.healthCheckRating} (0 = Healthy, 1 = Low risk, 2 = High risk, 3 = Critical risk)</p>
      <p>Diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HealthCheckEntryInfo;
