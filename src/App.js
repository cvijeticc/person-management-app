import { useState, useEffect } from 'react';
import {
  Stack,
  PrimaryButton,
  MessageBar,
  MessageBarType,
  Text,
} from '@fluentui/react';
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

  function deletePerson(id) {
    if (window.confirm('Da li ste sigurni da zelite da obrisete ovu osobu?')) {
      axios.delete(API_URL + '/' + id).then(() => {
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
      <Stack horizontal styles={{ root: { minHeight: 'calc(100vh - 62px)' } }}>
        <Navigation />
        <Stack.Item grow className="content">
          <Text variant="xLargePlus" block>
            Osobe
          </Text>
          <PrimaryButton
            text="Nova osoba"
            iconProps={{ iconName: 'Add' }}
            onClick={openNewForm}
            styles={{ root: { margin: '15px 0' } }}
          />
          <Filters
            nameFilter={nameFilter}
            onNameFilterChange={setNameFilter}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            userTypes={userTypes}
          />
          {filteredPersons.length === 0 ? (
            <MessageBar messageBarType={MessageBarType.warning}>
              Ne postoji rezultat za zadate kriterijume pretrage.
            </MessageBar>
          ) : (
            <Text variant="small" block styles={{ root: { margin: '15px 0' } }}>
              Broj prikazanih osoba: {filteredPersons.length}
            </Text>
          )}
          {filteredPersons.length > 0 && (
            <PersonTable
              persons={filteredPersons}
              onEdit={openEditForm}
              onDelete={deletePerson}
            />
          )}
          {isFormOpen && (
            <PersonForm
              person={selectedPerson}
              onSave={savePerson}
              onCancel={closeForm}
            />
          )}
        </Stack.Item>
      </Stack>
    </div>
  );
}

export default App;
