package fr.epsi.atelier_persistance.controllers.view;

import fr.epsi.atelier_persistance.entities.Livre;
import fr.epsi.atelier_persistance.repositories.LivreRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/livres")
public class LivreViewController {

    private final LivreRepository livreRepository;

    public LivreViewController(LivreRepository livreRepository) {
        this.livreRepository = livreRepository;
    }

    @GetMapping
    public String getAllLivres(Model model) {
        model.addAttribute("livres", livreRepository.findAll());
        return "livres";
    }

    @GetMapping("/add")
    public String addLivreForm(Model model) {
        model.addAttribute("livre", new Livre());
        return "add-livre";
    }

    @PostMapping("/add")
    public String addLivreSubmit(Livre livre) {
        livreRepository.save(livre);
        return "redirect:/livres";
    }
}