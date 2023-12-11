package tn.esprit.cabinet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.cabinet.entities.Cabinet;

public interface CabinetRepository extends JpaRepository<Cabinet, Integer> {
    Cabinet findByMatriculeMedecin(String matriculeMedecin);
}
