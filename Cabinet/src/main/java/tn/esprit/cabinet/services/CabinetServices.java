package tn.esprit.cabinet.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.cabinet.entities.Cabinet;
import tn.esprit.cabinet.repositories.CabinetRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class CabinetServices {

    @Autowired
    private CabinetRepository cabinetRepository;

    public Cabinet saveCabinet(Cabinet cabinet, String matriculeMedecin) {
        cabinet.setMatriculeMedecin(matriculeMedecin);
        return cabinetRepository.save(cabinet);
    }

    public Cabinet updateCabinet(int id, Cabinet cabinet) {
        if (cabinetRepository.findById(id).isPresent()) {
            Cabinet existingCabinet = cabinetRepository.findById(id).get();
            existingCabinet.setNom(cabinet.getNom());
            existingCabinet.setAdresse(cabinet.getAdresse());
            existingCabinet.setTelephone(cabinet.getTelephone());
            existingCabinet.setMatriculeMedecin(cabinet.getMatriculeMedecin());
            return cabinetRepository.save(existingCabinet);
        } else
            return null;
    }

    public List<Cabinet> getAllCabinets() {
        return cabinetRepository.findAll();
    }

    public Cabinet getCabinetById(int id) {
        return cabinetRepository.findById(id).orElse(null);
    }

    public Cabinet getCabinetByMedecin(String matriculeMedecin) {
        return cabinetRepository.findByMatriculeMedecin(matriculeMedecin);
    }

    public void deleteCabinetById(int id) {
        cabinetRepository.deleteById(id);
    }
}
