package fr.epsi.atelier_persistance.controllers.crud;

import fr.epsi.atelier_persistance.entities.Livre;
import fr.epsi.atelier_persistance.repositories.LivreRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livres")
public class LivreCrudController {

    private final LivreRepository livreRepository;

    public LivreCrudController(LivreRepository livreRepository) {
        this.livreRepository = livreRepository;
    }

    @GetMapping
    public String getAllLivres(Model model) {
    List<Livre> livres = livreRepository.findAll();
    model.addAttribute("livres", livres);
    return "livres";
    }
    
    @GetMapping("/search")
    public List<Livre> searchByAuteur(@RequestParam String auteur) {
        return livreRepository.findByAuteurNom(auteur);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livre> getLivreById(@PathVariable Long id) {
        return livreRepository.findById(id)
                .map(livre -> ResponseEntity.ok().body(livre))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Livre createLivre(@RequestBody Livre livre) {
        return livreRepository.save(livre);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Livre> updateLivre(@PathVariable Long id, @RequestBody Livre livreDetails) {
        return livreRepository.findById(id)
                .map(livre -> {
                    livre.setTitre(livreDetails.getTitre());
                    livre.setAuteur(livreDetails.getAuteur());
                    livre.setCategorie(livreDetails.getCategorie());
                    Livre updatedLivre = livreRepository.save(livre);
                    return ResponseEntity.ok().body(updatedLivre);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLivre(@PathVariable Long id) {
        return livreRepository.findById(id)
                .map(livre -> {
                    livre.setDeleted(true);
                    livreRepository.save(livre);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
