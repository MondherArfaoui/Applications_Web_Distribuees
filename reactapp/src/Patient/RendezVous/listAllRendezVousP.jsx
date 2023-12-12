import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const ListAllRendezVousP = () => {
    const [rendezvous, setRendezvous] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const numSecuriteSociale = localStorage.getItem("numSecuriteSociale");
            try {
                const rendezvousResponse = await axios.get(`http://localhost:8070/rendezvouses/allRendezVousPatient/${numSecuriteSociale}`);
                const rendezvousWithMedecins = await Promise.all(
                    rendezvousResponse.data.map(async (rendezvous) => {
                        const medecinResponse = await axios.get(`http://localhost:3000/medecin/getByMatricule/${rendezvous.matriculeMedecin}`);
                        return { ...rendezvous, medecin: medecinResponse.data.data };
                    })
                );
                setRendezvous(rendezvousWithMedecins);
            } catch (error) {
                console.error("Error fetching rendezvous:", error);
            }
        };

        fetchData();
    }, []);

    const handleAnnuler = async (rendezvousId) => {
        try {
            await axios.put(`http://localhost:8070/rendezvouses/AnnuleRendezVous/${rendezvousId}`);
            
            setRendezvous(prevState => prevState.map(rv => {
                if (rv.id === rendezvousId) {
                    return { ...rv, statut: 'Annulé' };
                }
                return rv;
            }));
        } catch (error) {
            console.error("Error annuler rendez vous:", error);
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
                                <th className="border-0 rounded-start">Médecin</th>
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
                                                <img src={`http://localhost:3000/getImage/${rv.medecin.image}`} className="rounded" alt="Médecin" />
                                            </div>
                                            <div className="ms-2">
                                                <h6 className="mb-0">{rv.medecin.nom} {rv.medecin.prenom}</h6>
                                                <span className="text-body small"><i className="fas fa-user-md me-1 mt-1" />{rv.medecin.specialite}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{rv.dateRV}</td>
                                    <td>{rv.statut}</td>
                                    <td>
                                        <button onClick={() => handleAnnuler(rv.id)} className="btn btn-danger-soft btn-round mb-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Annuler Rendez-Vous"><i className="fas fa-calendar-times" /></button>
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

export default ListAllRendezVousP;
