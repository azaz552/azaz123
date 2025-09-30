import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Country() {
 
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

 
  const [nom, setNom] = useState("");
  const [capital, setCapital] = useState("");
  const [flag, setFlag] = useState("");
  const [continent, setContinent] = useState("");
  const [editingId, setEditingId] = useState(null);


  const addCountry = () => {
    const newCountry = { id: Date.now(), nom, capital, flag, continent };
    setCountries([...countries, newCountry]);
    resetForm();
  };


  const deleteCountry = (id) => {
    setCountries(countries.filter((c) => c.id !== id));
  };


  const editCountry = (country) => {
    setEditingId(country.id);
    setNom(country.nom);
    setCapital(country.capital);
    setFlag(country.flag);
    setContinent(country.continent);
  };

  const updateCountry = () => {
    setCountries(
      countries.map((c) =>
        c.id === editingId ? { ...c, nom, capital, flag, continent } : c
      )
    );
    setEditingId(null);
    resetForm();
  };


  const resetForm = () => {
    setNom("");
    setCapital("");
    setFlag("");
    setContinent("");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3"> Gestion des Pays</h2>

      {/* Formulaire */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editingId ? updateCountry() : addCountry();
        }}
        className="mb-4"
      >
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Nom du pays"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Capitale"
          value={capital}
          onChange={(e) => setCapital(e.target.value)}
          required
        />
        <input
          type="url"
          className="form-control mb-2"
          placeholder="URL du drapeau"
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          required
        />
        <select
          className="form-control mb-2"
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
          required
        >
          <option value="">Choisir un continent</option>
          <option>Afrique</option>
          <option>Europe</option>
          <option>Asie</option>
          <option>Amérique</option>
          <option>Océanie</option>
        </select>

        <button type="submit" className="btn btn-primary">
          {editingId ? "Mettre à jour" : "Ajouter"}
        </button>
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

export default Country;
