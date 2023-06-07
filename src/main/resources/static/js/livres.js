// Fonction pour ajouter un livre
function addLivre(event) {
    event.preventDefault();

    const titre = document.getElementById('titre').value;
    const auteur = document.getElementById('auteur').value;
    const categorie = document.getElementById('categorie').value;

    const livre = {
        titre: titre,
        auteur: {
            nom: auteur
        },
        categorie: {
            nom: categorie
        }
    };

    fetch('/api/livres', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(livre)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Livre ajouté avec succès:', data);
        document.getElementById('titre').value = '';
        document.getElementById('auteur').value = '';
        document.getElementById('categorie').value = '';
        getAllLivres();
    })
    .catch(error => {
        console.error('Erreur lors de l\'ajout du livre:', error);
    });
}

// Fonction pour supprimer un livre
function deleteLivre(event) {
    event.preventDefault();

    const livreId = document.getElementById('livre-id').value;

    fetch(`/api/livres/${livreId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log('Livre supprimé avec succès');
            document.getElementById('livre-id').value = '';
            getAllLivres();
        } else {
            console.error('Erreur lors de la suppression du livre:', response.status);
        }
    })
    .catch(error => {
        console.error('Erreur lors de la suppression du livre:', error);
    });
}

// Fonction pour rechercher des livres par auteur
function searchLivresByAuteur(event) {
    event.preventDefault();

    const auteur = document.getElementById('auteur').value;

    fetch(`/api/livres/search?auteur=${auteur}`)
    .then(response => response.json())
    .then(data => {
        console.log('Résultats de la recherche:', data);
        displayLivresSearchResults(data);
    })
    .catch(error => {
        console.error('Erreur lors de la recherche des livres par auteur:', error);
    });
}

// Fonction pour afficher les résultats de la recherche de livres par auteur
function displayLivresSearchResults(livres) {
    const searchResultsDiv = document.getElementById('livres-search-results');
    searchResultsDiv.innerHTML = '';

    if (livres.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'Aucun livre trouvé pour cet auteur.';
        searchResultsDiv.appendChild(message);
    } else {
        const ul = document.createElement('ul');
        livres.forEach(livre => {
            const li = document.createElement('li');
            li.textContent = `${livre.titre} - ${livre.auteur.nom} - ${livre.categorie.nom}`;
            ul.appendChild(li);
        });
        searchResultsDiv.appendChild(ul);
    }
}

// Fonction pour afficher la liste de tous les livres
function getAllLivres() {
    fetch('/api/livres')
    .then(response => response.json())
    .then(data => {
        console.log('Liste des livres:', data);
        displayLivres(data);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération de la liste des livres:', error);
    });
}

// Fonction pour afficher la liste des livres dans le tableau
function displayLivres(livres) {
    const livresBody = document.getElementById('livres-body');
    livresBody.innerHTML = '';

    livres.forEach(livre => {
        const tr = document.createElement('tr');
        const titreTd = document.createElement('td');
        titreTd.textContent = livre.titre;
        const auteurTd = document.createElement('td');
        auteurTd.textContent = livre.auteur.nom;
        const categorieTd = document.createElement('td');
        categorieTd.textContent = livre.categorie.nom;
        const actionsTd = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.addEventListener('click', () => deleteLivreById(livre.id));
        actionsTd.appendChild(deleteButton);
        tr.appendChild(titreTd);
        tr.appendChild(auteurTd);
        tr.appendChild(categorieTd);
        tr.appendChild(actionsTd);
        livresBody.appendChild(tr);
    });
}

// Fonction pour supprimer un livre par son ID
function deleteLivreById(livreId) {
    fetch(`/api/livres/${livreId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log('Livre supprimé avec succès');
            getAllLivres();
        } else {
            console.error('Erreur lors de la suppression du livre:', response.status);
        }
    })
    .catch(error => {
        console.error('Erreur lors de la suppression du livre:', error);
    });
}

// Appel initial pour afficher la liste des livres
getAllLivres();

// Écouteurs d'événements
document.getElementById('add-livre-form').addEventListener('submit', addLivre);
document.getElementById('delete-livre-form').addEventListener('submit', deleteLivre);
document.getElementById('search-livres-form').addEventListener('submit', searchLivresByAuteur);