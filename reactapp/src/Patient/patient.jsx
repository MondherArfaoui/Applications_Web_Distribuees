import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet, useNavigate, Link } from 'react-router-dom';

const PatientHome = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));

    useEffect(() => {
        // Fetch the userId from localStorage
        const userId = localStorage.getItem('USER_ID');
   
        const fetchProfileData = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/patient/getById/${userId}`);
            setUser(response.data.data);
          } catch (error) {
            console.error('Error fetching profile data:', error);
          }
        };
    
        fetchProfileData();
      }, []);

      // Function to handle user logout
      const handleLogout = async (e) => {
        e.preventDefault();
        try {
          await axios.post('http://localhost:3000/auth/logout', { refreshToken });
          localStorage.clear();
          navigate('/');
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };


      return (
        <div>
            <div>
      {/* Header START */}
      <header className="navbar-light navbar-sticky">
        {/* Logo Nav START */}
        <nav className="navbar navbar-expand-xl">
          <div className="container">
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
              {/* Nav Main menu START */}
              <ul className="navbar-nav navbar-nav-scroll mx-auto">
              </ul>
              {/* Nav Main menu END */}
            </div>
            {/* Main navbar END */}
            {/* Profile START */}
            <div className="dropdown ms-1 ms-lg-0">
              <a className="avatar avatar-sm p-0" href="#" id="profileDropdown" role="button" data-bs-auto-close="outside" data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false">
                <img className="avatar-img rounded-circle" src={`http://localhost:3000/getImage/${user.image}`} alt="avatar" />
              </a>
              <ul className="dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3" aria-labelledby="profileDropdown">
                {/* Profile info */}
                <li className="px-3 mb-3">
                  <div className="d-flex align-items-center">
                    {/* Avatar */}
                    <div className="avatar me-3">
                      <img className="avatar-img rounded-circle shadow" src={`http://localhost:3000/getImage/${user.image}`} alt="avatar" />
                    </div>
                    <div>
                      <a className="h6" href="#">{user.nom} {user.prenom}</a>
                      <p className="small m-0">{user.email}</p>
                    </div>
                  </div>
                </li>
                <li> <hr className="dropdown-divider" /></li>
                {/* Dark mode options START */}
                <li>
                  <div className="bg-light dark-mode-switch theme-icon-active d-flex align-items-center p-1 rounded mt-2">
                    <button type="button" className="btn btn-sm mb-0" data-bs-theme-value="light">
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-sun fa-fw mode-switch" viewBox="0 0 16 16">
                        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                        <use href="#" />
                      </svg> Light
                    </button>
                    <button type="button" className="btn btn-sm mb-0" data-bs-theme-value="dark">
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-moon-stars fa-fw mode-switch" viewBox="0 0 16 16">
                        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                        <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
                        <use href="#" />
                      </svg> Dark
                    </button>
                    <button type="button" className="btn btn-sm mb-0 active" data-bs-theme-value="auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-circle-half fa-fw mode-switch" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
                        <use href="#" />
                      </svg> Auto
                    </button>
                  </div>
                </li> 
                {/* Dark mode options END*/}
              </ul>
            </div>
            {/* Profile START */}
          </div>
        </nav>
        {/* Logo Nav END */}
      </header>
      {/* Header END */}
      {/* **************** MAIN CONTENT START **************** */}
      <main>
        {/* =======================
    Page Banner START */}
        <section className="pt-0">
          {/* Main banner background image */}
          <div className="container-fluid px-0">
            <div className="bg-blue h-100px h-md-200px rounded-0" style={{background: 'url(assets/images/pattern/04.png) no-repeat center center', backgroundSize: 'cover'}}>
            </div>
          </div>
          <div className="container mt-n4">
            <div className="row">
              {/* Profile banner START */}
              <div className="col-12">
                <div className="card bg-transparent card-body p-0">
                  <div className="row d-flex justify-content-between">
                    {/* Avatar */}
                    <div className="col-auto mt-4 mt-md-0">
                      <div className="avatar avatar-xxl mt-n3">
                        <img className="avatar-img rounded-circle border border-white border-3 shadow" src={`http://localhost:3000/getImage/${user.image}`} />
                      </div>
                    </div>
                    {/* Profile info */}
                    <div className="col d-md-flex justify-content-between align-items-center mt-4">
                      <div>
                        <h1 className="my-1 fs-4">{user.nom} {user.prenom}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Profile banner END */}
                {/* Advanced filter responsive toggler START */}
                {/* Divider */}
                <hr className="d-xl-none" />
                <div className="col-12 col-xl-3 d-flex justify-content-between align-items-center">
                  <a className="h6 mb-0 fw-bold d-xl-none" href="#">Menu</a>
                  <button className="btn btn-primary d-xl-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                    <i className="fas fa-sliders-h" />
                  </button>
                </div>
                {/* Advanced filter responsive toggler END */}
              </div>
            </div>
          </div>
        </section>
        {/* =======================
    Page Banner END */}
        {/* =======================
    Page content START */}
        <section className="pt-0">
          <div className="container">
            <div className="row">
              {/* Left sidebar START */}
              <div className="col-xl-3">
                {/* Responsive offcanvas body START */}
                <div className="offcanvas-xl offcanvas-end" tabIndex={-1} id="offcanvasSidebar">
                  {/* Offcanvas header */}
                  <div className="offcanvas-header bg-light">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Mon profil</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasSidebar" aria-label="Close" />
                  </div>
                  {/* Offcanvas body */}
                  <div className="offcanvas-body p-3 p-xl-0">
                    <div className="bg-dark border rounded-3 pb-0 p-3 w-100">
                      {/* Dashboard menu */}
                      <div className="list-group list-group-dark list-group-borderless">
                        <Link to="listAllArticle" className="list-group-item">Liste de tous les articles</Link>
                        <Link to="listAllCabinet" className="list-group-item">Liste de tous les cabinets</Link>
                        <Link to="listAllService" className="list-group-item">Liste de tous les Services Médicales</Link>
                        <Link to="listAllRendezVous" className="list-group-item">Mes Rendez-Vous</Link>
                        <button onClick={handleLogout} className="list-group-item text-danger bg-danger-soft-hover">
                        Se déconnecter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Responsive offcanvas body END */}
              </div>
              {/* Left sidebar END */}
              {/* Main content START */}
              <div className="col-xl-9">
              <Outlet></Outlet>
              </div>
              {/* Main content END */}
            </div>{/* Row END */}
          </div>
        </section>
        {/* =======================
    Page content END */}
      </main>
      {/* **************** MAIN CONTENT END **************** */}
      {/* =======================
    Footer START */}
      <footer className="bg-dark p-3">
        <div className="container">
          <div className="row align-items-center">
            {/* Widget */}
            <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
              {/* Logo START */}
              <a href="index.html"> <img className="h-20px" src="assets/images/logo-light.svg" alt="logo" /> </a>
            </div>
            {/* Widget */}
            <div className="col-md-4 mb-3 mb-md-0">
              <div className="text-center text-white text-primary-hover">
                Copyrights ©2023 ESPRIT.
              </div>
            </div>
            {/* Widget */}
            <div className="col-md-4">
              {/* Rating */}
              <ul className="list-inline mb-0 text-center text-md-end">
                <li className="list-inline-item ms-2"><a href="#"><i className="text-white fab fa-facebook" /></a></li>
                <li className="list-inline-item ms-2"><a href="#"><i className="text-white fab fa-instagram" /></a></li>
                <li className="list-inline-item ms-2"><a href="#"><i className="text-white fab fa-linkedin-in" /></a></li>
                <li className="list-inline-item ms-2"><a href="#"><i className="text-white fab fa-twitter" /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      {/* =======================
    Footer END */}
    </div>
    
        </div>
      )
}
export default PatientHome