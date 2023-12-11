package tn.esprit.rendezvous.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.rendezvous.entities.Rendezvous;
import tn.esprit.rendezvous.entities.Statut;
import tn.esprit.rendezvous.repositories.RendezVousRepository;

import java.util.List;

@Service
public class RendezVousServices {

    @Autowired
    private RendezVousRepository rendezVousRepository;

    public Rendezvous saveRendezVous(Rendezvous rendezVous, String matriculeMedecin, String numSecuriteSocialePatient) {
        rendezVous.setMatriculeMedecin(matriculeMedecin);
        rendezVous.setNumSecuriteSocialePatient(numSecuriteSocialePatient);
        rendezVous.setStatut(Statut.En_attente);
        return rendezVousRepository.save(rendezVous);
    }

    public Rendezvous ConfirmeRendezVous(int id) {
        if (rendezVousRepository.findById(id).isPresent()) {
            Rendezvous existingRendezVous = rendezVousRepository.findById(id).get();
            existingRendezVous.setStatut(Statut.Confirmé);
            return rendezVousRepository.save(existingRendezVous);
        } else
            return null;
    }

    public Rendezvous AnnuleRendezVous(int id) {
        if (rendezVousRepository.findById(id).isPresent()) {
            Rendezvous existingRendezVous = rendezVousRepository.findById(id).get();
            existingRendezVous.setStatut(Statut.Annulé);
            return rendezVousRepository.save(existingRendezVous);
        } else
            return null;
    }

    public List<Rendezvous> getAllRendezVous() {
        return rendezVousRepository.findAll();
    }

    public List<Rendezvous> getAllRendezVousMedecin(String matriculeMedecin) {
        return rendezVousRepository.findByMatriculeMedecin(matriculeMedecin);
    }

    public List<Rendezvous> getAllRendezVousPatient(String numSecuriteSocialePatient) {
        return rendezVousRepository.findByNumSecuriteSocialePatient(numSecuriteSocialePatient);
    }
}
