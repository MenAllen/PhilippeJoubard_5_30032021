//Stockage d'un objet plus compliqué
localStorage.setItem('monObjet', JSON.stringify(monObjet));
//Récupération de l'objet
monObjet = JSON.parse(localStorage.getItem('monObjet'));