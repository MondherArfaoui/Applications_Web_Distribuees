package tn.esprit.servicemedical.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.servicemedical.entities.Servicemedical;
import tn.esprit.servicemedical.services.ServiceMedicalServices;

import java.util.List;

@RestController
@RequestMapping("/servicemedicals")
public class ServiceMedicalRestAPI {

    @Autowired
    private ServiceMedicalServices serviceMedicalService;

    @PostMapping("/add")
    public Servicemedical addServiceMedical(@RequestBody Servicemedical serviceMedical, @RequestParam int idCabinet) {
        return serviceMedicalService.saveServiceMedical(serviceMedical, idCabinet);
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

    @GetMapping("/by-cabinet/{idCabinet}")
    public List<Servicemedical> getServiceMedicalByIdCabinet(@PathVariable int idCabinet) {
        return serviceMedicalService.getServiceMedicalByIdCabinet(idCabinet);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteServiceMedical(@PathVariable int id) {
        serviceMedicalService.deleteServiceMedicalById(id);
    }
}
