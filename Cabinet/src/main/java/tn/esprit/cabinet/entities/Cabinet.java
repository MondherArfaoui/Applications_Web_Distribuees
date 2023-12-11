package tn.esprit.cabinet.entities;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Cabinet implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nom;
    private String adresse;
    private String telephone;

    @Column(unique = true)
    private String matriculeMedecin;

    public Cabinet() {
    }

    public Cabinet(String nom, String adresse, String telephone, String matriculeMedecin) {
        this.nom = nom;
        this.adresse = adresse;
        this.telephone = telephone;
        this.matriculeMedecin = matriculeMedecin;
    }

    public Cabinet(int id, String nom, String adresse, String telephone, String matriculeMedecin) {
        this.id = id;
        this.nom = nom;
        this.adresse = adresse;
        this.telephone = telephone;
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

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getMatriculeMedecin() {
        return matriculeMedecin;
    }

    public void setMatriculeMedecin(String matriculeMedecin) {
        this.matriculeMedecin = matriculeMedecin;
    }
}
