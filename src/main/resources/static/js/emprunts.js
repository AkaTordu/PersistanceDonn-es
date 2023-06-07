// Fonction pour afficher la liste de tous les emprunts
function getAllEmprunts() {
    fetch('/api/emprunts')
    .then(response => response.json())
    .then(data => {
        console.log('Liste des emprunts:', data);
        displayEmprunts(data);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération de la liste des emprunts:', error);
    });
}

// Fonction pour afficher la liste des emprunts dans le tableau
function displayEmprunts(emprunts) {
    const empruntsBody = document.getElementById('emprunts-body');
    empruntsBody.innerHTML = '';

    emprunts.forEach(emprunt => {
        const tr = document.createElement('tr');
        const idTd = document.createElement('td');
        idTd.textContent = emprunt.id;
        const dateEmpruntTd = document.createElement('td');
        dateEmpruntTd.textContent = emprunt.dateEmprunt;
        const dateFinPrevueTd = document.createElement('td');
        dateFinPrevueTd.textContent = emprunt.dateFinPrevue;
        const dateRetourTd = document.createElement('td');
        dateRetourTd.textContent = emprunt.dateRetour;
        const adherentTd = document.createElement('td');
        adherentTd.textContent = `${emprunt.adherent.nom} ${emprunt.adherent.prenom}`;
        const livreTd = document.createElement('td');
        livreTd.textContent = emprunt.livre.titre;
        tr.appendChild(idTd);
        tr.appendChild(dateEmpruntTd);
        tr.appendChild(dateFinPrevueTd);
        tr.appendChild(dateRetourTd);
        tr.appendChild(adherentTd);
        tr.appendChild(livreTd);
        empruntsBody.appendChild(tr);
    });
}

// Fonction pour compter le nombre d'emprunts sur une plage de dates donnée
function countEmpruntsByDateRange(event) {
    event.preventDefault();

    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    fetch(`/api/emprunts/count?start=${startDate}&end=${endDate}`)
    .then(response => response.json())
    .then(data => {
        console.log('Nombre d\'emprunts sur la plage de dates donnée:', data);
        displayCountEmpruntsByDateRange(data);
    })
    .catch(error => {
        console.error('Erreur lors du comptage des emprunts sur la plage de dates donnée:', error);
    });
}

// Fonction pour afficher le nombre d'emprunts sur une plage de dates donnée
function displayCountEmpruntsByDateRange(count) {
    const countResultsDiv = document.getElementById('count-emprunts-results');
    countResultsDiv.innerHTML = '';

    const p = document.createElement('p');
    p.textContent = `Nombre d'emprunts sur la plage de dates donnée: ${count}`;
    countResultsDiv.appendChild(p);
}

// Fonction pour compter le nombre d'emprunts par livre
function countEmpruntsByLivre(event) {
    event.preventDefault();

    const livreId = document.getElementById('livre-id').value;

    fetch(`/api/emprunts/countByLivre/${livreId}`)
    .then(response => response.json())
    .then(data => {
        console.log('Nombre d\'emprunts par livre:', data);
        displayCountEmpruntsByLivre(data);
    })
    .catch(error => {
        console.error('Erreur lors du comptage des emprunts par livre:', error);
    });
}

// Fonction pour afficher le nombre d'emprunts par livre
function displayCountEmpruntsByLivre(count) {
    const countResultsDiv = document.getElementById('count-emprunts-by-livre-results');
    countResultsDiv.innerHTML = '';

    const p = document.createElement('p');
    p.textContent = `Nombre d'emprunts pour le livre: ${count}`;
    countResultsDiv.appendChild(p);
}

// Fonction pour afficher la liste des emprunts en cours
function getEmpruntsEnCours() {
    fetch('/api/emprunts/enCours')
    .then(response => response.json())
    .then(data => {
        console.log('Liste des emprunts en cours:', data);
        displayEmpruntsEnCours(data);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération de la liste des emprunts en cours:', error);
    });
}

// Fonction pour afficher la liste des emprunts en cours
function displayEmpruntsEnCours(emprunts) {
    const empruntsEnCoursDiv = document.getElementById('emprunts-en-cours');
    empruntsEnCoursDiv.innerHTML = '';

    if (emprunts.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'Aucun emprunt en cours.';
        empruntsEnCoursDiv.appendChild(message);
    } else {
        const ul = document.createElement('ul');
        emprunts.forEach(emprunt => {
            const li = document.createElement('li');
            li.textContent = `ID: ${emprunt.id} - ${emprunt.livre.titre} - ${emprunt.adherent.nom} ${emprunt.adherent.prenom}`;
            ul.appendChild(li);
        });
        empruntsEnCoursDiv.appendChild(ul);
    }
}

// Appel initial pour afficher la liste des emprunts
getAllEmprunts();
getEmpruntsEnCours();

// Écouteurs d'événements
document.getElementById('count-emprunts-form').addEventListener('submit', countEmpruntsByDateRange);
document.getElementById('count-emprunts-by-livre-form').addEventListener('submit', countEmpruntsByLivre);