import { useState, useEffect } from "react";
import { Route, Link, Routes, useMatch, Navigate } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientInformationPage from "./components/PatientInformationPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const match = useMatch('/:id');
  const patientId = match ? patients.find(patient => patient.id === match.params.id)?.id : undefined;

  useEffect(() => {
    // axios.get<void>(`${apiBaseUrl}/ping`);
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
      setLoading(false);
    };
    fetchPatientList();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  
  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
          <Route path="/:id" element={patientId ? <PatientInformationPage patientId={patientId} /> : <Navigate replace to="/" />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
