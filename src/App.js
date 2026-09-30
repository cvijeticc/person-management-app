import { useState, useEffect, useMemo } from "react";
import {
  Stack,
  PrimaryButton,
  DefaultButton,
  Dialog,
  DialogType,
  DialogFooter,
  MessageBar,
  MessageBarType,
  Text,
} from "@fluentui/react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Filters from "./components/Filters";
import PersonTable from "./components/PersonTable";
import PersonForm from "./components/PersonForm";

const API_URL = "http://localhost:3001/persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [personToDelete, setPersonToDelete] = useState(null);

  useEffect(() => {
    loadPersons();
  }, []);
  //ove prazne uglaste zagrade na kraju govore reactu da se ovo pokrece jednom posle
  //prvog rendera i nikad vise

  function loadPersons() {
    // fetch(API_URL)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setPersons(data);
    //   });

    axios.get(API_URL).then((response) => {
      setPersons(response.data);
    });
  }

  function openNewForm() {
    // setSelectedPerson(null);
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
      axios.put(API_URL + "/" + selectedPerson.id, formData).then(() => {
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
    axios.delete(API_URL + "/" + id).then(() => {
      loadPersons();
    });
  }

  function confirmDelete() {
    deletePerson(personToDelete);
    setPersonToDelete(null);
  }

  // const userTypes = useMemo(() => {}, [persons])

  // tipovi korisnika se ne kucaju rucno, nego se izvlace iz liste osoba
  // Set cuva samo jedinstvene vrednosti pa ne mora da se proverava da li tip vec postoji
  const userTypesSet = new Set();
  persons.forEach((person) => {
    userTypesSet.add(person.userType);
  });
  const userTypes = [...userTypesSet];

  const filteredPersons = persons.filter((person) => {
    const imeOdgovara = person.name
      .toLowerCase()
      .startsWith(nameFilter.toLowerCase());
    const tipOdgovara = typeFilter === "" || person.userType === typeFilter;
    return imeOdgovara && tipOdgovara;
  });

  return (
    <div className="app">
      <Header />
      <Stack horizontal grow={true}>
        <Navigation />
        <Stack.Item grow styles={{ root: { padding: "20px" } }}>
          <Text variant="xLargePlus" block>
            Osobe
          </Text>
          <PrimaryButton
            text="Nova osoba"
            iconProps={{ iconName: "Add" }}
            onClick={openNewForm}
            styles={{ root: { margin: "15px 0" } }}
          />
          <Filters
            nameFilter={nameFilter}
            onNameFilterChange={setNameFilter} //ova 2 su zajedno
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter} //ova 2 su zajedno
            userTypes={userTypes}
          />
          {filteredPersons.length === 0 ? (
            <MessageBar messageBarType={MessageBarType.warning}>
              Ne postoji rezultat za zadate kriterijume pretrage.
            </MessageBar>
          ) : (
            <Text variant="small" block styles={{ root: { margin: "15px 0" } }}>
              Broj prikazanih osoba: {filteredPersons.length}
            </Text>
          )}
          {filteredPersons.length > 0 && (
            <PersonTable
              persons={filteredPersons}
              onEdit={openEditForm}
              onDelete={setPersonToDelete}
            />
          )}
          <Dialog
            hidden={personToDelete === null}
            onDismiss={() => setPersonToDelete(null)}
            dialogContentProps={{
              type: DialogType.normal,
              title: "Brisanje osobe",
              subText: "Da li ste sigurni da zelite da obrisete ovu osobu?",
            }}
          >
            <DialogFooter>
              <PrimaryButton text="Da" onClick={confirmDelete} />
              <DefaultButton text="Ne" onClick={() => setPersonToDelete(null)} />
              <DefaultButton
                text="Otkazi"
                onClick={() => setPersonToDelete(null)}
              />
            </DialogFooter>
          </Dialog>
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
