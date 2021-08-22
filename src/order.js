//===================================== Fonctions Locales ========================================================

//=====================================================================
// Affichage des produits commandés et du prix total à partir du panier
function displayProducts() {
  let fullList = false;

  for (product of myBasket) {
    displaySelectedArticle(product, fullList);
  }

  for (product of orderData.products) {
    totalOrderPrice += product.price;
  }

  displayPrice(totalOrderPrice);
}

//====================================== Traitements =======================================================

// Update Panier dans Header
myBasketBalance();

// Récupération des données reçues du serveur et initialiation du prix total
let orderData = JSON.parse(localStorage.getItem("order")) || [];
let totalOrderPrice = 0;

// Affichage du message de remerciement personnalisé
let elt = document.getElementById("firstName");
elt.textContent =
  orderData.contact.firstName +
  ", votre commande est confirmée, nous vous en remercions !";

// Affichage des informations de commande
elt = document.getElementById("dateOrder");
elt.classList.add("font-weight-bold");
elt.textContent = getDateToday();

elt = document.getElementById("orderId");
elt.textContent = orderData.orderId;

elt = document.getElementById("deliveryName");
elt.textContent =
  orderData.contact.firstName + " " + orderData.contact.lastName;

elt = document.getElementById("deliveryAddress");
elt.textContent = orderData.contact.address;

elt = document.getElementById("deliveryCity");
elt.textContent = orderData.contact.city;

// Affichage des produits commandés
displayProducts();

// La commande est lancée, le panier est nettoyé
clearBasket();

// Activation du bouton imprimer
elt = document.getElementById("printOrder");
elt.addEventListener("click", (e) => {
  e.preventDefault;
  window.print();
});
