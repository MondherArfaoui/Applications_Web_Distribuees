import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const ListAllRendezVous = () => {
    const [rendezvous, setRendezvous] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const matricule = localStorage.getItem("matricule");
            try {
                const rendezvousResponse = await axios.get(`http://localhost:8070/rendezvouses/allRendezVousMedecin/${matricule}`);
                const rendezvousWithPatients = await Promise.all(
                    rendezvousResponse.data.map(async (rendezvous) => {
                        const patientResponse = await axios.get(`http://localhost:3000/patient/getByNumSecuriteSociale/${rendezvous.numSecuriteSocialePatient}`);
                        return { ...rendezvous, patient: patientResponse.data.data };
                    })
                );
                setRendezvous(rendezvousWithPatients);
            } catch (error) {
                console.error("Error fetching rendezvous:", error);
            }
        };

        fetchData();
    }, []);

    const handleConfirmer = async (rendezvousId) => {
        try {
            await axios.put(`http://localhost:8070/rendezvouses/ConfirmeRendezVous/${rendezvousId}`);
            
            setRendezvous(prevState => prevState.map(rv => {
                if (rv.id === rendezvousId) {
                    return { ...rv, statut: 'Confirmé' };
                }
                return rv;
            }));
        } catch (error) {
            console.error("Error confirmer rendez vous:", error);
        }
    };

    return (
        <div className="card border bg-transparent rounded-3">
            <div className="card-header bg-transparent border-bottom">
                <h3 className="card-header-title mb-2 mb-sm-0">Liste des rendez-vous</h3>
            </div>
            <div className="card-body">
                <div className="table-responsive border-0">
                    <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
                        <thead>
                            <tr>
                                <th className="border-0 rounded-start">Patient</th>
                                <th className="border-0">Date rendez-vous</th>
                                <th className="border-0">Statut</th>
                                <th className="border-0 rounded-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rendezvous.map((rv, index) => (
                                <tr key={rv.id || index}>
                                    <td>
                                        <div className="d-flex align-items-center position-relative">
                                            <div className="avatar avatar-md mb-2 mb-md-0">
                                                <img src={`http://localhost:3000/getImage/${rv.patient.image}`} className="rounded" alt="Médecin" />
                                            </div>
                                            <div className="ms-2">
                                                <h6 className="mb-0">{rv.patient.nom} {rv.patient.prenom}</h6>
                                                <span className="text-body small"><i className="fas fa-user-md me-1 mt-1" />{rv.patient.telephone}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{rv.dateRV}</td>
                                    <td>{rv.statut}</td>
                                    <td>
                                        <button onClick={() => handleConfirmer(rv.id)} className="btn btn-success-soft btn-round mb-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Confirmer Rendez-Vous"><i className="fas fa-calendar-check" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {rendezvous.length === 0 && <p>Aucun rendez-vous trouvé.</p>}
            </div>
        </div>
    );
};

export default ListAllRendezVous;
