function genererTrame() {
  const type = document.getElementById("type").value;
  const adresse = document.getElementById("adresse").value.trim();
  const fonction = document.getElementById("fonction").value.trim();
  const donnees = document.getElementById("donnees").value.trim();
  
  const resultatDiv = document.getElementById("resultat");

  // --- Contraintes ---
  if (!adresse || !fonction || !donnees) {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  if (!/^\d+$/.test(adresse) || adresse < 1 || adresse > 247) {
    resultatDiv.innerText = "Erreur : L'adresse doit être un nombre entre 1 et 247.";
    resultatDiv.style.color = "red";
    return;
  }

  if (!/^[0-9A-Fa-f]{2}$/.test(fonction)) {
    resultatDiv.innerText = "Erreur : Le code fonction doit être exactement 2 caractères hexadécimaux.";
    resultatDiv.style.color = "red";
    return;
  }

  if (!/^[0-9A-Fa-f]*$/.test(donnees)) {
    resultatDiv.innerText = "Erreur : Les données doivent être des caractères hexadécimaux uniquement.";
    resultatDiv.style.color = "red";
    return;
  }
  // -------------------

  let trame = adresse.padStart(2, '0') + fonction + donnees;
  let resultat = "";

  if (type === "ascii") {
    let lrc = calculLRC(trame);
    resultat = ":" + trame + lrc + "\r\n";  // Trame ASCII commence par ":" et finit par CRLF
  } else {
    let crc = calculCRC(trame);
    resultat = trame + crc;
  }

  resultatDiv.innerText = resultat.toUpperCase();
  resultatDiv.style.color = "blue"; // Remet en bleu si tout est bon

  // Sauvegarder la trame avec tous les paramètres nécessaires
  sauvegarderTrame(type, adresse, fonction, donnees, resultat.toUpperCase());
}

function calculLRC(data) {
  let sum = 0;
  for (let i = 0; i < data.length; i += 2) {
    sum += parseInt(data.substr(i, 2), 16);
  }
  let lrc = ((~sum + 1) & 0xFF).toString(16).padStart(2, '0');
  return lrc;
}

function calculCRC(data) {
  let crc = 0xFFFF;
  for (let i = 0; i < data.length; i += 2) {
    crc ^= parseInt(data.substr(i, 2), 16);
    for (let j = 0; j < 8; j++) {
      if (crc & 1) crc = (crc >> 1) ^ 0xA001;
      else crc = crc >> 1;
    }
  }
  return crc.toString(16).padStart(4, '0');
}

// Fonction pour sauvegarder dans le back-end via fetch
function sauvegarderTrame(type, adresse, fonction, donnees, trame_complete) {
  fetch('/sauvegarder-trame', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type, adresse, fonction, donnees, trame_complete })
  })
  .then(response => response.text())
  .then(data => {
    console.log(data); // "Trame sauvegardée avec succès"
    // Ajouter un message de confirmation visuelle
    const confirmationDiv = document.getElementById("confirmation");
    confirmationDiv.innerText = "Trame sauvegardée avec succès !";
    confirmationDiv.style.color = "green";
  })
  .catch(error => {
    console.error('Erreur:', error);
    const confirmationDiv = document.getElementById("confirmation");
    confirmationDiv.innerText = "Erreur lors de la sauvegarde de la trame.";
    confirmationDiv.style.color = "red";
  });
}

// Fonction pour afficher toutes les trames sauvegardées depuis la base de données
function afficherTrames() {
  fetch('/trames')
    .then(response => response.json())
    .then(data => {
      const historique = document.getElementById('historique');
      historique.innerHTML = ''; // Vider l'historique avant d'ajouter de nouvelles trames
      if (data.length === 0) {
        historique.innerHTML = "<p style='color: gray;'>Aucune trame sauvegardée.</p>";
      } else {
        data.forEach(trame => {
          historique.innerHTML += `<div>${trame.trame_complete}</div>`;
        });
      }
    })
    .catch(error => {
      console.error('Erreur:', error);
    });
}
