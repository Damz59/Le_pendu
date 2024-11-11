// Tableau contenant des mots de 14 lettres à deviner
const motsÀDeviner = [
    "INFORMATIQUE", 
    "PROGRAMMATION", 
    "DEVELOPPEMENT", 
    "APPLICATIONS", 
    "EXCEPTIONNEL", 
    "CONCEPTIONNE", 
    "ARCHITECTURE"
];

// Variables pour le jeu
let motÀDeviner;
let motAffiché;
let compteurCoups;
let compteurErreurs;

// Fonction pour choisir un mot aléatoire
function obtenirMotAleatoire() {
    const indexAleatoire = Math.floor(Math.random() * motsÀDeviner.length);
    return motsÀDeviner[indexAleatoire];
}

// Initialiser le jeu
function initialiserJeu() {
    motÀDeviner = obtenirMotAleatoire();
    motAffiché = "_ ".repeat(motÀDeviner.length).trim();
    compteurCoups = 0;
    compteurErreurs = 0;

    // Afficher les underscores dans l'élément approprié
    document.getElementById('wordToGuess').innerText = motAffiché;

    // Réinitialiser les compteurs
    mettreÀJourCompteurs();

    // Réinitialiser la liste des lettres disponibles
    const select = document.getElementById('alphabetSelect');
    for (let i = 0; i < select.options.length; i++) {
        select.options[i].style.display = 'block'; // Afficher toutes les options
    }
}

// Mise à jour des compteurs
function mettreÀJourCompteurs() {
    document.getElementById('compteurCoups').innerText = compteurCoups;
    document.getElementById('compteurErreurs').innerText = compteurErreurs;
}

// Fonction pour mettre à jour l'affichage du mot
function mettreÀJourMotAffiché(lettre) {
    let nouveauMotAffiché = "";
    for (let i = 0; i < motÀDeviner.length; i++) {
        if (motÀDeviner[i] === lettre) {
            nouveauMotAffiché += lettre + " ";
        } else {
            nouveauMotAffiché += motAffiché[i * 2] + " ";
        }
    }
    motAffiché = nouveauMotAffiché.trim();
    document.getElementById('wordToGuess').innerText = motAffiché;
}

// Fonction pour supprimer une option de la liste déroulante
function supprimerOption(lettre) {
    const select = document.getElementById('alphabetSelect');
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === `- ${lettre} -`) {
            select.remove(i);
            break;
        }
    }
}

// Fonction pour vérifier si la partie est terminée
function vérifierFinPartie() {
    if (!motAffiché.includes('_')) {
        alert('Félicitations ! Vous avez deviné le mot : ' + motÀDeviner);
        return true;
    }
    
    if (compteurErreurs >= 7) {
        alert('Partie perdue ! Le mot était : ' + motÀDeviner);
        return true;
    }
    
    return false;
}

// Fonction pour mettre à jour l'image du pendu
function updatePenduImage() {
    if (compteurErreurs <= 8) { // On a 9 images de pendu (01 à 09)
        document.getElementById('penduImage').innerHTML = `<img src="./image/pendu0${compteurErreurs + 1}.jpg" alt="Pendu ${compteurErreurs + 1}" style='width: 200px; height: auto; border: 2px solid #000;'>`;
    }
}

// Écouteur d'événements pour le bouton Valider
document.getElementById('validateButton').addEventListener('click', function() {
    const selectElement = document.getElementById('alphabetSelect');
    
	// Récupérer la lettre sélectionnée sans tirets ni espaces
	const lettreSélectionnée = selectElement.value.replace(/[-\s]/g, '');

	if (lettreSélectionnée) {
		compteurCoups++;

		if (motÀDeviner.includes(lettreSélectionnée)) {
			mettreÀJourMotAffiché(lettreSélectionnée);
		} else {
			compteurErreurs++;
			updatePenduImage(); // Mettre à jour l'image du pendu en cas d'erreur
		}

		mettreÀJourCompteurs();
		supprimerOption(lettreSélectionnée);
		selectElement.selectedIndex = 0; // Réinitialiser la sélection

		if (vérifierFinPartie()) {
			// Réinitialiser le jeu ou désactiver les contrôles si nécessaire
		}
	} else {
		alert('Veuillez sélectionner une lettre.');
	}
});

// Écouteur d'événements pour le bouton Reset
document.getElementById('resetButton').addEventListener('click', function() {
    initialiserJeu(); // Réinitialiser le jeu lorsque le bouton Reset est cliqué
});

// Initialiser le jeu au chargement de la page
window.onload = initialiserJeu;
