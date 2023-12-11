import React, { useEffect, useState } from "react";
import axios from "axios";

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
            <a
              href="#"
              className="btn btn-sm btn-primary mb-0"
              data-bs-toggle="modal"
              data-bs-target="#addQuiz"
            >
              Ajouter article
            </a>
          </div>
        </div>
      </div>
      {/* Header END */}
      {/* Reviews START */}
      <div className="card-body mt-2 mt-sm-4">
        {articles && articles.length > 0 ? (
          articles.map((article, index) => (
            <div className="d-sm-flex" key={article.id || index}>
              <img
                className="avatar avatar-lg rounded-circle float-start me-3"
                src={`http://localhost:3000/getImage/${article.image}`}
                alt="avatar"
              />
              <div>
                <div className="mb-3 d-sm-flex justify-content-sm-between align-items-center">
                  <h5 className="m-0">
                    {article.nom} {article.prenom}
                  </h5>
                  <span className="me-3 small">{article.datePublication}</span>
                </div>
                <h6>{article.titre}</h6>
                <p>{article.description}</p>
                <div className="text-end">
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="btn btn-sm btn-primary-soft mb-1 mb-sm-0"
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-light mb-0"
                    data-bs-toggle="collapse"
                    href="#collapseComment"
                    aria-expanded="false"
                    aria-controls="collapseComment"
                  >
                    Reply
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
