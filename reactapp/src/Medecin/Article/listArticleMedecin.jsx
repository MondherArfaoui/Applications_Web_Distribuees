import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const ListArticleMedecin = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const matricule = localStorage.getItem("matricule");

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8061/articles/by-medecin/${matricule}`
        );
        setArticles(response.data);
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
      {/* Header START */}
      <div className="card-header bg-transparent border-bottom">
        <div className="row justify-content-between align-middle">
          {/* Title */}
          <div className="col-sm-10">
            <h3 className="card-header-title mb-2 mb-sm-0">
              Liste des articles médicales
            </h3>
          </div>
          <div className=" col-sm-2 align-items-center mt-2 mt-md-0">
            <Link to="addArticle"
              href="#"
              className="btn btn-sm btn-primary mb-0"
              data-bs-toggle="modal"
              data-bs-target="#addQuiz"
            >
              Ajouter article
            </Link>
          </div>
        </div>
      </div>
      {/* Header END */}
      {/* Reviews START */}
      <div className="card-body mt-2 mt-sm-4">
        {articles && articles.length > 0 ? (
          articles.map((article, index) => (
            <div className="d-sm-flex" key={article.id || index}>
              <div>
                
                <h6>{article.titre}</h6>
                <p>{article.description}</p>
                <div className="mb-3 d-sm-flex justify-content-sm-between align-items-center">
                  <span className="me-3 small">Date d'ajout: {article.datePublication}</span>
                </div>
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
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </div>
  );
};

export default ListArticleMedecin;
