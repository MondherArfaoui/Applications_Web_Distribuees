import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const ListAllArticleP = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8061/articles/all`
        );
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchData();
  }, []);

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

export default ListAllArticleP;
