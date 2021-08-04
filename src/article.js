// Sélection de l'option vernis du meuble récupéré via l'API
function selectOptionVarnish($varnish) {
    for (let varnish of $varnish) {
        document.getElementById("option-vernis").innerHTML += `<option value="${varnish}">${varnish}</option>`;
    }
}

// Affichage de l'article dans la page articcle.html
function displaySingleArticle ($name, $imageurl, $description, $price, $varnish) {
 
    document.getElementById("image-article").setAttribute("src", $imageurl);
    document.getElementById("image-article").setAttribute("alt", $name);

    document.getElementById("nom-article").textContent = $name;;
    document.getElementById("prix-article").textContent = new Intl.NumberFormat('fr-FR', {style:'currency', currency:'EUR'}).format($price / 100);
    document.getElementById("description-article").textContent = $description;

    selectOptionVarnish($varnish);

};

// Récupération de l'id du produit passé via l'appel de la page HTML
let myParams = new URLSearchParams(location.search);
let myId = myParams.get("_id");

// Get API sur Article unique
function readSingleArticle () {

    fetch("http://localhost:3000/api/furniture/"+ myId)
    .then(data => data.json())
    .then(jsonSingleArticle => {
        displaySingleArticle(jsonSingleArticle.name, jsonSingleArticle.imageUrl, jsonSingleArticle.description, jsonSingleArticle.price, jsonSingleArticle.varnish );
    }) 
    .catch(function(err) {
        document.getElementById("error-display").style.display = "block";
        console.log("Erreur Catch: " + err);
    });
}

readSingleArticle();

// Ajout de l'article sélectionné dans le panier sur au clic du bouton 'Ajouter au panier'


const clickHandler = function() {

}

document.getElementById("AjoutPanier").addEventListener('click', clickHandler);


