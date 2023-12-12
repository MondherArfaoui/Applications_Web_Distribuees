import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const CabinetMed = () => {
  const [cabinet, setCabinet] = useState(null);

  useEffect(() => {
    const matricule = localStorage.getItem("matricule");

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8060/cabinets/by-medecin/${matricule}`);
        const medecinResponse = await axios.get(`http://localhost:3000/medecin/getByMatricule/${response.data.matriculeMedecin}`);
        setCabinet({ ...response.data, medecin: medecinResponse.data.data });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (cabinetId) => {
    try {
      await axios.delete(`http://localhost:8060/cabinets/delete/${cabinetId}`);
      // Since we are dealing with a single object, just set it to null
      setCabinet(null);
    } catch (error) {
      console.error("Error deleting cabinet:", error);
    }
  };
  

  return (
    <div className="card border bg-transparent rounded-3">
      <div className="card-header bg-transparent border-bottom">
        <div className="row justify-content-between align-middle">
          <div className="col-sm-10">
            <h3 className="card-header-title mb-2 mb-sm-0">Ma cabinet</h3>
          </div>
          <div className=" col-sm-2 align-items-center mt-2 mt-md-0">
            <Link to="/medecin/addCabinet" className="btn btn-sm btn-primary mb-0">Ajouter cabinet</Link>
          </div>
        </div>
      </div>
      <div className="card-body">
        {cabinet ? (
          <div className="table-responsive border-0">
            <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
              <thead>
                <tr>
                  <th className="border-0 rounded-start">Médecin</th>
                  <th className="border-0">Cabinet</th>
                  <th className="border-0">Adresse</th>
                  <th className="border-0">Numéro de téléphone</th>
                  <th className="border-0 rounded-end">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="d-flex align-items-center position-relative">
                      <div className="avatar avatar-md mb-2 mb-md-0">
                        <img src={`http://localhost:3000/getImage/${cabinet.medecin.image}`} className="rounded" alt="Médecin" />
                      </div>
                      <div className="ms-2">
                        <h6 className="mb-0">{cabinet.medecin.nom} {cabinet.medecin.prenom}</h6>
                        <span className="text-body small"><i className="fas fa-user-md me-1 mt-1" />{cabinet.medecin.specialite}</span>
                      </div>
                    </div>
                  </td>
                  <td>{cabinet.nom}</td>
                  <td>{cabinet.adresse}</td>
                  <td>{cabinet.telephone}</td>
                  <td>
                    <button onClick={() => handleDelete(cabinet.id)} className="btn btn-danger-soft btn-round mb-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Supprimer"><i className="fas fa-trash-alt" /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p>No cabinet found.</p>
        )}
      </div>
    </div>
  );
};

export default CabinetMed;
