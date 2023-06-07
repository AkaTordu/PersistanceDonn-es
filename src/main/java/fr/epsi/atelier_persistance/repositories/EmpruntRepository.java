package fr.epsi.atelier_persistance.repositories;

import fr.epsi.atelier_persistance.entities.Emprunt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface EmpruntRepository extends JpaRepository<Emprunt, Long> {
    long countByDateEmpruntBetween(Date start, Date end);
    List<Emprunt> findByDateRetourIsNull();
    long countByLivreId(Long livreId);
}