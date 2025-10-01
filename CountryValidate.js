import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function CountryValidate() {
  const [countries, setCountries] = useState([
    {
      id: 1,
      nom: "Maroc",
      capital: "Rabat",
      flag: "https://flagcdn.com/w320/ma.png",
      continent: "Afrique",
    },
    {
      id: 2,
      nom: "France",
      capital: "Paris",
      flag: "https://flagcdn.com/w320/fr.png",
      continent: "Europe",
    },
  ]);

  // États du formulaire
  const [nom, setNom] = useState("");
  const [capital, setCapital] = useState("");
  const [flag, setFlag] = useState("");
  const [continent, setContinent] = useState("");
  const [editingId, setEditingId] = useState(null);

  // erreurs
  const [errors, setErrors] = useState({});

  // Validation
  const validateForm = () => {
    let formErrors = {};

    if (!nom.trim()) formErrors.nom = "Le nom du pays est obligatoire.";
    else if (nom.trim().length < 3)
      formErrors.nom = "Le nom doit contenir au moins 3 caractères.";

    if (!capital.trim())
      formErrors.capital = "La capitale est obligatoire.";
    else if (capital.trim().length < 3)
      formErrors.capital = "La capitale doit contenir au moins 3 caractères.";

    if (!flag.trim()) formErrors.flag = "Le lien du drapeau est obligatoire.";
    else if (!flag.startsWith("http"))
      formErrors.flag = "Le lien doit être une URL valide.";

    if (!continent) formErrors.continent = "Le continent est obligatoire.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Ajouter
  const addCountry = () => {
    if (!validateForm()) return;
    const newCountry = { id: Date.now(), nom, capital, flag, continent };
    setCountries([...countries, newCountry]);
    resetForm();
  };

  // Supprimer
  const deleteCountry = (id) => {
    setCountries(countries.filter((c) => c.id !== id));
  };

  // Modifier (charger les données dans le form)
  const editCountry = (country) => {
    setEditingId(country.id);
    setNom(country.nom);
    setCapital(country.capital);
    setFlag(country.flag);
    setContinent(country.continent);
    setErrors({});
  };

  // Mettre à jour
  const updateCountry = () => {
    if (!validateForm()) return;
    setCountries(
      countries.map((c) =>
        c.id === editingId ? { ...c, nom, capital, flag, continent } : c
      )
    );
    setEditingId(null);
    resetForm();
  };

  // Réinitialiser
  const resetForm = () => {
    setNom("");
    setCapital("");
    setFlag("");
    setContinent("");
    setErrors({});
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Gestion des Pays</h2>

      {/* Formulaire */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editingId ? updateCountry() : addCountry();
        }}
        className="mb-4 card p-3 shadow-sm"
      >
        {/* Nom */}
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Nom du pays"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        {errors.nom && <p className="text-danger">{errors.nom}</p>}

        {/* Capitale */}
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Capitale"
          value={capital}
          onChange={(e) => setCapital(e.target.value)}
        />
        {errors.capital && <p className="text-danger">{errors.capital}</p>}

        {/* URL drapeau */}
        <input
          type="url"
          className="form-control mb-2"
          placeholder="URL du drapeau"
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
        />
        {errors.flag && <p className="text-danger">{errors.flag}</p>}

        {/* Continent */}
        <select
          className="form-control mb-2"
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
        >
          <option value="">Choisir un continent</option>
          <option>Afrique</option>
          <option>Europe</option>
          <option>Asie</option>
          <option>Amérique</option>
          <option>Océanie</option>
        </select>
        {errors.continent && <p className="text-danger">{errors.continent}</p>}

        <button type="submit" className="btn btn-primary">
          {editingId ? "Mettre à jour" : "Ajouter"}
        </button>
        {editingId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={resetForm}
          >
            Annuler
          </button>
        )}
      </form>

      {/* Liste des pays */}
      <div className="row">
        {countries.map((c) => (
          <div className="col-md-4 mb-3" key={c.id}>
            <div className="card">
              <img
                src={c.flag}
                alt={c.nom}
                className="card-img-top"
                style={{ height: "150px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{c.nom}</h5>
                <p className="card-text">
                  Capitale : {c.capital} <br />
                  Continent : {c.continent}
                </p>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editCountry(c)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteCountry(c.id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryValidate;
