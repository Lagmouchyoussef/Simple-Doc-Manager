
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
console.log('Contacts loaded from localStorage:', contacts);


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


document.addEventListener('DOMContentLoaded', afficherContacts);


function validerContact(nom, num) {
    
    if (!nom || nom.trim().length < 2) {
        throw new Error('Le nom doit contenir au moins 2 caractères.');
    }

 
    const numRegex = /^\d{10}$/;
    if (!numRegex.test(num)) {
        throw new Error('Le numéro doit contenir exactement 10 chiffres.');
    }

    const prefixeValide = ['05', '06', '07'];
    const prefixe = num.substring(0, 2);
    if (!prefixeValide.includes(prefixe)) {
        throw new Error('Le numéro doit commencer par 05, 06 ou 07.');
    }

    const existe = contacts.some(contact =>
        contact.nom.toLowerCase() === nom.toLowerCase() ||
        contact.num === num
    );
    if (existe) {
        throw new Error('Ce contact existe déjà.');
    }

    return true;
}

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

const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Add contact form submitted');
    try {
        const nom = nomInput.value.trim();
        const num = numInput.value.trim();

        validerContact(nom, num);

        const nouveauContact = { nom: nom.toUpperCase(), num };
        contacts.push(nouveauContact);
        localStorage.setItem('contacts', JSON.stringify(contacts));

        afficherContacts();

        nomInput.value = '';
        numInput.value = '';

        afficherMessage('Contact added successfully!', 'succes');
    } catch (error) {
        afficherMessage(error.message, 'erreur');
    }
});

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

    document.querySelectorAll('.supprimer-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            supprimerContact(index);
        });
    });
}

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

function supprimerContact(index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
        contacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        afficherContacts();
        afficherMessage('Contact supprimé avec succès !', 'succes');
    }
}

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

clearFormBtn.addEventListener('click', () => {
    nomInput.value = '';
    numInput.value = '';
});

resetSearchBtn.addEventListener('click', () => {
    rechercheInput.value = '';
    document.getElementById('searchResult').classList.add('hidden');
    afficherContacts();
});

sortBtn.addEventListener('click', () => {
    contacts.sort((a, b) => a.nom.localeCompare(b.nom));
    localStorage.setItem('contacts', JSON.stringify(contacts));
    afficherContacts();
});

clearAllBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all contacts?')) {
        contacts = [];
        localStorage.setItem('contacts', JSON.stringify(contacts));
        afficherContacts();
        afficherMessage('All contacts deleted.', 'succes');
    }
});