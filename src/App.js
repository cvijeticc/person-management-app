import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Filters from './components/Filters';
import PersonTable from './components/PersonTable';
import PersonForm from './components/PersonForm';

const API_URL = 'http://localhost:3001/persons';

function App() {
  const [persons, setPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    loadPersons();
  }, []);

  function loadPersons() {
    axios.get(API_URL).then((response) => {
      setPersons(response.data);
    });
  }

  function openNewForm() {
    setSelectedPerson(null);
    setIsFormOpen(true);
  }

  function openEditForm(person) {
    setSelectedPerson(person);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setSelectedPerson(null);
  }

  function savePerson(formData) {
    if (selectedPerson) {
      axios.put(API_URL + '/' + selectedPerson.id, formData).then(() => {
        closeForm();
        loadPersons();
      });
    } else {
      axios.post(API_URL, formData).then(() => {
        closeForm();
        loadPersons();
      });
    }
  }

  // tipovi korisnika se ne kucaju rucno, nego se izvlace iz liste osoba
  const userTypes = [];
  persons.forEach((person) => {
    if (!userTypes.includes(person.userType)) {
      userTypes.push(person.userType);
    }
  });

  const filteredPersons = persons.filter((person) => {
    const imeOdgovara = person.name
      .toLowerCase()
      .startsWith(nameFilter.toLowerCase());
    const tipOdgovara = typeFilter === '' || person.userType === typeFilter;
    return imeOdgovara && tipOdgovara;
  });

  return (
    <div className="app">
      <Header />
      <div className="main">
        <Navigation />
        <div className="content">
          <h2>Osobe</h2>
          <button className="new-button" onClick={openNewForm}>
            Nova osoba
          </button>
          <Filters
            nameFilter={nameFilter}
            onNameFilterChange={setNameFilter}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            userTypes={userTypes}
          />
          {filteredPersons.length === 0 ? (
            <p className="no-results">
              Ne postoji rezultat za zadate kriterijume pretrage.
            </p>
          ) : (
            <PersonTable persons={filteredPersons} onEdit={openEditForm} />
          )}
          {isFormOpen && (
            <PersonForm
              person={selectedPerson}
              onSave={savePerson}
              onCancel={closeForm}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
