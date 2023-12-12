package tn.esprit.servicemedical.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.servicemedical.entities.Servicemedical;
import tn.esprit.servicemedical.services.ServiceMedicalServices;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
@RequestMapping("/servicemedicals")
public class ServiceMedicalRestAPI {

    @Autowired
    private ServiceMedicalServices serviceMedicalService;

    @PostMapping("/add/{matriculeMedecin}")
    public Servicemedical addServiceMedical(@RequestBody Servicemedical serviceMedical, @PathVariable String matriculeMedecin) {
        return serviceMedicalService.saveServiceMedical(serviceMedical, matriculeMedecin);
    }

    @PutMapping("/update/{id}")
    public Servicemedical updateServiceMedical(@PathVariable int id, @RequestBody Servicemedical serviceMedical) {
        return serviceMedicalService.updateServiceMedical(id, serviceMedical);
    }

    @GetMapping("/all")
    public List<Servicemedical> getAllServicesMedicals() {
        return serviceMedicalService.getAllServicesMedicals();
    }

    @GetMapping("/{id}")
    public Servicemedical getServiceMedicalById(@PathVariable int id) {
        return serviceMedicalService.getServiceMedicalById(id);
    }

    @GetMapping("/by-medecin/{matriculeMedecin}")
    public List<Servicemedical> getServiceMedicalByIdCabinet(@PathVariable String matriculeMedecin) {
        return serviceMedicalService.getServiceMedicalByIdCabinet(matriculeMedecin);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteServiceMedical(@PathVariable int id) {
        serviceMedicalService.deleteServiceMedicalById(id);
    }
}
