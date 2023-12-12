import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: email,
          password: password,
        });
        
        localStorage.setItem('USER_ID', response.data.data.data._id);
        localStorage.setItem('USER_ROLE', response.data.data.data.__t);
        localStorage.setItem('USER_NOM', response.data.data.data.nom);
        localStorage.setItem('USER_PRENOM', response.data.data.data.prenom);
        localStorage.setItem('USER_EMAIL', response.data.data.data.email);
        localStorage.setItem('USER_IMAGE', response.data.data.data.image);
        localStorage.setItem('refreshToken', JSON.stringify(response.data.data.refreshToken));
        // Enregistrer le jeton d'accès dans le stockage local (LocalStorage ou SessionStorage)
        localStorage.setItem('USER', JSON.stringify(response.data));
        
        if (response.data.data.data.__t === 'medecins') {
          localStorage.setItem('matricule', response.data.data.data.matricule);
          navigate('/medecin/cabinetMed');
        } else {
          localStorage.setItem('numSecuriteSociale', response.data.data.data.numSecuriteSociale);
          navigate('/patient/listAllCabinet');
        }
  
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };
  
    return (

        <div>
  {/* Header START */}
  <header className="navbar-light navbar-sticky header-static">
    {/* Nav START */}
    <nav className="navbar navbar-expand-xl">
      <div className="container-fluid px-3 px-xl-5">
        {/* Logo START */}
        <a className="navbar-brand" href="index.html">
          <img className="light-mode-item navbar-brand-item" src="assets/images/logo.svg" alt="logo" />
          <img className="dark-mode-item navbar-brand-item" src="assets/images/logo-light.svg" alt="logo" />
        </a>
        {/* Logo END */}
        {/* Responsive navbar toggler */}
        <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-animation">
            <span />
            <span />
            <span />
          </span>
        </button>
        {/* Main navbar START */}
        <div className="navbar-collapse w-100 collapse" id="navbarCollapse">
          {/* Nav category menu START */}
          <ul className="navbar-nav navbar-nav-scroll me-auto">
            {/* Nav item 1 Demos */}
            <li className="nav-item dropdown dropdown-menu-shadow-stacked">
            </li>
          </ul>
          {/* Nav category menu END */}
          {/* Nav Main menu START */}
          <ul className="navbar-nav navbar-nav-scroll me-auto">
          </ul>
          {/* Nav Main menu END */}
          {/* Nav Search START */}
          <div className="nav my-3 my-xl-0 px-4 flex-nowrap align-items-center">
            <div className="nav-item w-100">
            </div>
          </div>
          {/* Nav Search END */}
        </div>
        {/* Main navbar END */}
        <div className="navbar-nav ms-2">
          <Link to="/logupMedecin" className="btn btn-sm btn-danger-soft mb-0"><i className="fas fa-sign-in-alt me-2" />S'inscrire Médecin</Link>
        </div>
        <div className="navbar-nav ms-2">
          <Link to="/logupPatient" className="btn btn-sm btn-danger-soft mb-0"><i className="fas fa-sign-in-alt me-2" />S'inscrire Patient</Link>
        </div>
      </div>
    </nav>
    {/* Nav END */}
  </header>
  {/* Header END */}
  {/* **************** MAIN CONTENT START **************** */}
  <main>
    <section className="p-0 d-flex align-items-center position-relative overflow-hidden">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6 m-auto">
            <div className="row my-5">
              <div className="col-sm-10 col-xl-8 m-auto">
                {/* Title */}
                <span className="mb-0 fs-1">👋</span>
                <h2 className="fs-2">Connectez-vous à votre compte</h2>
                <p className="lead mb-4">Ravi de vous voir! Veuillez vous connecter avec votre compte.</p>
                {/* Form START */}
                <form onSubmit={handleLogin}>
                  {/* Email */}
                  <div className="mb-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">Adresse e-mail *</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-envelope-fill" /></span>
                      <input type="email" className="form-control border-0 bg-light rounded-end ps-1" placeholder="E-mail" id="exampleInputEmail1" value={email}
                              onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>
                  {/* Password */}
                  <div className="mb-4">
                    <label htmlFor="inputPassword5" className="form-label">Mot de passe *</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="fas fa-lock" /></span>
                      <input type="password" className="form-control border-0 bg-light rounded-end ps-1" placeholder="Mot de passe" id="inputPassword5" value={password}
                              onChange={(e) => setPassword(e.target.value)} />
                    </div>
                  </div>
                  {/* Button */}
                  <div className="align-items-center mt-0">
                    <div className="d-grid">
                      <button className="btn btn-primary mb-0" type="submit">Se connecter</button>
                    </div>
                  </div>
                </form>
                {/* Form END */}
              </div>
            </div> {/* Row END */}
          </div>
        </div> {/* Row END */}
      </div>
    </section>
  </main>
  {/* **************** MAIN CONTENT END **************** */}
  {/* =======================
Footer START */}
  <footer className="pt-5">
    <div className="container">
      {/* Row START */}
      <div className="row g-4">
        {/* Widget 1 START */}
        <div className="col-lg-12">
          {/* logo */}
          <a className="me-0 d-lg-flex justify-content-center align-items-cente" href="index.html">
            <img className="light-mode-item h-40px" src="assets/images/logo.svg" alt="logo" />
            <img className="dark-mode-item h-40px" src="assets/images/logo-light.svg" alt="logo" />
          </a>
          {/* Social media icon */}
          <ul className="list-inline mb-0 mt-3 d-lg-flex justify-content-center align-items-cente">
            <br /><br />
            <li className="list-inline-item"> <a className="btn btn-white btn-sm shadow px-2 text-facebook" href="#"><i className="fab fa-fw fa-facebook-f" /></a> </li>
            <li className="list-inline-item"> <a className="btn btn-white btn-sm shadow px-2 text-instagram" href="#"><i className="fab fa-fw fa-instagram" /></a> </li>
            <li className="list-inline-item"> <a className="btn btn-white btn-sm shadow px-2 text-twitter" href="#"><i className="fab fa-fw fa-twitter" /></a> </li>
            <li className="list-inline-item"> <a className="btn btn-white btn-sm shadow px-2 text-linkedin" href="#"><i className="fab fa-fw fa-linkedin-in" /></a> </li>
          </ul>
        </div>
        {/* Widget 1 END */}
      </div>
      {/* Divider */}
      <hr className="mt-4 mb-0" />
      {/* Bottom footer */}
      <div className="py-3">
        <div className="container px-0">
          <div className="d-lg-flex justify-content-center align-items-center py-3 text-center text-md-left">
            {/* copyright text */}
            <div className="text-body text-primary-hover"> Copyrights ©2023 ESPRIT.</div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* =======================
Footer END */}
</div>

    );
  };
  
  export default Login;
  