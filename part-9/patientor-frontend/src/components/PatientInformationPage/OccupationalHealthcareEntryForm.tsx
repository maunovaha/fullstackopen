import { Button, TextField, Stack, Alert } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { NewOccupationalHealthcareEntry } from "../../types";

interface OccupationalHealthcareEntryFormProps {
  onSubmit: (values: NewOccupationalHealthcareEntry) => Promise<boolean>;
  errorMessage: string;
}

const OccupationalHealthcareEntryForm = ({ onSubmit, errorMessage }: OccupationalHealthcareEntryFormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    let formValues: NewOccupationalHealthcareEntry = {
      description,
      date,
      specialist,
      employerName,
      type: 'OccupationalHealthcare',
      diagnosisCodes: diagnosisCodes.split(', ')
    };

    if (sickLeaveStartDate || sickLeaveStartDate) {
      formValues = {
        ...formValues,
        sickLeave: {
          startDate: sickLeaveStartDate,
          endDate: sickLeaveEndDate
        }
      };
    }

    const success = await onSubmit(formValues);

    if (success) {
      handleClear();
    }
  };

  const handleClear = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes('');
    setEmployerName('');
    setSickLeaveStartDate('');
    setSickLeaveEndDate('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #000', borderRadius: '8px', padding: '0 1rem 1rem 1rem' }}>
      <h3>New occupational healthcare entry</h3>
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
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(target.value)}
        variant="outlined"
        margin="normal"
        label="Diagnosis codes"
        placeholder="M24.2, M51.2"
        fullWidth
        required
      />
      <TextField
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
        variant="outlined"
        margin="normal"
        label="Employer"
        fullWidth
        required
      />
      <TextField
        value={sickLeaveStartDate}
        onChange={({ target }) => setSickLeaveStartDate(target.value)}
        variant="outlined"
        margin="normal"
        label="Sick leave start date"
        placeholder="YYYY-MM-DD"
        fullWidth
      />
      <TextField
        value={sickLeaveEndDate}
        onChange={({ target }) => setSickLeaveEndDate(target.value)}
        variant="outlined"
        margin="normal"
        label="Sick leave end date"
        fullWidth
      />
      <Stack direction="row" spacing={2} style={{ marginTop: '1rem' }}>
        <Button type="submit" variant="contained">Submit</Button>
        <Button variant="outlined" onClick={handleClear}>Clear</Button>
      </Stack>
    </form>
  );
};

export default OccupationalHealthcareEntryForm;
