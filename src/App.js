import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';

const API_URL = 'http://localhost:3001/persons';

function App() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    loadPersons();
  }, []);

  function loadPersons() {
    axios.get(API_URL).then((response) => {
      setPersons(response.data);
    });
  }

  return (
    <div className="app">
      <Header />
      <div className="main">
        <Navigation />
        <div className="content">
          <h2>Osobe</h2>
          <p>Ucitano osoba: {persons.length}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
