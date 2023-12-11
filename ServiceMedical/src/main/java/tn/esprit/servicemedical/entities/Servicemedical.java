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

    private int idCabinet;

    public Servicemedical() {
    }

    public Servicemedical(String nom, String description, int idCabinet) {
        this.nom = nom;
        this.description = description;
        this.idCabinet = idCabinet;
    }

    public Servicemedical(int id, String nom, String description, int idCabinet) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.idCabinet = idCabinet;
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

    public int getIdCabinet() {
        return idCabinet;
    }

    public void setIdCabinet(int idCabinet) {
        this.idCabinet = idCabinet;
    }
}
