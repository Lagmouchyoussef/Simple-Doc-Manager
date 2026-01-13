// Variables globales
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
console.log('Contacts loaded from localStorage:', contacts);

// Éléments DOM
const nomInput = document.getElementById('nameInput');
const numInput = document.getElementById('phoneInput');
const ajouterBtn = document.getElementById('addBtn');
const rechercheInput = document.getElementById('searchInput');
const rechercherBtn = document.getElementById('searchBtn');
const listeContacts = document.getElementById('contactsBody');
const messageDiv = document.getElementById('messageBox');
const clearFormBtn = document.getElementById('clearFormBtn');
const resetSearchBtn = document.getElementById('resetSearchBtn');
const sortBtn = document.getElementById('sortBtn');
const clearAllBtn = document.getElementById('clearAllBtn');

console.log('DOM elements found:', {
  nomInput,
  numInput,
  ajouterBtn,
  rechercheInput,
  rechercherBtn,
  listeContacts,
  messageDiv
});

// Initialisation
document.addEventListener('DOMContentLoaded', afficherContacts);

// Fonction de validation
function validerContact(nom, num) {
    // Validation du nom
    if (!nom || nom.trim().length < 2) {
        throw new Error('Le nom doit contenir au moins 2 caractères.');
    }

    // Validation du numéro (10 chiffres)
    const numRegex = /^\d{10}$/;
    if (!numRegex.test(num)) {
        throw new Error('Le numéro doit contenir exactement 10 chiffres.');
    }

    // Validation du préfixe
    const prefixeValide = ['05', '06', '07'];
    const prefixe = num.substring(0, 2);
    if (!prefixeValide.includes(prefixe)) {
        throw new Error('Le numéro doit commencer par 05, 06 ou 07.');
    }

    // Vérification si le contact existe déjà
    const existe = contacts.some(contact => 
        contact.nom.toLowerCase() === nom.toLowerCase() || 
        contact.num === num
    );
    if (existe) {
        throw new Error('Ce contact existe déjà.');
    }

    return true;
}

// Fonction pour afficher un message
function afficherMessage(texte, type = 'erreur') {
    console.log('Afficher message:', texte, type);
    messageDiv.textContent = texte;
    messageDiv.className = 'message';
    if (type === 'erreur') {
        messageDiv.classList.add('error');
    } else {
        messageDiv.classList.add('success');
    }
    messageDiv.classList.remove('hidden');

    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, 3000);
}

// Fonction pour ajouter un contact
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Add contact form submitted');
    try {
        const nom = nomInput.value.trim();
        const num = numInput.value.trim();

        validerContact(nom, num);

        // Ajouter le contact
        const nouveauContact = { nom: nom.toUpperCase(), num };
        contacts.push(nouveauContact);
        localStorage.setItem('contacts', JSON.stringify(contacts));

        // Mettre à jour l'affichage
        afficherContacts();

        // Réinitialiser les champs
        nomInput.value = '';
        numInput.value = '';

        afficherMessage('Contact added successfully!', 'succes');
    } catch (error) {
        afficherMessage(error.message, 'erreur');
    }
});

// Fonction pour afficher tous les contacts
function afficherContacts() {
    console.log('Afficher contacts called, contacts:', contacts);
    listeContacts.innerHTML = '';

    document.getElementById('count').textContent = contacts.length;

    if (contacts.length === 0) {
        // Hide table or show empty state, but since HTML has emptyState, perhaps toggle
        document.getElementById('emptyState').style.display = 'block';
        return;
    }

    document.getElementById('emptyState').style.display = 'none';

    contacts.forEach((contact, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${contact.nom}</td>
            <td>${contact.num}</td>
            <td><button class="supprimer-btn" data-index="${index}">Delete</button></td>
        `;

        listeContacts.appendChild(tr);
    });

    // Ajouter les événements de suppression
    document.querySelectorAll('.supprimer-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            supprimerContact(index);
        });
    });
}

// Fonction pour rechercher un contact
rechercherBtn.addEventListener('click', () => {
    console.log('Search button clicked');
    const recherche = rechercheInput.value.trim().toUpperCase();

    if (!recherche) {
        afficherMessage('Please enter a name to search.', 'erreur');
        return;
    }

    const contactTrouve = contacts.find(contact =>
        contact.nom.toUpperCase().includes(recherche)
    );

    const searchResult = document.getElementById('searchResult');

    if (contactTrouve) {
        searchResult.innerHTML = `
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${contactTrouve.nom}</td>
                        <td>${contactTrouve.num}</td>
                    </tr>
                </tbody>
            </table>
        `;
        searchResult.classList.remove('hidden');
        afficherMessage('Contact found!', 'succes');
    } else {
        searchResult.innerHTML = '<p>No contact found.</p>';
        searchResult.classList.remove('hidden');
        afficherMessage('Contact not found.', 'erreur');
    }
});

// Fonction pour supprimer un contact
function supprimerContact(index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
        contacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        afficherContacts();
        afficherMessage('Contact supprimé avec succès !', 'succes');
    }
}

// Ajout avec la touche Entrée
nomInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        ajouterBtn.click();
    }
});

numInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        ajouterBtn.click();
    }
});

rechercheInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        rechercherBtn.click();
    }
});

// Clear form
clearFormBtn.addEventListener('click', () => {
    nomInput.value = '';
    numInput.value = '';
});

// Reset search
resetSearchBtn.addEventListener('click', () => {
    rechercheInput.value = '';
    document.getElementById('searchResult').classList.add('hidden');
    afficherContacts();
});

// Sort contacts
sortBtn.addEventListener('click', () => {
    contacts.sort((a, b) => a.nom.localeCompare(b.nom));
    localStorage.setItem('contacts', JSON.stringify(contacts));
    afficherContacts();
});

// Clear all contacts
clearAllBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all contacts?')) {
        contacts = [];
        localStorage.setItem('contacts', JSON.stringify(contacts));
        afficherContacts();
        afficherMessage('All contacts deleted.', 'succes');
    }
});