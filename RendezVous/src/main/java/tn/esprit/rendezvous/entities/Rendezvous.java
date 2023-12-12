package tn.esprit.rendezvous.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
public class Rendezvous implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalDate dateRV;

    @Enumerated(EnumType.STRING)
    private Statut statut;

    private String matriculeMedecin;
    private String numSecuriteSocialePatient;


    public Rendezvous() {
    }

    public Rendezvous(LocalDate dateRV, Statut statut, String matriculeMedecin, String numSecuriteSocialePatient) {
        this.dateRV = dateRV;
        this.statut = statut;
        this.matriculeMedecin = matriculeMedecin;
        this.numSecuriteSocialePatient = numSecuriteSocialePatient;
    }

    public Rendezvous(int id, LocalDate dateRV, Statut statut, String matriculeMedecin, String numSecuriteSocialePatient) {
        this.id = id;
        this.dateRV = dateRV;
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

    public LocalDate getDateRV() {
        return dateRV;
    }

    public void setDateRV(LocalDate dateRV) {
        this.dateRV = dateRV;
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
