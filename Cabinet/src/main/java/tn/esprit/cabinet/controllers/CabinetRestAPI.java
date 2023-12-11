package tn.esprit.cabinet.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.cabinet.entities.Cabinet;
import tn.esprit.cabinet.services.CabinetServices;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
@RequestMapping("/cabinets")
public class CabinetRestAPI {

    @Autowired
    private CabinetServices cabinetService;

    @PostMapping("/add/{matriculeMedecin}")
    public Cabinet addCabinet(@RequestBody Cabinet cabinet, @PathVariable String matriculeMedecin) {
        return cabinetService.saveCabinet(cabinet, matriculeMedecin);
    }

    @PutMapping("/update/{id}")
    public Cabinet updateCabinet(@PathVariable int id, @RequestBody Cabinet cabinet) {
        return cabinetService.updateCabinet(id, cabinet);
    }

    @GetMapping("/all")
    public List<Cabinet> getAllCabinets() {
        return cabinetService.getAllCabinets();
    }

    @GetMapping("/{id}")
    public Cabinet getCabinetById(@PathVariable int id) {
        return cabinetService.getCabinetById(id);
    }

    @GetMapping("/by-medecin/{matriculeMedecin}")
    public Cabinet getCabinetByMedecin(@PathVariable String matriculeMedecin) {
        return cabinetService.getCabinetByMedecin(matriculeMedecin);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCabinet(@PathVariable int id) {
        cabinetService.deleteCabinetById(id);
    }
}
