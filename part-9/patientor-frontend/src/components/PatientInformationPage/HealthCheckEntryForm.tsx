import { Button, TextField, Stack, Alert } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { HealthCheckRating, NewHealthCheckEntry } from "../../types";

interface HealthCheckEntryFormProps {
  onSubmit: (values: NewHealthCheckEntry) => Promise<boolean>;
  errorMessage: string;
}

const HealthCheckEntryForm = ({ onSubmit, errorMessage }: HealthCheckEntryFormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const success = await onSubmit({
      description,
      date,
      specialist,
      healthCheckRating,
      type: 'HealthCheck'
    });
    if (success) {
      handleClear();
    }
  };

  const handleClear = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthCheckRating(HealthCheckRating.Healthy);
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #000', borderRadius: '8px', padding: '0 1rem 1rem 1rem' }}>
      <h3>New health check entry</h3>
      {(errorMessage && errorMessage.length > 0) && <Alert severity="error" style={{ marginBottom: '1rem' }}>{errorMessage}</Alert>}
      <TextField 
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        variant="outlined"
        margin="normal"
        label="Description"
        fullWidth
        required
      />
      <TextField 
        value={date} 
        onChange={({ target }) => setDate(target.value)}
        variant="outlined"
        margin="normal"
        label="Date"
        placeholder="YYYY-MM-DD"
        fullWidth
        required
      />
      <TextField
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
        variant="outlined"
        margin="normal"
        label="Specialist"
        fullWidth
        required
      />
      <TextField
        value={healthCheckRating}
        onChange={({ target }) => setHealthCheckRating(Number(target.value) as HealthCheckRating)}
        type="number"
        variant="outlined"
        margin="normal"
        label="Health check rating"
        InputProps={{
          inputProps: { 
            min: 0,
            max: 3 
          }
        }}
        fullWidth
        required
      />
      <Stack direction="row" spacing={2} style={{ marginTop: '1rem' }}>
        <Button type="submit" variant="contained">Submit</Button>
        <Button variant="outlined" onClick={handleClear}>Clear</Button>
      </Stack>
    </form>
  );
};

export default HealthCheckEntryForm;
