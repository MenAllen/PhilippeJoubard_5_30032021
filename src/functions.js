//===================================== Types et Variables Globales ============================================

// Class contact à partir de la definition du Backend pour furniture

class Contact {
  constructor(firstName, lastName, address, city, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.email = email;
  }
}
// Type products: [string] <-- array of product _id à partir de la definition du Backend

// Class Product pour éléments stockés dans le panier

class Product {
  constructor(id, name, description, price, option, quantity, imgurl) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.option = option;
    this.quantity = quantity;
    this.imgurl = imgurl;
  }
}

//Variables Globales

let myBasket = JSON.parse(localStorage.getItem("furniture")) || []; // Mon panier
let myProduct = new Product(); // Le produit sélectionné
let myContact = new Contact(); // Le contact transmis dans le formulaire
let myTabId = []; // La liste des Ids objets de la commande
let myBasketPrice = 0; // Le prix total du panier

//========================================== Fonctions Globales =======================================

//==================
// Arrête le spinner

function stopSpinner() {
  let elt = document.getElementById("spinner");
  elt.classList.add("d-none");
}

//===================
// Démarre le spinner

function startSpinner() {
  let elt = document.getElementById("spinner");
  elt.classList.remove("d-none");
}

//=============================================================================
// Affiche un message d'erreur suite à un fetch / catch puis arrête le spinner

function displayErrorMessage(err) {
  let elt = document.getElementById("errorDisplay");
  elt.textContent += " (" + err + ")";
  elt.classList.remove("invisible");
  elt.classList.add("visible");

  stopSpinner();
}

//===============================================================================
// Efface le message d'erreur suite à un fetch / response puis arrête le spinner

function clearErrorMessage() {
  let elt = document.getElementById("errorDisplay");
  elt.classList.remove("visible");
  elt.classList.add("invisible");

  stopSpinner();
}

//=====================================================================================
//Calcule le nombre d'articles dans le panier et l'affiche dans le header de chaque page

function myBasketBalance() {
  let totalArticles = 0;
  let element = document.getElementById("myBasketBalance");

  for (product of myBasket) {
    totalArticles += product.quantity;
  }

  totalArticles > 0
    ? (element.innerHTML = `Panier <span class="badge badge-light bg-secondary align-top">${totalArticles}</span>`)
    : (element.innerHTML = `Panier`);
}

//======================================================================================
// clearBasket provoque la remise à zéro du panier et la mise à jour des affichages page

function clearBasket() {
  myBasket = [];
  localStorage.clear();
  myBasketBalance();
}

//===============================================================================
// incrémente de 1 la quantité de l'element dans le panier dont l'index est donné

function incrementInBasket(index) {
  ++myBasket[index].quantity;
  localStorage.setItem("furniture", JSON.stringify(myBasket));
}

//==============================================
// Formatage du prix pour afficher "x xxx,xx €"

function formatPrice(price) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price / 100);
}

//==============================================
// Retourne la date du jour au format dd/mm/yyyy

function getDateToday() {
  let date = new Date();
  return (
    ("0" + date.getDate()).slice(-2) +
    "/" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    date.getFullYear()
  );
}

// ================================================================================
// Affiche un élément sélectionné du panier:
//    si fullList = true, tous les champs sont affichés (affichage panier)
//    si fullList = false, tous sauf option et prix unitaire (affichage commande)

function displaySelectedArticle(element, fullList) {
  // Positionnement dans le HTML: tbody
  let b = document.getElementById("basketList");

  // Creation de la ligne enfant de basketList
  let newLine = document.createElement("tr");
  newLine.classList.add("text-center");
  b.append(newLine);

  // Champ produit
  let tdProduit = document.createElement("td");
  tdProduit.classList.add("w-25", "h-25");
  newLine.append(tdProduit);

  // Image dans champ produit
  let image = document.createElement("img");
  image.classList.add("img-fluid", "img-thumbnail", "rounded");
  image.setAttribute("src", element.imgurl);
  image.setAttribute("alt", element.name);
  tdProduit.append(image);

  if (fullList) {
    // Name et Option ont chacun leur colonne

    // Champ nom
    let tdName = document.createElement("td");
    tdName.classList.add("align-middle");
    tdName.textContent = element.name;
    newLine.append(tdName);

    // Champ option vernis
    let tdOption = document.createElement("td");
    tdOption.classList.add("align-middle");
    tdOption.textContent = element.option;
    newLine.append(tdOption);
  } else {
    // Name et Option sont dans la même colonne

    let tdName = document.createElement("td");
    tdName.classList.add("align-middle");
    newLine.append(tdName);

    // Champ nom
    let tdPar1 = document.createElement("p");
    tdPar1.textContent = element.name;
    tdName.append(tdPar1);

    // Champ option
    let tdPar2 = document.createElement("p");
    tdPar2.textContent = "( " + element.option + " )";
    tdName.append(tdPar2);
  }

  // Champ quantité
  let tdQuantity = document.createElement("td");
  tdQuantity.classList.add("align-middle");
  tdQuantity.textContent = element.quantity;
  newLine.append(tdQuantity);

  if (fullList) {
    // Champ prix élément pour le panier seulement
    let tdPrice = document.createElement("td");
    tdPrice.classList.add("align-middle");
    tdPrice.textContent = formatPrice(element.price);
    newLine.append(tdPrice);
  }

  //champ prix total = quantité X prix
  let tdTotalPrice = document.createElement("td");
  tdTotalPrice.classList.add("align-middle", "font-weight-bold");
  tdTotalPrice.textContent = formatPrice(element.quantity * element.price);
  newLine.append(tdTotalPrice);

  // Mise à jour du prix total du panier
  myBasketPrice += element.quantity * element.price;
}

// =========================================================================
// Affichage du prix. Utilisé pour le prix total de la commande et du panier

function displayPrice(price) {
  let elt = document.getElementById("orderPrice");
  elt.textContent = formatPrice(price);
}
