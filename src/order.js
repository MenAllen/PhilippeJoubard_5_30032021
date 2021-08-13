//===================================== Fonctions Locales ========================================================

//=================================
/* Affichage des éléments commandés

		<tbody>
			<tr>
				<td>	<img src="imgurl" alt="name">  </td>
				<td>	(name)	</td>
				<td>	(price) </td>
			</tr>
		</tbody>
*/

function displayOrderedProduct(element) {
  // Positionnement dans le HTML: tbody
  let b = document.getElementById("listOrderedProducts");

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
  image.setAttribute("src", element.imageUrl);
  image.setAttribute("alt", element.name);
  tdProduit.append(image);

  // Champ nom
  let tdName = document.createElement("td");
  tdName.classList.add("align-middle");
  tdName.textContent = element.name;
  newLine.append(tdName);

  // Champ nom
  let tdOption = document.createElement("td");
  tdOption.classList.add("align-middle");
  tdOption.textContent = element.name;
  newLine.append(tdOption);

  //champ prix total = prix
  let tdTotalPrice = document.createElement("td");
  tdTotalPrice.classList.add("align-middle", "font-weight-bold");
  tdTotalPrice.textContent = formatPrice(element.price);
  newLine.append(tdTotalPrice);

  // Mise à jour du prix total du panier
  totalOrderPrice += element.price;
}

// Affichage des produits commandés et du prix total à partir du panier
function displayProducts() {
  let fullList = false;

  for (product of myBasket) {
    displaySingleProduct(product, fullList);
  }

  for (product of orderData.products) {
    totalOrderPrice += product.price;
  }

  displayBasketPrice(totalOrderPrice);
  console.log(totalOrderPrice);
}

//====================================== Traitements =======================================================

// Update Panier dans Header
myBasketBalance();

//==========================================================================
// Récupération des données reçues du serveur et initialiation du prix total
let orderData = JSON.parse(localStorage.getItem("order")) || [];
let totalOrderPrice = 0;

console.log(orderData);

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
console.log(orderData.orderId);

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
