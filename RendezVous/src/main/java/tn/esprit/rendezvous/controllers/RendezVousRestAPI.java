package tn.esprit.rendezvous.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.rendezvous.entities.Rendezvous;
import tn.esprit.rendezvous.services.RendezVousServices;

import java.util.List;

@RestController
@RequestMapping("/rendezvouses")
@CrossOrigin(origins = "http://localhost:3001")
public class RendezVousRestAPI {

    @Autowired
    private RendezVousServices rendezVousService;

    @PostMapping("/add/{matriculeMedecin}/{numSecuriteSocialePatient}")
    public Rendezvous addRendezVous(@RequestBody Rendezvous rendezVous, @PathVariable String matriculeMedecin, @PathVariable String numSecuriteSocialePatient) {
        return rendezVousService.saveRendezVous(rendezVous, matriculeMedecin, numSecuriteSocialePatient);
    }

    @PutMapping("/ConfirmeRendezVous/{id}")
    public Rendezvous ConfirmeRendezVous(@PathVariable int id) {
        return rendezVousService.ConfirmeRendezVous(id);
    }

    @PutMapping("/AnnuleRendezVous/{id}")
    public Rendezvous AnnuleRendezVous(@PathVariable int id) {
        return rendezVousService.AnnuleRendezVous(id);
    }

    @GetMapping("/all")
    public List<Rendezvous> getAllRendezVous() {
        return rendezVousService.getAllRendezVous();
    }

    @GetMapping("/allRendezVousMedecin/{matriculeMedecin}")
    public List<Rendezvous> getAllRendezVousMedecin(@PathVariable String matriculeMedecin) {
        return rendezVousService.getAllRendezVousMedecin(matriculeMedecin);
    }

    @GetMapping("/allRendezVousPatient/{numSecuriteSocialePatient}")
    public List<Rendezvous> getAllRendezVousPatient(@PathVariable String numSecuriteSocialePatient) {
        return rendezVousService.getAllRendezVousPatient(numSecuriteSocialePatient);
    }
}
