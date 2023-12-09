package tn.esprit.rendezvous.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
public class Rendezvous implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalDateTime dateDebut;
    private LocalDateTime dateFin;

    @Enumerated(EnumType.STRING)
    private Statut statut;

    private String matriculeMedecin;
    private String numSecuriteSocialePatient;


    public Rendezvous() {
    }

    public Rendezvous(LocalDateTime dateDebut, LocalDateTime dateFin, Statut statut, String matriculeMedecin, String numSecuriteSocialePatient) {
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.statut = statut;
        this.matriculeMedecin = matriculeMedecin;
        this.numSecuriteSocialePatient = numSecuriteSocialePatient;
    }

    public Rendezvous(int id, LocalDateTime dateDebut, LocalDateTime dateFin, Statut statut, String matriculeMedecin, String numSecuriteSocialePatient) {
        this.id = id;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.statut = statut;
        this.matriculeMedecin = matriculeMedecin;
        this.numSecuriteSocialePatient = numSecuriteSocialePatient;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDateTime getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDateTime dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDateTime getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDateTime dateFin) {
        this.dateFin = dateFin;
    }

    public Statut getStatut() {
        return statut;
    }

    public void setStatut(Statut statut) {
        this.statut = statut;
    }

    public String getMatriculeMedecin() {
        return matriculeMedecin;
    }

    public void setMatriculeMedecin(String matriculeMedecin) {
        this.matriculeMedecin = matriculeMedecin;
    }

    public String getNumSecuriteSocialePatient() {
        return numSecuriteSocialePatient;
    }

    public void setNumSecuriteSocialePatient(String numSecuriteSocialePatient) {
        this.numSecuriteSocialePatient = numSecuriteSocialePatient;
    }
}
