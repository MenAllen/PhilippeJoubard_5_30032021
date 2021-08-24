//================================== Fonctions Locales =========================================

//=======================================================================================
//displayBasket signale si le panier est vide , sinon affiche tous les éléments du panier
function displayBasket() {
  let fullList = true;
  let elt = document.getElementById("basketIsEmpty");
  let btn1 = document.getElementById("launchOrder");
  let btn2 = document.getElementById("emptyBasket");

  myBasketPrice = 0;

  if (myBasket.length > 0) {
    // Affichage de chaque element
    for (product of myBasket) {
      displaySelectedArticle(product, fullList);
    }

    // Affichage du prix total
    displayPrice(myBasketPrice);

    // On n'affiche pas 'panier vide'
    elt.classList.add("d-none");
    btn1.removeAttribute("disabled");
    btn2.removeAttribute("disabled");
  } else {
    // On affiche panier vide
    elt.classList.remove("d-none");
    btn1.setAttribute("disabled", "");
    btn2.setAttribute("disabled", "");
  }
}

//===========================================================================
// treatEmptyBasket reinitialise le panier,et redirige vers la page d'accueil
function validateEmptyBasket() {
  clearBasket();
  window.location.href = "../index.html";
}

//========================================================
// displayForm affiche le formulaire de commande à remplir
function displayForm() {
  // Afficher le formulaire si le panier n'est pas vide
  if (myBasket.length > 0) {
    // Afficher le formulaire et Masquer les boutons
    let eltForm = document.getElementById("displayFormulaire");
    eltForm.classList.remove("d-none");
    let eltBtn = document.getElementById("hideButton");
    eltBtn.classList.add("d-none");
  }
  // Recentrage du formulaire sur l'écran
  window.location.href = "#displayFormulaire";
}

//==========================================================================================
// hideForm masque le formulaire de commande, affiche les boutons et remonte en haut de page
function hideForm() {
  let eltForm = document.getElementById("displayFormulaire");
  eltForm.classList.add("d-none");
  let eltBtn = document.getElementById("hideButton");
  eltBtn.classList.remove("d-none");
  window.location.href = "#toppage";
}

//====================================================
// initialise myContact avec les valeurs du formulaire
function setmyContact() {
  //
  myContact.firstName = document.getElementById("firstName").value;
  myContact.lastName = document.getElementById("lastName").value;
  myContact.email = document.getElementById("email").value;
  myContact.address = document.getElementById("address").value;
  myContact.city = document.getElementById("city").value;
}

//==========================================
// Initialise myTabId avec les Ids du panier
function setmyIds() {
  myTabId = [];

  for (let element of myBasket) {
    let nbrelts = element.quantity;

    // Si plusieurs éléments, on insert autant de fois l'ID
    while (nbrelts > 0) {
      myTabId.push(element.id);
      nbrelts--;
    }
  }
}

//=================================================
// Envoie (POST) les informatiosn contact et Ids sur l'API
function sendPost(contact, products) {
  fetch(urlAPI + "order", {
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

//======================================================================================================
// ProceedOrder :
// Récupère les données du formulaire, lance le spinner puis la requete au serveur. Masque le formulaire
function proceedOrder() {
  setmyContact();

  setmyIds();

  startSpinner();

  sendPost(myContact, myTabId);

  hideForm();
}

//====================================== Traitements =======================================================

// Update Panier dans Header
myBasketBalance();

// Affichage du panier
displayBasket();

// Traitement du bouton 'vider le panier'
document
  .getElementById("emptyBasketConfirm")
  .addEventListener("click", validateEmptyBasket);

// Traitement du bouton 'lancer la commande' sur visualisation panier
document.getElementById("launchOrder").addEventListener("click", displayForm);

// Traitement de la soumission du formulaire de commande
let elt = document.getElementById("formOrder");
elt.addEventListener("submit", (e) => {
  e.preventDefault();
  proceedOrder();
});
