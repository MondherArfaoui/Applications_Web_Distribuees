import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const ListAllServiceM = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const matricule = localStorage.getItem("matricule");

    const fetchData = async () => {
      try {
        const servicesResponse = await axios.get(`http://localhost:8071/servicemedicals/by-medecin/${matricule}`);
        const servicesWithMedecins = await Promise.all(
          servicesResponse.data.map(async (service) => {
            const medecinResponse = await axios.get(`http://localhost:3000/medecin/getByMatricule/${service.matriculeMedecin}`);
            return { ...service, medecin: medecinResponse.data.data };
          })
        );
        setServices(servicesWithMedecins);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:8071/servicemedicals/delete/${serviceId}`);
      setServices((prevState) =>
        prevState.filter((service) => service.id !== serviceId)
      );
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div className="card border bg-transparent rounded-3">
      <div className="card-header bg-transparent border-bottom">
        <div className="row justify-content-between align-middle">
          <div className="col-sm-10">
            <h3 className="card-header-title mb-2 mb-sm-0">Mes Services Médicales</h3>
          </div>
          <div className="col-sm-2 align-items-center mt-2 mt-md-0">
            <Link to="/medecin/addServiceM" className="btn btn-sm btn-primary mb-0">Ajouter service</Link>
          </div>
        </div>
      </div>
      <div className="card bg-transparent">
        <div className="card-body px-0">
          <div className="tab-content">
            <div className="tab-pane fade show active">
              <div className="row g-4">
                {services.length > 0 ? (
                  services.map((service) => (
                    <div className="col-md-6 col-xxl-4" key={service.id}>
                      <div className="card bg-transparent border h-100">
                        <div className="card-header bg-transparent border-bottom d-flex justify-content-between">
                          <div className="d-sm-flex align-items-center">
                            <div className="avatar avatar-md flex-shrink-0">
                              <img className="avatar-img rounded-circle" src={`http://localhost:3000/getImage/${service.medecin.image}`} alt="avatar" />
                            </div>
                            <div className="ms-0 ms-sm-2 mt-2 mt-sm-0">
                              <h5 className="mb-0">{service.medecin.nom} {service.medecin.prenom}</h5>
                              <span className="text-body small"><i className="fas fa-user-md me-1 mt-1" />{service.medecin.specialite}</span>
                              </div>
                  </div>
                  {/* Edit dropdown */}
                  <div className="dropdown text-end">
                    <a className="btn btn-sm btn-light btn-round small mb-0" role="button" id="dropdownShare2" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="bi bi-three-dots fa-fw" />
                    </a>
                    {/* dropdown button */}
                    <ul className="dropdown-menu dropdown-w-sm dropdown-menu-end min-w-auto shadow rounded" aria-labelledby="dropdownShare2">
                      <li><a className="dropdown-item" onClick={() => handleDelete(service.id)}><i className="bi bi-trash fa-fw me-2" />Remove</a></li>
                    </ul>
                  </div>
                </div>
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="d-flex align-items-center">
                              <div className="icon-md bg-success bg-opacity-10 text-success rounded-circle flex-shrink-0"><i className="fas fa-briefcase-medical fa-fw" /></div>
                              <h6 className="mb-0 ms-2 fw-light">Service Médicale</h6>
                            </div>
                            <span className="mb-0 fw-bold">{service.nom}</span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="d-flex align-items-center">
                              <div className="icon-md bg-purple bg-opacity-10 text-purple rounded-circle flex-shrink-0"><i className="fas fa-book-reader fa-fw" /></div>
                              <h6 className="mb-0 ms-2 fw-light">Description</h6>
                            </div>
                            
                          </div>
                          <span className="mb-0 fw-bold">{service.description}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No services found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListAllServiceM;
