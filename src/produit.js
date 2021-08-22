// ===================================== Variables Locales =================================================

// Récupération de l'id du produit passé via l'appel depuis la page HTML
let myParams = new URLSearchParams(location.search);
let myId = myParams.get("_id");

// ====================================== Fonctions Locales ================================================

//=============================================================
// Affiche les options vernis du meuble, récupérées via l'API
function selectOptionVarnish(varnish) {
  for (let choice of varnish) {
    document.getElementById(
      "optionVernis"
    ).innerHTML += `<option value="${choice}">${choice}</option>`;
  }
}

//==========================================================================
// Initialise la variable globale myProduct avec les données de l'article lu
function storeMyArticle(article) {
  myProduct.id = article._id;
  myProduct.quantity = 1;
  myProduct.name = article.name;
  myProduct.description = article.description;
  myProduct.price = article.price;
  myProduct.imgurl = article.imageUrl;
}

//=================================================
// Affiche l'article lu dans la page produit.html
function displaySingleArticle(article) {
  document.getElementById("imageArticle").setAttribute("src", article.imageUrl);
  document.getElementById("imageArticle").setAttribute("alt", article.name);

  document.getElementById("nomArticle").textContent = article.name;
  document.getElementById("nomArticleModal").textContent =
    "L'article " + article.name + " a été ajouté dans votre panier";

  document.getElementById("prixArticle").textContent = formatPrice(
    article.price
  );
  document.getElementById("descriptionArticle").textContent =
    article.description;

  selectOptionVarnish(article.varnish);

  storeMyArticle(article);

  // L'article est reçu: on active le bouton "ajouter au panier"
  document.getElementById("ajoutPanier").removeAttribute("disabled");
}

//===========================
// Get API sur Article unique
function readSingleArticle() {
  fetch("http://localhost:3000/api/furniture/" + myId)
    .then((data) => data.json())
    .then((jsonSingleArticle) => {
      displaySingleArticle(jsonSingleArticle);
      clearErrorMessage();
    })
    .catch(function (err) {
      displayErrorMessage(err);
      console.log("Erreur Catch: " + err);
    });
}

//=====================================================================
// Teste si l'article myProduct est déjà inclus dans le panier myBasket
//  en cherchant le nom et l'option vernis
//      - return true si présent, et incrémente la quantité
//      - return false sinon
function isInBasket() {
  for (element of myBasket) {
    if (
      myProduct.name === element.name &&
      myProduct.option === element.option
    ) {
      incrementInBasket(myBasket.indexOf(element));

      return true;
    }

    return false;
  }
}

//=======================================================
// Fonction Ajout de l'article sélectionné dans le panier
function addArticleBasket() {
  // Récupération dans myProduct de l'option vernis sélectionnée
  myProduct.option = document.getElementById("optionVernis").value;

  // Ajout de l'article dans le panier ou incrémentation de la quantité si déjà existant
  if (!isInBasket()) {
    myBasket.push(myProduct);
  }

  // Update myBasket dans localstorage
  localStorage.setItem("furniture", JSON.stringify(myBasket));
}

// ======================================= Traitements ================================================

// Affichage Panier dans Header
myBasketBalance();

// Bouton ajouter au panier désactivé tant que l'article n'est pas reçu
document.getElementById("ajoutPanier").setAttribute("disabled", "");

// Get API sur Article unique
readSingleArticle();

// Ajout de l'article sélectionné dans le panier sur clic du bouton 'Ajouter au panier'
document
  .getElementById("ajoutPanier")
  .addEventListener("click", addArticleBasket);
