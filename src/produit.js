// ===========================================================================================

// Affichage des options vernis du meuble, récupérées via l'API
function selectOptionVarnish(varnish) {
    for (let choice of varnish) {
        document.getElementById(
            "option-vernis"
        ).innerHTML += `<option value="${choice}">${choice}</option>`;
    }
}

// Initialisation de la variable globale myProduct avec les données de l'article lu
function storeMyArticle(article) {
    myProduct.id = article.id;
    myProduct.quantity = 1;
    myProduct.name = article.name;
    myProduct.description = article.description;
    myProduct.price = article.price;
    myProduct.imgurl = article.imageUrl;
}

// Affichage de l'article dans la page produit.html
function displaySingleArticle(article) {
    document
        .getElementById("image-article")
        .setAttribute("src", article.imageUrl);
    document.getElementById("image-article").setAttribute("alt", article.name);

    document.getElementById("nom-article").textContent = article.name;
    document.getElementById("nom-article-modal").textContent =
        "L'article " + article.name + " a été ajouté dans votre panier";

    document.getElementById("prix-article").textContent = formatPrice(
        article.price
    );
    document.getElementById("description-article").textContent =
        article.description;

    selectOptionVarnish(article.varnish);

    storeMyArticle(article);
}

// ===========================================================================================

// Récupération de l'id du produit passé via l'appel de la page HTML
let myParams = new URLSearchParams(location.search);
let myId = myParams.get("_id");

// Get API sur Article unique
function readSingleArticle() {
    fetch("http://localhost:3000/api/furniture/" + myId)
        .then((data) => data.json())
        .then((jsonSingleArticle) => {
            displaySingleArticle(jsonSingleArticle);
        })
        .catch(function (err) {
            document.getElementById("error-display").style.display = "block";
            console.log("Erreur Catch: " + err);
        });
}

readSingleArticle();

// ===========================================================================================

// Fonction Ajout de l'article sélectionné dans le panier
const addArticleBasket = function () {
    // Récupération dans myProduct de l'option vernis sélectionnée
    myProduct.option = document.getElementById("option-vernis").value;
    console.log(myProduct.option);

    // Ajout de l'article dans le panier ou incrémentation de la quantité si déjà existant
    if (!isInBasket()) {
        addInBasket();
    }

    // Update myBasket dans localstorage
    localStorage.setItem("furniture", JSON.stringify(myBasket));
    console.log(localStorage);
    console.log(myBasket.length);
};

// Ajout de l'article sélectionné dans le panier sur clic du bouton 'Ajouter au panier'
document
    .getElementById("AjoutPanier")
    .addEventListener("click", addArticleBasket);
