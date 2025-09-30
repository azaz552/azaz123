import React, { useState, useRef } from "react";


export default function ShoppingCart() {
  const [cart, setCart] = useState([]); 

  // Références pour les champs du formulaire
  const nameRef = useRef(); هادي كتقول: "صنع ليا ref اسميتو nameRef".
  const priceRef = useRef();
  const quantityRef = useRef(); 

  // Fonction pour ajouter un produit
  const addProduct = () => {
    const name = nameRef.current.value.trim();
    const price = parseFloat(priceRef.current.value);
    const quantity = parseInt(quantityRef.current.value);

    if (!name || isNaN(price) || isNaN(quantity) || price <= 0 || quantity <= 0) {
      alert("Veuillez entrer des valeurs valides !");
      return;
    }
    const newProduct = { name, price, quantity };
    setCart([...cart, newProduct]);

    // Vider les champs après ajout
    nameRef.current.value = "";
    priceRef.current.value = "";
    quantityRef.current.value = "";
  };



  // Fonction pour supprimer un produit
const removeProduct = (index) => {
  const newCart = [...cart]; 
  newCart.splice(index, 1);  
  setCart(newCart);          
};


  // Calcul du total du panier
  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  
  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h1>🛒 Shopping Cart</h1>

      {/* Formulaire d'ajout */}
      <div style={{ marginBottom: "20px" }}>
        <input type="text" placeholder="Nom du produit" ref={nameRef} />
        <input type="number" placeholder="Prix" ref={priceRef} />
        <input type="number" placeholder="Quantité" ref={quantityRef} />
        <button onClick={addProduct}>Ajouter au panier</button>
      </div>

      {/* Tableau des produits */}
      {cart.length > 0 ? (
        <table border="1" width="100%" cellPadding="8">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix unitaire</th>
              <th>Quantité</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((p, index) => (
              <tr key={index}>
                <td>{p.name}</td>
                <td>{p.price.toFixed(2)} €</td>
                <td>{p.quantity}</td>
                <td>{(p.price * p.quantity).toFixed(2)} €</td>
                <td>
                  <button onClick={() => removeProduct(index)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun produit dans le panier.</p>
      )}

      {/* Total du panier */}
      <h2>Total : {total.toFixed(2)} €</h2>
    </div>
  );
}
