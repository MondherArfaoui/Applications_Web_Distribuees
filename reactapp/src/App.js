import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Home/login/login';
import LogupMedecin from './Home/logupMedecin/logupMedecin';
import LogupPatient from './Home/logupPatient/logupPatient';
import MedecinHome from './Medecin/medecin';
import PatientHome from './Patient/patient';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logupMedecin" element={<LogupMedecin />} />
        <Route path="/logupPatient" element={<LogupPatient />} />
        <Route path="/medecin" element={<MedecinHome />}>
          {/* <Route path="Shop" element={<Shop />} /> */}
        </Route>
        <Route path="/patient" element={<PatientHome />}>
          {/* <Route path="Shop" element={<Shop />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
