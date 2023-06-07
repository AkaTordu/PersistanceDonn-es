package fr.epsi.atelier_persistance.repositories;

import fr.epsi.atelier_persistance.entities.Livre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LivreRepository extends JpaRepository<Livre, Long> {
    List<Livre> findByAuteurNom(String nomAuteur);
}