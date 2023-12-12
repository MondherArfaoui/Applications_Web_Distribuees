import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const ListAllArticleP = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articlesResponse = await axios.get(`http://localhost:8061/articles/all`);
        const articlesWithMedecins = await Promise.all(
          articlesResponse.data.map(async (article) => {
            const medecinResponse = await axios.get(`http://localhost:3000/medecin/getByMatricule/${article.matriculeMedecin}`);
            return { ...article, medecin: medecinResponse.data.data };
          })
        );
        setArticles(articlesWithMedecins);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card border bg-transparent rounded-3">
      <div className="card-header bg-transparent border-bottom">
        <div className="row justify-content-between align-middle">
          <div className="col-sm-10">
            <h3 className="card-header-title mb-2 mb-sm-0">Liste des articles médicales</h3>
          </div>
        </div>
      </div>
      <div className="card-body mt-2 mt-sm-4">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={article.id || index}>
              <div className="d-sm-flex">
                <img className="avatar avatar-lg rounded-circle float-start me-3" src={`http://localhost:3000/getImage/${article.medecin.image}`} alt="avatar" />
                <div>
                  <div className="mb-3 d-sm-flex justify-content-sm-between align-items-center">
                    <div>
                      <h5 className="m-0">{article.medecin.nom} {article.medecin.prenom}</h5>
                      <span className="me-3 small">Date d'ajout: {article.datePublication}</span>
                    </div>
                  </div>
                  <br />
                  <h6>{article.titre}</h6>
                  <p>{article.description}</p>
                </div>
              </div>
              {index !== articles.length - 1 && <hr />} {/* Horizontal line */}
            </div>
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </div>
  );
};

export default ListAllArticleP;
