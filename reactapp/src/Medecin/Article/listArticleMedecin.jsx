import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const ListArticleMedecin = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const matricule = localStorage.getItem("matricule");

    const fetchData = async () => {
      try {
        const articlesResponse = await axios.get(`http://localhost:8061/articles/by-medecin/${matricule}`);
        const articlesWithMedecins = await Promise.all(
          articlesResponse.data.map(async (article) => {
            const medecinResponse = await axios.get(`http://localhost:3000/medecin/getByMatricule/${article.matriculeMedecin}`);
            return { ...article, medecin: medecinResponse.data.data };
          })
        );
        setArticles(articlesWithMedecins);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (articleId) => {
    try {
      await axios.delete(`http://localhost:8061/articles/delete/${articleId}`);
      setArticles((prevState) =>
        prevState.filter((article) => article.id !== articleId)
      );
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  return (
    <div className="card border bg-transparent rounded-3">
      <div className="card-header bg-transparent border-bottom">
        <div className="row justify-content-between align-middle">
          <div className="col-sm-10">
            <h3 className="card-header-title mb-2 mb-sm-0">Mes Articles</h3>
          </div>
          <div className="col-sm-2 align-items-center mt-2 mt-md-0">
            <Link to="/medecin/addArticle" className="btn btn-sm btn-primary mb-0">Ajouter article</Link>
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
                  <h6>{article.titre}</h6>
                  <p>{article.description}</p>
                  {/* Delete Button for each article */}
                  <div className="text-end">
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="btn btn-sm btn-primary-soft mb-1 mb-sm-0"
                    >
                      Delete
                    </button>
                  </div>
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

export default ListArticleMedecin;
