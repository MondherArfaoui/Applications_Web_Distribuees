import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRendezVous = () => {
    const [medecins, setMedecins] = useState([]);
    const [selectedMedecin, setSelectedMedecin] = useState('');
    const [dateRV, setDateRV] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMedecins = async () => {
            try {
                const response = await axios.get("http://localhost:3000/medecin");
                console.log("API Response:", response.data.data); // Debugging line

                if (Array.isArray(response.data.data)) {
                    setMedecins(response.data.data);
                    if (response.data.data.length > 0) {
                        setSelectedMedecin(response.data.data[0].matriculeMedecin);
                    }
                } else {
                    console.error("API response is not an array"); // Debugging line
                }
            } catch (error) {
                console.error("Error fetching medecins:", error);
            }
        };
        fetchMedecins();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        const numSecuriteSociale = localStorage.getItem("numSecuriteSociale");
        try {
            await axios.post(`http://localhost:8070/rendezvouses/add/${selectedMedecin}/${numSecuriteSociale}`, {
                dateRV: dateRV,
            });
            navigate('/patient/listAllRendezVous');
        } catch (error) {
            console.error('Error adding rendezvous:', error);
        }
    };

    return (
        <div className="card bg-transparent border rounded-3">
            <div className="card-header bg-transparent border-bottom">
                <h3 className="card-header-title mb-0">Ajouter Rendez-vous</h3>
            </div>
            <div className="card-body">
                <form className="row g-4" onSubmit={handleLogin}>
                    <div className="col-md-12">
                        <label className="form-label">Choisir Médecin</label>
                        <select className="form-control" value={selectedMedecin} onChange={(e) => setSelectedMedecin(e.target.value)}>
                            {Array.isArray(medecins) && medecins.map((medecin) => (
                                <option key={medecin._id} value={medecin.matricule}>
                                    {medecin.nom} {medecin.prenom}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Date Rendez-vous</label>
                        <input className="form-control" type="date" value={dateRV} onChange={(e) => setDateRV(e.target.value)} />
                    </div>
                    <div className="d-sm-flex justify-content-end">
                        <button type="submit" className="btn btn-primary mb-0">Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRendezVous;
