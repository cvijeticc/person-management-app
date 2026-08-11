import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Filters from './components/Filters';
import PersonTable from './components/PersonTable';

const API_URL = 'http://localhost:3001/persons';

function App() {
  const [persons, setPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    loadPersons();
  }, []);

  function loadPersons() {
    axios.get(API_URL).then((response) => {
      setPersons(response.data);
    });
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().startsWith(nameFilter.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <div className="main">
        <Navigation />
        <div className="content">
          <h2>Osobe</h2>
          <Filters nameFilter={nameFilter} onNameFilterChange={setNameFilter} />
          <PersonTable persons={filteredPersons} />
        </div>
      </div>
    </div>
  );
}

export default App;
