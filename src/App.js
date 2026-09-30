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

// specijalni znaci u imenu (npr. "(") ne smeju da se tumace kao regex
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function App() {
  const [persons, setPersons] = useState([]);
  // sve osobe, potrebne samo da bi se izvukli tipovi korisnika za dropdown
  const [allPersons, setAllPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  // ime koje se stvarno salje serveru, azurira se tek 500ms nakon poslednjeg kucanja
  const [debouncedName, setDebouncedName] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [personToDelete, setPersonToDelete] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    // ako korisnik ukuca novo slovo pre isteka 500ms, cleanup otkazuje prethodni timer
    const timer = setTimeout(() => {
      setDebouncedName(nameFilter);
    }, 500);
    return () => clearTimeout(timer);
  }, [nameFilter]);

  useEffect(() => {
    loadAllPersons();
  }, []);

  useEffect(() => {
    loadPersons();
  }, [debouncedName, typeFilter]);
  //ucitavanje se pokrece na prvom renderu i svaki put kad se promeni ime (posle 500ms) ili tip

  function loadAllPersons() {
    axios.get(API_URL).then((response) => {
      setAllPersons(response.data);
    });
  }

  function loadPersons() {
    // fetch(API_URL + "?name_like=^" + debouncedName + "&userType=" + typeFilter)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setPersons(data);
    //   });

    // ime i tip filtriraju se na serveru
    // name_like je regex pa "^" znaci da ime pocinje tim slovima
    axios
      .get(API_URL, {
        params: {
          name_like: debouncedName ? "^" + escapeRegex(debouncedName) : undefined,
          userType: typeFilter || undefined,
        },
      })
      .then((response) => {
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
        loadAllPersons();
      });
    } else {
      axios.post(API_URL, formData).then(() => {
        closeForm();
        loadPersons();
        loadAllPersons();
      });
    }
  }

  function deletePerson(id) {
    axios.delete(API_URL + "/" + id).then(() => {
      loadPersons();
      loadAllPersons();
    });
  }

  function confirmDelete() {
    deletePerson(personToDelete);
    setPersonToDelete(null);
    setSelectedRow(null);
  }

  // isto ovo ali sa useMemo, racuna se samo kad se promeni lista osoba
  // const userTypes = useMemo(() => {
  //   const types = [];
  //   persons.forEach((person) => {
  //     if (!types.includes(person.userType)) {
  //       types.push(person.userType);
  //     }
  //   });
  //   return types;
  // }, [persons]);

  // tipovi korisnika se ne kucaju rucno, nego se izvlace iz liste osoba
  // Set cuva samo jedinstvene vrednosti pa ne mora da se proverava da li tip vec postoji
  const userTypesSet = new Set();
  allPersons.forEach((person) => {
    userTypesSet.add(person.userType);
  });
  const userTypes = [...userTypesSet];

  return (
    <div className="app">
      <Header />
      <Stack horizontal grow={true}>
        <Navigation />
        <Stack.Item grow styles={{ root: { padding: "20px" } }}>
          <Text variant="xLargePlus" block>
            Osobe
          </Text>
          <Stack
            horizontal
            horizontalAlign="space-between"
            verticalAlign="center"
            styles={{ root: { margin: "15px 0" } }}
          >
            <PrimaryButton
              text="Nova osoba"
              iconProps={{ iconName: "Add" }}
              onClick={openNewForm}
            />
            {/* dugmad se pojavljuju tek kad je neki red selektovan */}
            {selectedRow && (
              <Stack horizontal tokens={{ childrenGap: 8 }}>
                <DefaultButton
                  text="Izmeni"
                  onClick={() => openEditForm(selectedRow)}
                />
                <DefaultButton
                  text="Obrisi"
                  onClick={() => setPersonToDelete(selectedRow.id)}
                />
              </Stack>
            )}
          </Stack>
          <Filters
            nameFilter={nameFilter}
            onNameFilterChange={setNameFilter} //ova 2 su zajedno
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter} //ova 2 su zajedno
            userTypes={userTypes}
          />
          {persons.length === 0 ? (
            <MessageBar messageBarType={MessageBarType.warning}>
              Ne postoji rezultat za zadate kriterijume pretrage.
            </MessageBar>
          ) : (
            <Text variant="small" block styles={{ root: { margin: "15px 0" } }}>
              Broj prikazanih osoba: {persons.length}
            </Text>
          )}
          {persons.length > 0 && (
            <PersonTable
              persons={persons}
              onSelectionChange={setSelectedRow}
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
