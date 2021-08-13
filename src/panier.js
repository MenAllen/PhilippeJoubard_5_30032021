//================================== Fonctions Locales =========================================

//============================================================================================
//displayBasket affiche tous les éléments du panier dans panier.html et calcule le prix total
function displayBasket() {
  let fullList = true;
  myBasketPrice = 0;

  for (product of myBasket) {
    displaySingleProduct(product, fullList);
  }

  displayBasketPrice(myBasketPrice);
}

//============================================================================================
// treatEmptyBasket reinitialise le panier,et redirige vers la page d'accueil
function treatEmptyBasket() {
  clearBasket();
  window.location.href = "../index.html";
}

//========================================================================================
// displayForm affiche le formulaire de commande à remplir
function displayForm() {
  // Afficher le formulaire si le panier n'est pas vide
  if (myBasket.length > 0) {
    // Afficher le formulaire
    let elt = document.getElementById("displayForm");
    elt.classList.remove("d-none");

    // Masquer les boutons
    elt = document.getElementById("hideButton");
    elt.classList.add("d-none");
  }

  // Recentrage du formulaire
  window.location.href = "#displayForm";
}

//========================================================================================
// initialise myContact avec les valeurs du formulaire
function setmyContact() {
  //
  myContact.firstName = document.getElementById("firstName").value;
  myContact.lastName = document.getElementById("lastName").value;
  myContact.email = document.getElementById("email").value;
  myContact.address = document.getElementById("address").value;
  myContact.city = document.getElementById("city").value;
}

// Initialise myTabId avec les Ids du panier
function setmyIds() {
  myTabId = [];

  for (let element of myBasket) {
    let nbrelts = element.quantity;
    while (nbrelts > 0) {
      myTabId.push(element.id);
      nbrelts--;
    }
  }
}

// Envoie les informatiosn contact et Ids sur l'API
function sendPost(contact, products) {
  fetch("http://localhost:3000/api/furniture/order", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ contact, products }),
  })
    .then((data) => data.json())

    .then((jsonresponse) => {
      // enregistrement des données reçues dans localstorage
      localStorage.setItem("order", JSON.stringify(jsonresponse));

      // clean-up du message d'erreur eventuel
      clearErrorMessage();

      // redirection vers la page order
      window.location.href = "order.html";
    })

    .catch(function (err) {
      displayErrorMessage(err);
      console.log("Erreur Catch: " + err);
    });
}

// ProceedOrder : Récupère les données du formulaire et lance la requete au serveur
function proceedOrder() {
  setmyContact();

  setmyIds();
  console.log(myTabId);
  sendPost(myContact, myTabId);
}

//====================================== Traitements =======================================================

// Update Panier dans Header
myBasketBalance();

// Affichage du panier
displayBasket();

// Traietement du bouton 'vider le panier'
document
  .getElementById("emptyBasket")
  .addEventListener("click", treatEmptyBasket);

// Traitement du bouton 'lancer la commande' sur visualisation panier
document.getElementById("launchOrder").addEventListener("click", displayForm);

// Traitement de la soumission du formulaire de commande
let elt = document.getElementById("formOrder");
elt.addEventListener("submit", (e) => {
  e.preventDefault();
  proceedOrder();
});
