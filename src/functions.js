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
// * products: [string] <-- array of product _id

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
let myBasket = JSON.parse(localStorage.getItem("furniture")) || [];
let myProduct = new Product();
let myContact = new Contact();
let myTabId = [];
let myBasketPrice = 0;

//========================================== Fonctions Globales =======================================

// Arrête le spinner
function stopSpinner() {
  console.log("stopSpinner");
  let elt = document.getElementById("spinner");
  elt.classList.add("d-none");
}

// Démarre le spinner
function startSpinner() {
  console.log("startSpinner");
  let elt = document.getElementById("spinner");
  elt.classList.remove("d-none");
}

// Affiche un message d'erreur suite à un fetch / catch puis arrête le spinner
function displayErrorMessage(err) {
  let elt = document.getElementById("errorDisplay");
  elt.textContent += " (" + err + ")";
  elt.classList.remove("invisible");
  elt.classList.add("visible");

  stopSpinner();
}

// Efface le message d'erreur suite à un fetch / response puis arrête le spinner
function clearErrorMessage() {
  let elt = document.getElementById("errorDisplay");
  elt.classList.remove("visible");
  elt.classList.add("invisible");

  stopSpinner();
}

//Calcul du nombre d'articles dans le panier et Affichage dans le header de chaque page
function myBasketBalance() {
  let totalArticles = 0;

  for (product of myBasket) {
    totalArticles += product.quantity;
  }

  if (totalArticles > 0) {
    let element = document.getElementById("myBasketBalance");
    element.innerHTML = `Panier <span class="badge badge-light bg-secondary align-top">${totalArticles}</span>`;
  }
}

// clearBasket provoque la remise à zéro du panier et la mise à jour des affichages page
function clearBasket() {
  myBasket = [];
  localStorage.setItem("furniture", JSON.stringify(myBasket));
  myBasketBalance();
}

// incrémente de 1 la quantité de l'element dans le panier dont l'index est donné
function incrementInBasket(index) {
  ++myBasket[index].quantity;
  console.log(myBasket);
  localStorage.setItem("furniture", JSON.stringify(myBasket));
}

// Teste si l'article myProduct est déjà inclus dans le panier myBasket
//  en cherchant le nom et l'option vernis
//      - return true si présent
//      - return false et increment l'index trouvé sinon
function isInBasket() {
  console.log(myBasket);

  for (element of myBasket) {
    switch (myProduct.name) {
      case element.name:
        switch (myProduct.option) {
          case element.option: {
            incrementInBasket(myBasket.indexOf(element));
            return true;
          }
        }
    }
  }
  return false;
}

//========================================================================================

// addInBasket ajoute l'élément myProduct dans le panier
function addInBasket() {
  myBasket.push(myProduct);
  localStorage.setItem("furniture", JSON.stringify(myBasket));
}

// Formatage du prix pour afficher "x xxx,xx €"
function formatPrice(price) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price / 100);
}

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

// ===========================================================================================

function displaySingleProduct(element, fullList) {
  // Positionnement dans le HTML: tbody
  let b = document.getElementById("basketlist");

  // Creation de la ligne enfant de basketlist
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

  // Champ nom
  let tdName = document.createElement("td");
  tdName.classList.add("align-middle");
  tdName.textContent = element.name;
  newLine.append(tdName);

  if (fullList) {
    // Champ option vernis
    let tdOption = document.createElement("td");
    tdOption.classList.add("align-middle");
    tdOption.textContent = element.option;
    newLine.append(tdOption);
  }

  // Champ quantité
  let tdQuantity = document.createElement("td");
  tdQuantity.classList.add("align-middle");
  tdQuantity.textContent = element.quantity;
  newLine.append(tdQuantity);

  if (fullList) {
    // Champ prix
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

// Affichage du prix de la commande / du panier
function displayBasketPrice(price) {
  let elt = document.getElementById("orderPrice");
  elt.textContent = formatPrice(price);
}
