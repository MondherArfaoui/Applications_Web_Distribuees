package tn.esprit.servicemedical.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.servicemedical.entities.Servicemedical;
import tn.esprit.servicemedical.repositories.ServiceMedicalRepository;

import java.util.List;

@Service
public class ServiceMedicalServices {

    @Autowired
    private ServiceMedicalRepository serviceMedicalRepository;

    public Servicemedical saveServiceMedical(Servicemedical serviceMedical, String matriculeMedecin) {
        serviceMedical.setMatriculeMedecin(matriculeMedecin);
        return serviceMedicalRepository.save(serviceMedical);
    }

    public Servicemedical updateServiceMedical(int id, Servicemedical serviceMedical) {
        if (serviceMedicalRepository.findById(id).isPresent()) {
            Servicemedical existingServiceMedical = serviceMedicalRepository.findById(id).get();
            existingServiceMedical.setNom(serviceMedical.getNom());
            existingServiceMedical.setDescription(serviceMedical.getDescription());
            existingServiceMedical.setMatriculeMedecin(serviceMedical.getMatriculeMedecin());
            return serviceMedicalRepository.save(existingServiceMedical);
        } else
            return null;
    }

    public List<Servicemedical> getAllServicesMedicals() {
        return serviceMedicalRepository.findAll();
    }

    public Servicemedical getServiceMedicalById(int id) {
        return serviceMedicalRepository.findById(id).orElse(null);
    }

    public List<Servicemedical> getServiceMedicalByIdCabinet(String matriculeMedecin) {
        return serviceMedicalRepository.findByMatriculeMedecin(matriculeMedecin);
    }

    public void deleteServiceMedicalById(int id) {
        serviceMedicalRepository.deleteById(id);
    }
}
