import { Button, TextField, Stack, Alert } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { NewHospitalJournalEntry } from "../../types";

interface HospitalEntryFormProps {
  onSubmit: (values: NewHospitalJournalEntry) => Promise<string>;
}

const HospitalEntryForm = ({ onSubmit }: HospitalEntryFormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const errorResponse = await onSubmit({
      description,
      date,
      specialist,
      type: 'Hospital',
      diagnosisCodes: diagnosisCodes.split(', '),
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria
      }
    });
    if (errorResponse.length === 0) {
      handleClear();
    }
    setErrorMessage(errorResponse);
  };

  const handleClear = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes('');
    setDischargeDate('');
    setDischargeCriteria('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #000', borderRadius: '8px', padding: '0 1rem 1rem 1rem' }}>
      <h3>New hospital entry</h3>
      {errorMessage.length > 0 && <Alert severity="error" style={{ marginBottom: '1rem' }}>{errorMessage}</Alert>}
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
        type="date"
        variant="outlined"
        margin="normal"
        label="Date"
        InputLabelProps={{ shrink: true }}
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
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
        type="date"
        variant="outlined"
        margin="normal"
        label="Discharge date"
        InputLabelProps={{ shrink: true }}
        fullWidth
        required
      />
      <TextField
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
        variant="outlined"
        margin="normal"
        label="Discharge criteria"
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

export default HospitalEntryForm;
