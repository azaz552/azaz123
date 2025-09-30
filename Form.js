import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UserForm() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    password: "",
    age: "",
    genre: "",
    ville: "",
    conditions: false,
  });

  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState(null);


  const handleChange = (e) => {
    console.log(e.target);
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }; 

  

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    // Validation
    if (!formData.nom.trim()) formErrors.nom = "Le nom est obligatoire.";
    else if (formData.nom.trim().length < 3)
      formErrors.nom = "Le nom doit contenir au moins 3 caractères.";

    if (!formData.email.trim()) formErrors.email = "L'email est obligatoire.";
    else if (!formData.email.includes("@"))
      formErrors.email = "L'email doit contenir un @.";

    if (!formData.password) formErrors.password = "Le mot de passe est obligatoire.";
    else if (formData.password.length < 6)
      formErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";

    if (!formData.age) formErrors.age = "L'age est obligatoire.";
    else if (isNaN(formData.age) || Number(formData.age) < 18)
      formErrors.age = "Vous devez avoir au moins 18 ans.";

    if (!formData.genre) formErrors.genre = "Le genre est obligatoire.";

    if (!formData.ville) formErrors.ville = "La ville est obligatoire.";

    if (!formData.conditions)
      formErrors.conditions = "Vous devez accepter les conditions.";

    setErrors(formErrors);

    // Si aucune erreur → sauvegarder les données
    if (Object.keys(formErrors).length === 0) {
      setUserData(formData);

      // Réinitialiser le formulaire
      setFormData({
        nom: "",
        email: "",
        password: "",
        age: "",
        genre: "",
        ville: "",
        conditions: false,
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Formulaire d'inscription</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        {/* Nom */}
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input
            type="text"
            name="nom"
            className="form-control"
            value={formData.nom}
            onChange={handleChange}
          />
          {errors.nom && <p className="text-danger">{errors.nom}</p>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-danger">{errors.email}</p>}
        </div>

        {/* Mot de passe */}
        <div className="mb-3">
          <label className="form-label">Mot de passe</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-danger">{errors.password}</p>
          )}
        </div>

        {/* age */}
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            name="age"
            className="form-control"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <p className="text-danger">{errors.age}</p>}
        </div>

        {/* Genre */}
        <div className="mb-3">
          <label className="form-label ">Genre</label>
          <div>
            <input
              type="radio"
              name="genre"
              value="Homme"
              checked={formData.genre === "Homme"}
              onChange={handleChange}
            />{" "}
            Homme
          </div>
          <div>
            <input
              type="radio"
              name="genre"
              value="Femme"
              checked={formData.genre === "Femme"}
              onChange={handleChange}
            />{" "}
            Femme
          </div>
          {errors.genre && <p className="text-danger">{errors.genre}</p>}
        </div>

        {/* Ville */}
        <div className="mb-3">
          <label className="form-label">Ville</label>
          <select
            name="ville"
            className="form-select"
            value={formData.ville}
            onChange={handleChange}
          >
            <option value="">-- Sélectionnez une ville --</option>
            <option value="Rabat">Rabat</option>
            <option value="Casablanca">Casablanca</option>
            <option value="Agadir">Agadir</option>
          </select>
          {errors.ville && <p className="text-danger">{errors.ville}</p>}
        </div>

        {/* Conditions */}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            name="conditions"
            className="form-check-input"
            checked={formData.conditions}
            onChange={handleChange}
          />
          <label className="form-check-label">J'accepte les conditions</label>
          {errors.conditions && (
            <p className="text-danger d-block">{errors.conditions}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          S'inscrire
        </button>
      </form>

      {/* Affichage des données */}
      {userData && (
        <div className="mt-4">
          <h4>Données enregistrées :</h4>
          <ul className="list-group">
            <li className="list-group-item">Nom : {userData.nom}</li>
            <li className="list-group-item">Email : {userData.email}</li>
            <li className="list-group-item">Mot de passe : {userData.password}</li>
            <li className="list-group-item">Age : {userData.age}</li>
            <li className="list-group-item">Genre : {userData.genre}</li>
            <li className="list-group-item">Ville : {userData.ville}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
