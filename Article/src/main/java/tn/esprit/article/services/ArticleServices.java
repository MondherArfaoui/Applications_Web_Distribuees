package tn.esprit.article.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.article.entities.Article;
import tn.esprit.article.repositories.ArticleRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class ArticleServices {

    @Autowired
    private ArticleRepository articleRepository;

    public Article saveArticle(Article article, String matriculeMedecin) {
        article.setMatriculeMedecin(matriculeMedecin);
        article.setDatePublication(LocalDate.now());
        return articleRepository.save(article);
    }

    public Article updateArticle(int id, Article article) {
        if (articleRepository.findById(id).isPresent()) {
            Article existingArticle = articleRepository.findById(id).get();
            existingArticle.setTitre(article.getTitre());
            existingArticle.setDescription(article.getDescription());
            existingArticle.setDatePublication(LocalDate.now());
            existingArticle.setMatriculeMedecin(article.getMatriculeMedecin());
            return articleRepository.save(existingArticle);
        } else
            return null;
    }

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public Article getArticleById(int id) {
        return articleRepository.findById(id).orElse(null);
    }

    public List<Article> getArticleByMedecin(String matriculeMedecin) {
        return articleRepository.findByMatriculeMedecin(matriculeMedecin);
    }

    public void deleteArticleById(int id) {
        articleRepository.deleteById(id);
    }
}
