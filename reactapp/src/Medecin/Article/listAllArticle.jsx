import React, { useEffect, useState } from 'react';
import axios from 'axios';


<div className="card border bg-transparent rounded-3">
  {/* Header START */}
  <div className="card-header bg-transparent border-bottom">
    <div className="row justify-content-between align-middle">
      {/* Title */}
      <div className="col-sm-10">
        <h3 className="card-header-title mb-2 mb-sm-0">Liste des articles médicales</h3>
      </div>
      <div className=" col-sm-2 align-items-center mt-2 mt-md-0">
        <a href="#" className="btn btn-sm btn-primary mb-0" data-bs-toggle="modal" data-bs-target="#addQuiz">Ajouter article</a>
      </div>
    </div>
  </div>
  {/* Header END */}
  {/* Reviews START */}
  <div className="card-body mt-2 mt-sm-4">
    {/* Review item START */}
    <div className="d-sm-flex">
      {/* Avatar image */}
      <img className="avatar avatar-lg rounded-circle float-start me-3" src="assets/images/avatar/01.jpg" alt="avatar" />
      <div>
        <div className="mb-3 d-sm-flex justify-content-sm-between align-items-center">
          {/* Title */}
          <div>
            <h5 className="m-0">Frances Guerrero</h5>
            <span className="me-3 small">June 11, 2021 at 6:01 am </span>
          </div>
        </div>
        {/* Content */}
        <h6><span className="text-body fw-light">Review on:</span> How to implement sitemap on sass</h6>
        <p>Satisfied conveying a dependent contented he gentleman agreeable do be. Warrant private blushes removed an in equally totally if. Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do. </p>
      </div>
    </div>
    {/* Divider */}
    <hr />
    {/* Review item END */}
  </div>
</div>
