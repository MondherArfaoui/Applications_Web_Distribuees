package tn.esprit.servicemedical.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.servicemedical.entities.Servicemedical;

import java.util.List;

public interface ServiceMedicalRepository extends JpaRepository<Servicemedical, Integer> {
    List<Servicemedical> findByMatriculeMedecin(String matriculeMedecin);
}
