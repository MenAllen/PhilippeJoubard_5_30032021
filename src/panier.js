//========================================================================================

/*displaySingleproduct affiche un élément du panier

		<tbody>
			<tr>
				<td>	<img src="imgurl" alt="name">  </td>
				<td>	(name)	</td>
				<td>	(option)	</td>
				<td>	(quantity) </td>
				<td>	(price) </td>
				<td>	(quantity * price) </td>
			</tr>
		</tbody>

		<tfoot>
			<tr>
				<th colspan="4"></th>
				<th colspan="1"></th>
				<th colspan="1"></th>
			</tr>
		</tfoot>
*/

function displaySingleProduct(element) {
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

    // Champ option vernis
    let tdOption = document.createElement("td");
    tdOption.classList.add("align-middle");
    tdOption.textContent = element.option;
    newLine.append(tdOption);

    // Champ quantité
    let tdQuantity = document.createElement("td");
    tdQuantity.classList.add("align-middle");
    tdQuantity.textContent = element.quantity;
    newLine.append(tdQuantity);

    // Champ prix
    let tdPrice = document.createElement("td");
    tdPrice.classList.add("align-middle");
    tdPrice.textContent = formatPrice(element.price);
    newLine.append(tdPrice);

    //champ prix total = quantité X prix
    let tdTotalPrice = document.createElement("td");
    tdTotalPrice.classList.add("align-middle", "font-weight-bold");
    tdTotalPrice.textContent = formatPrice(element.quantity * element.price);
    newLine.append(tdTotalPrice);

    // Mise à jour du prix total du panier
    myBasketPrice += element.quantity * element.price;
}

function displayBasketPrice() {
    // Positionnement dans le HTML: tfoot
    b = document.getElementById("totalpricebasket");

    // Creation de la ligne enfant de totalpricebasket
    newLine = document.createElement("tr");
    newLine.classList.add("text-center");
    b.append(newLine);

    // 4 Champs vides
    let thEmpty = document.createElement("th");
    thEmpty.setAttribute("colspan", 4);
    newLine.append(thEmpty);

    // 1 Champ texte
    let thTexte = document.createElement("th");
    thTexte.setAttribute("colspan", 1);
    thTexte.textContent = "Total:";
    newLine.append(thTexte);

    // 1 Champ Somme Totale
    let thTotal = document.createElement("th");
    thTotal.setAttribute("colspan", 1);
    thTotal.textContent = formatPrice(myBasketPrice);
    newLine.append(thTotal);
}

//============================================================================================
//displayBasket affiche tous les éléments du panier dans panier.html et calcule le prix total
function displayBasket() {
    myBasketPrice = 0;

    for (product of myBasket) {
        displaySingleProduct(product);
    }

    displayBasketPrice();
}

displayBasket();

//============================================================================================
// orderBasket provoque l'affichage du formulaire de commande à remplir
function orderBasket() {
    // Afficher le formulaire
}

document.getElementById("launchOrder").addEventListener("click", orderBasket);

//============================================================================================
// clearBasket provoque la remise à zéro du panier, l'affichage d'une fenetre d'alerte
// et la redirection vers la page d'accueil
function clearBasket() {
    myBasket = [];
    localStorage.setItem("furniture", JSON.stringify(myBasket));

    alert("Votre panier a été vidé");

    window.location.href = "../index.html";
}

document.getElementById("emptyBasket").addEventListener("click", clearBasket);
