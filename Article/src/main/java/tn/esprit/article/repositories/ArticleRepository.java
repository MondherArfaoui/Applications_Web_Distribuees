package tn.esprit.article.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.article.entities.Article;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Integer> {
    List<Article> findByMatriculeMedecin(String matriculeMedecin);
}
