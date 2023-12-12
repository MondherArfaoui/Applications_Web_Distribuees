package tn.esprit.servicemedical.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
public class Servicemedical implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nom;
    private String description;

    private String matriculeMedecin;

    public Servicemedical() {
    }

    public Servicemedical(String nom, String description, String matriculeMedecin) {
        this.nom = nom;
        this.description = description;
        this.matriculeMedecin = matriculeMedecin;
    }

    public Servicemedical(int id, String nom, String description, String matriculeMedecin) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.matriculeMedecin = matriculeMedecin;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMatriculeMedecin() {
        return matriculeMedecin;
    }

    public void setMatriculeMedecin(String matriculeMedecin) {
        this.matriculeMedecin = matriculeMedecin;
    }
}
