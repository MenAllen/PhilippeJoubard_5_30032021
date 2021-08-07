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
		this.price = +price;
		this.option = option;
		this.quantity = +quantity;
		this.imgurl = imgurl;
	}
}

//Variables Globales
const myBasket = JSON.parse(localStorage.getItem("furniture")) || [];
console.log(myBasket);
const myProduct = new Product();
console.log(myProduct);
