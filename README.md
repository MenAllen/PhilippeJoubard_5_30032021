# PhilippeJoubard_5_30032021
Fifth project of web development course at OpenClassrooms:  "Construisez un site e-commerce"
Goal, as a front-end developer working for ORINOCO company, is to develop a front-end application :
- create a test plan
- interact with web API using Javascript
- validate data coming from external sources
- manage events with Javascript

## !! IMPORTANT !!
- This repo only includes front-end application
- Backend application is available from Orinoco github repository: 

			https://github.com/OpenClassrooms-Student-Center/JWDP5
			This is the back end server for Project five of the Junior Web Developer path.
			Prerequisites:
			You will need to have Node and npm installed locally on your machine.
			Installation:
			Clone this repo. From within the project folder, run npm install.
			You can then run the server with node server. 
			The server should run on localhost with default port 3000.
			If the server runs on another port for any reason, this is printed to the console when the server starts,
			e.g. Listening on port 3001.

## General Architecture
Web application is made of four HTML pages
- view page (index.html) for each available article received from the server
- product page (produit.html) for one element to display specific selected article, customise it and add it to basket
- basket page (panier.html) summing up elements inside the basket, total price et form to launch an order
- order confirmation page (order.html), thanking user and showing price and command id sent by server

## Tools & Software used
- Visual Studio Code with extensions Prettier & Live Server
- Git & Github
- Webpack
- Languages: HTML, CSS, Bootstrap, Javascript

## Additinal functions
- In addition to the required functionalities, the basket page gives the possibility to empty basket or go-on shopping
- A badge is made available on each page to update the user with the number of articles in the basket
- When a request is sent to server, a spinner is activated to show the front-end app is running and requesting answer from server
- When an error message is received from server, an alert panel (red) is displayed with the error code received
_ The order page lists the products ordered =, their quantity and the sub-total price

## Improvments & suggested add-ons
- Adding quantity info for each product in the product order data would simplify and fluidify the exchange between front and backend
- Some images on server side need to be compressed: for example, oak_5.jpg is 4712Ko
