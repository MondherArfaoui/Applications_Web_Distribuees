package tn.esprit.article.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
public class Article implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String titre;
    private String description;
    private LocalDate datePublication;

    private String matriculeMedecin;

    public Article() {
    }

    public Article(String titre, String description, LocalDate datePublication, String matriculeMedecin) {
        this.titre = titre;
        this.description = description;
        this.datePublication = datePublication;
        this.matriculeMedecin = matriculeMedecin;
    }

    public Article(int id, String titre, String description, LocalDate datePublication, String matriculeMedecin) {
        this.id = id;
        this.titre = titre;
        this.description = description;
        this.datePublication = datePublication;
        this.matriculeMedecin = matriculeMedecin;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDatePublication() {
        return datePublication;
    }

    public void setDatePublication(LocalDate datePublication) {
        this.datePublication = datePublication;
    }

    public String getMatriculeMedecin() {
        return matriculeMedecin;
    }

    public void setMatriculeMedecin(String matriculeMedecin) {
        this.matriculeMedecin = matriculeMedecin;
    }
}
