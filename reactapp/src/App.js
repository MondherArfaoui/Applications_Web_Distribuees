import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Home/login/login';
import LogupMedecin from './Home/logupMedecin/logupMedecin';
import LogupPatient from './Home/logupPatient/logupPatient';
import MedecinHome from './Medecin/medecin';
import PatientHome from './Patient/patient';
import ListArticleMedecin from './Medecin/Article/listArticleMedecin';
import ListAllArticle from './Medecin/Article/listAllArticle';
import AddArticle from './Medecin/Article/addArticle';
import ListAllArticleP from './Patient/Article/listAllArticleP';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logupMedecin" element={<LogupMedecin />} />
        <Route path="/logupPatient" element={<LogupPatient />} />
        <Route path="/medecin" element={<MedecinHome />}>
          <Route path="addArticle" element={<AddArticle />} />
          <Route path="listArticle" element={<ListArticleMedecin />} />
          <Route path="listAllArticle" element={<ListAllArticle />} />
        </Route>
        <Route path="/patient" element={<PatientHome />}>
          <Route path="listAllArticle" element={<ListAllArticleP />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
