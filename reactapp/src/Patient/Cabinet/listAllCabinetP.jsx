import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const ListAllCabinetP = () => {
  const [cabinets, setCabinets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cabinetsResponse = await axios.get(`http://localhost:8060/cabinets/all`);
        const cabinetsWithMedecins = await Promise.all(
          cabinetsResponse.data.map(async (cabinet) => {
            const medecinResponse = await axios.get(`http://localhost:3000/medecin/getByMatricule/${cabinet.matriculeMedecin}`);
            return { ...cabinet, medecin: medecinResponse.data.data };
          })
        );
        setCabinets(cabinetsWithMedecins);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card border bg-transparent rounded-3">
      <div className="card-header bg-transparent border-bottom">
        <h3 className="mb-0">Liste des cabinets</h3>
      </div>
      <div className="card-body">
        <div className="table-responsive border-0">
          <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
            <thead>
              <tr>
                <th className="border-0 rounded-start">Médecin</th>
                <th className="border-0">Cabinet</th>
                <th className="border-0">Adresse</th>
                <th className="border-0 rounded-end">Numéro de téléphone</th>
              </tr>
            </thead>
            <tbody>
              {cabinets.length > 0 ? (
                cabinets.map((cabinet) => (
                  <tr key={cabinet.id}>
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No cabinets found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListAllCabinetP;
