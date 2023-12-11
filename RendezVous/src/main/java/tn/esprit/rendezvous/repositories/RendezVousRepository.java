package tn.esprit.rendezvous.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.rendezvous.entities.Rendezvous;

import java.util.List;

public interface RendezVousRepository extends JpaRepository<Rendezvous, Integer> {
    List<Rendezvous> findByMatriculeMedecin(String matriculeMedecin);
    List<Rendezvous> findByNumSecuriteSocialePatient(String numSecuriteSocialePatient);
}
