import { useState } from 'react';
import styled from 'styled-components';
import Example from './components/Example';
import {
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from 'react-router-dom';
import {
  Alert,
  AppBar,
  Toolbar,
  IconButton,
  Container,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
  Button
} from '@mui/material';

const StyledButton = styled.button`
  background: Bisque;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`;

const StyledInput = styled.input`
  background: grey;
  margin-bottom: 0.5rem;
`;

const Footer = styled.footer`
  margin-top: 1rem;
  background: Chocolate;
`;

const Home = () => {
  return (
    <div>
      <h2>TKTL notes app</h2>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      <form>
        <StyledInput />
        <br />
        <StyledButton type="submit" primary=''>Example</StyledButton>
        <Example>Example button 2</Example>
      </form>
    </div>
  );
};

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  );
};

const Notes = ({ notes }) => {
  return (
    <>
      <h2>Notes</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {notes.map(note =>
              <TableRow key={note.id}>
                <TableCell>
                  <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </TableCell>
                <TableCell>
                  {note.name}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const Users = () => {
  return (
    <div>
      <h2>TKTL notes app</h2>
      <ul>
        <li>Matti Luukkainen</li>
        <li>Juha Tauriainen</li>
        <li>Arto Hellas</li>
      </ul>
    </div>
  );
};

const Notification = ({ message }) => {
  if (!message || message.length === 0) {
    return null;
  }

  return (
    <Alert severity="success" style={{ marginBottom: '1rem' }}>
      {message}
    </Alert>
  );
};

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    onLogin('mvaha');
    navigate('/');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <TextField label="username" />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <TextField label="password" type="password" />
        </div>
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '1rem' }}>
          Login
        </Button>
      </form>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const match = useMatch('/notes/:id');
  const note = match ? notes.find(note => note.id === Number(match.params.id)) : null;

  const login = (user) => {
    setUser(user);
    setMessage(`Welcome ${user}`);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <Container>
      <Notification message={message} />
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/notes">
            Notes
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          {user 
            ? <em>{user} logged in</em>
            : <Button color="inherit" component={Link} to="/login">Login</Button>
          }
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login onLogin={login} />} />
      </Routes>
      <Footer>
        <br />
        <em>Note app, Department of Computer Science 2023</em>
      </Footer>
    </Container>
  );
};

export default App;
