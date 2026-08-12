import { useState } from 'react';

function PersonForm({ person, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: person ? person.name : '',
    surname: person ? person.surname : '',
    userType: person ? person.userType : '',
    createdDate: person ? person.createdDate : '',
    city: person ? person.city : '',
    address: person ? person.address : '',
  });

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(formData);
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{person ? 'Izmena osobe' : 'Nova osoba'}</h3>
        <form onSubmit={handleSubmit}>
          <label>Ime</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Prezime</label>
          <input
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />

          <label>Tip korisnika</label>
          <input
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
          />

          <label>Datum kreiranja</label>
          <input
            type="date"
            name="createdDate"
            value={formData.createdDate}
            onChange={handleChange}
            required
          />

          <label>Grad</label>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <label>Adresa</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <div className="modal-buttons">
            <button type="submit">Sacuvaj</button>
            <button type="button" onClick={onCancel}>
              Otkazi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PersonForm;
