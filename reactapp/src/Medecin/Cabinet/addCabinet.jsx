import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AddCabinet = () => {

    const [nom, setNom] = useState('');
    const [adresse, setAdresse] = useState('');
    const [telephone, setTelephone] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        const matricule = localStorage.getItem("matricule");
        e.preventDefault();
        try {
          const response = await axios.post(`http://localhost:8060/cabinets/add/${matricule}`, {
            nom: nom,
            adresse: adresse,
            telephone: telephone,
          });
          navigate('/medecin/cabinetMed');
        } catch (error) {
          console.error('Error add Cabinet in:', error);
        }
      };
      return (
        // Edit profile START
        <div className="card bg-transparent border rounded-3">
            {/* Card header */}
            <div className="card-header bg-transparent border-bottom">
                <h3 className="card-header-title mb-0">Ajouter Cabinet</h3>
            </div>
            {/* Card body START */}
            <div className="card-body">
                {/* Form */}
                <form className="row g-4" onSubmit={handleLogin}>
                    {/* Location */}
                    <div className="col-md-12">
                        <label className="form-label">Cabinet</label>
                        <input className="form-control" type="text" value={nom}
                            onChange={(e) => setNom(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Numéro de téléphone</label>
                        <input className="form-control" type="text" value={telephone}
                            onChange={(e) => setTelephone(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Adresse</label>
                        <input className="form-control" type="text" value={adresse}
                            onChange={(e) => setAdresse(e.target.value)} />
                    </div>
                    {/* Save button */}
                    <div className="d-sm-flex justify-content-end">
                        <button type="submit" className="btn btn-primary mb-0">Ajouter</button>
                    </div>
                </form>
            </div>
            {/* Card body END */}
        </div>
        // Edit profile END
    );
};

export default AddCabinet;