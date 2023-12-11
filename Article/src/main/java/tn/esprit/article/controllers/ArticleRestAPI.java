package tn.esprit.article.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.article.entities.Article;
import tn.esprit.article.services.ArticleServices;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
@RequestMapping("/articles")
public class ArticleRestAPI {

    @Autowired
    private ArticleServices articleService;

    @PostMapping("/add/{matriculeMedecin}")
    public Article addArticle(@RequestBody Article article, @PathVariable String matriculeMedecin) {
        return articleService.saveArticle(article, matriculeMedecin);
    }

    @PutMapping("/update/{id}")
    public Article updateArticle(@PathVariable int id, @RequestBody Article article) {
        return articleService.updateArticle(id, article);
    }

    @GetMapping("/all")
    public List<Article> getAllArticles() {
        return articleService.getAllArticles();
    }

    @GetMapping("/{id}")
    public Article getArticleById(@PathVariable int id) {
        return articleService.getArticleById(id);
    }

    @GetMapping("/by-medecin/{matriculeMedecin}")
    public List<Article> getArticleByMedecin(@PathVariable String matriculeMedecin) {
        return articleService.getArticleByMedecin(matriculeMedecin);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteArticle(@PathVariable int id) {
        articleService.deleteArticleById(id);
    }
}
