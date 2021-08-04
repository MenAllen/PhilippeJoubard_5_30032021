
/* Affichage d'un Article */
function displayArticle($name, $imageurl, $description, $price, $_id) {

    /* Template pour Display Card
    <div class="col-12 col-md-6 pb-3">
        <div class="card border bg-light shadow p-3 mb-5 rounded">
            <div class="card-body">
                <div class="row">
                    <a href="#"><img src="imageurl" id="image-article" class="img-fluid p-1" alt="Name"></a>
                    <div class="col-6 col-sm-7 mt-3" >
                        <h5 id="nom-article" class="card-title">Name</h5>
                    </div>
                    <div class="col-6 col-sm-5 text-end mt-3">
                        <h5 id="prix-article" class="card-title">Price</h5>
                    </div>
                </div>
                <p id="description-article" class="card-text text-truncate">${produit.description}</p>
                <a href="./frontend/produit.html?_id=${produit._id}" class="btn btn-secondary">Acheter ce produit</a>
            </div>
        </div>
    </div> */

    /* Positionnement dans le HTML */
    let  b = document.getElementById("liste");

        /* Creation d'un div enfant de liste */ 
        let divColonne = document.createElement("div");
        divColonne.classList.add("col-12", "col-md-6", "pb-3");
        b.append(divColonne);

            /* Creation du div card enfant */
            let divCard = document.createElement("div");
            divCard.classList.add("card", "border", "bg-light", "shadow", "p-3", "mb-5", "rounded");
            divColonne.append(divCard);

                /* Creation du div card-body enfant */
                let divCardBody = document.createElement("div");
                divCardBody.classList.add("card-body");
                divCard.append(divCardBody);

                    /* Creation du div row enfant */
                    let divRow = document.createElement("div");
                    divRow.classList.add("row");
                    divCardBody.append(divRow);

                        /* Creation de img enfant */
                        let image = document.createElement("img");
                        image.classList.add("img-fluid", "p-1");
                        image.setAttribute("src", $imageurl);
                        image.setAttribute("alt", $name);
                        divRow.append(image);

                        /* Creation de div article*/
                        let divNomArticle = document.createElement("div");
                        divNomArticle.classList.add("col-6", "col-sm-7", "mt-3");
                        divRow.append(divNomArticle);

                            /* Creation de h5 nomArticle enfant */
                            let h5NomArticle = document.createElement("h5");
                            h5NomArticle.classList.add("card-title");
                            h5NomArticle.textContent = $name;
                            divNomArticle.append(h5NomArticle);

                        /* Creation de div article*/
                        let divPrixArticle = document.createElement("div");
                        divPrixArticle.classList.add("col-6", "col-sm-5", "text-end", "mt-3");
                        divRow.append(divPrixArticle);

                            /* Creation de h5 nomArticle enfant */
                            let h5PrixArticle = document.createElement("h5");
                            h5PrixArticle.classList.add("card-title");
                            h5PrixArticle.textContent = new Intl.NumberFormat('fr-FR', {style:'currency', currency:'EUR'}).format($price / 100);
                            divPrixArticle.append(h5PrixArticle);

                    /* Creation du paragraphe Description */
                    let pDescription = document.createElement("p");
                    pDescription.classList.add("card-text", "text-truncate");
                    pDescription.textContent = $description;
                    divCardBody.append(pDescription);

                    /* Creation de l'ancre du bouton */
                    let abtn = document.createElement("a");
                    abtn.classList.add("btn", "btn-secondary", "stretched-link");
                    abtn.setAttribute("href", "./src/article.html?_id=" + $_id);
                    abtn.setAttribute("alt", $name);
                    abtn.textContent = "Voir cet article";
                    divCardBody.append(abtn);
                    
}

/* Récupération des articles via API GET */
function readAllArticles() {

  fetch("http://localhost:3000/api/furniture")
      .then(data => data.json())
      .then(jsonListArticle => {
          console.log(jsonListArticle);
          for (let jsonArticle of jsonListArticle) {
              console.log("+");
              displayArticle(jsonArticle.name, jsonArticle.imageUrl, jsonArticle.description, jsonArticle.price, jsonArticle._id);
          }
      }) 
      .catch(function(err) {
          document.getElementById("error-display").style.display = "block";
          console.log("Erreur Catch: " + err);
      });
  }

  readAllArticles();
