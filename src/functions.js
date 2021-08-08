// création de la class produit à partir de la definition du Backend pour furniture
// *
// * Expects request to contain:
// * contact: {
// *   firstName: string,
// *   lastName: string,
// *   address: string,
// *   city: string,
// *   email: string
// * }
// * products: [string] <-- array of product _id

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
let myBasketPrice = 0;

// incrémente de 1 la quantité de l'element dans le panier dont l'index est donné
function incrementInBasket(index) {
    ++myBasket[index].quantity;
    console.log(myBasket);
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
    console.log(myBasket);
}

// Formatage du prix pour afficher "x xxx,xx €"
function formatPrice(price) {
    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
    }).format(price / 100);
}
