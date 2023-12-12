import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AddArticle = () => {

    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        const matricule = localStorage.getItem("matricule");
        e.preventDefault();
        try {
          const response = await axios.post(`http://localhost:8061/articles/add/${matricule}`, {
            titre: titre,
            description: description,
          });
          navigate('/medecin/listArticle');
        } catch (error) {
          console.error('Error add Article in:', error);
        }
      };
      return (
        // Edit profile START
        <div className="card bg-transparent border rounded-3">
            {/* Card header */}
            <div className="card-header bg-transparent border-bottom">
                <h3 className="card-header-title mb-0">Ajouter Article</h3>
            </div>
            {/* Card body START */}
            <div className="card-body">
                {/* Form */}
                <form className="row g-4" onSubmit={handleLogin}>
                    {/* Location */}
                    <div className="col-md-12">
                        <label className="form-label">Titre</label>
                        <input className="form-control" type="text" value={titre}
                            onChange={(e) => setTitre(e.target.value)} />
                    </div>
                    {/* About me */}
                    <div className="col-12">
                        <label className="form-label">Description</label>
                        <textarea className="form-control" rows={3} value={description}
                            onChange={(e) => setDescription(e.target.value)} />
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

export default AddArticle;