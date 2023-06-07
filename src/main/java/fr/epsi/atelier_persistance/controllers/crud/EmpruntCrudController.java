package fr.epsi.atelier_persistance.controllers.crud;

import fr.epsi.atelier_persistance.entities.Emprunt;
import fr.epsi.atelier_persistance.repositories.EmpruntRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/emprunts")
public class EmpruntCrudController {

    private final EmpruntRepository empruntRepository;

    public EmpruntCrudController(EmpruntRepository empruntRepository) {
        this.empruntRepository = empruntRepository;
    }

    @GetMapping("/count")
    public long countEmprunts(@RequestParam Date start, @RequestParam Date end) {
        return empruntRepository.countByDateEmpruntBetween(start, end);
    }

    @GetMapping("/encours")
    public List<Emprunt> getEmpruntsEnCours() {
        return empruntRepository.findByDateRetourIsNull();
    }

    @GetMapping("/count/{livreId}")
    public long countEmpruntsByLivre(@PathVariable Long livreId) {
        return empruntRepository.countByLivreId(livreId);
    }
}