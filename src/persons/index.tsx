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
import PersonTable from "../components/PersonTable";
import PersonForm from "../components/PersonForm";
import Pagination from "../components/Pagination";
import Filters from "./filter";
import {
  getPersons,
  getAllPersons,
  createPerson,
  updatePerson,
  deletePerson,
} from "./api";
import { Person, PersonFormData } from "./api/types";

const PAGE_SIZE = 10;

function Persons() {
  const [persons, setPersons] = useState<Person[]>([]);
  // sve osobe, potrebne samo da bi se izvukli tipovi korisnika za dropdown
  const [allPersons, setAllPersons] = useState<Person[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [nameFilter, setNameFilter] = useState("");
  // ime koje se stvarno salje serveru, azurira se tek 500ms nakon poslednjeg kucanja
  const [debouncedName, setDebouncedName] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [personToEdit, setPersonToEdit] = useState<Person | null>(null);
  const [personToDelete, setPersonToDelete] = useState<number | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState("");
  const [sortDescending, setSortDescending] = useState(false);

  useEffect(() => {
    // ako korisnik ukuca novo slovo pre isteka 500ms, cleanup otkazuje prethodni timer
    const timer = setTimeout(() => {
      setDebouncedName(nameFilter);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [nameFilter]);

  useEffect(() => {
    loadAllPersons();
  }, []);

  useEffect(() => {
    loadPersons();
  }, [debouncedName, typeFilter, page, sortField, sortDescending]);
  //ucitavanje se pokrece na prvom renderu i svaki put kad se promeni ime (posle 500ms), tip, strana ili sortiranje

  function loadAllPersons() {
    getAllPersons().then(setAllPersons);
  }

  function loadPersons() {
    getPersons({
      name: debouncedName,
      userType: typeFilter,
      sortField,
      sortDescending,
      page,
      pageSize: PAGE_SIZE,
    }).then((result) => {
      // ako je obrisana poslednja osoba sa poslednje strane vrati se na prethodnu
      if (result.persons.length === 0 && page > 1) {
        setPage(page - 1);
        return;
      }
      setPersons(result.persons);
      setTotalCount(result.totalCount);
    });
  }

  // prvi klik na kolonu sortira rastuce (Id opadajuce), svaki sledeci klik na istu kolonu okrece smer
  function sortBy(field: string) {
    if (field === sortField) {
      setSortDescending(!sortDescending);
    } else {
      setSortField(field);
      setSortDescending(field === "id");
    }
    setPage(1);
  }

  function openNewForm() {
    // setPersonToEdit(null);
    setIsFormOpen(true);
  }

  function openEditForm(person: Person) {
    setPersonToEdit(person);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setPersonToEdit(null);
  }

  function savePerson(formData: PersonFormData) {
    if (personToEdit) {
      updatePerson(personToEdit.id, formData).then(() => {
        closeForm();
        loadPersons();
        loadAllPersons();
      });
    } else {
      createPerson(formData).then(() => {
        closeForm();
        loadPersons();
        loadAllPersons();
      });
    }
  }

  function confirmDelete() {
    if (personToDelete !== null) {
      deletePerson(personToDelete).then(() => {
        loadPersons();
        loadAllPersons();
      });
    }
    setPersonToDelete(null);
    setSelectedPerson(null);
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
  const userTypesSet = new Set<string>();
  allPersons.forEach((person) => {
    userTypesSet.add(person.userType);
  });
  const userTypes = Array.from(userTypesSet);

  return (
    <>
      {/* sve u jednom redu: naslov, Nova osoba, Filteri, filteri (kad su otvoreni), Izmeni i Obrisi (kad je red selektovan) */}
      <Stack
        horizontal
        verticalAlign="center"
        tokens={{ childrenGap: 10 }}
        styles={{ root: { margin: "0 0 10px 0" } }}
      >
        <Text variant="xLargePlus" styles={{ root: { marginRight: 10 } }}>
          Osobe
        </Text>
        <PrimaryButton
          text="Nova osoba"
          iconProps={{ iconName: "Add" }}
          onClick={openNewForm}
        />
        <DefaultButton
          text="Filteri"
          iconProps={{ iconName: "Filter" }}
          onClick={() => setShowFilters(!showFilters)}
        />
        {showFilters && (
          <Filters
            nameFilter={nameFilter}
            onNameFilterChange={setNameFilter} //ova 2 su zajedno
            typeFilter={typeFilter}
            onTypeFilterChange={(type) => {
              setTypeFilter(type);
              setPage(1);
            }} //ova 2 su zajedno
            userTypes={userTypes}
          />
        )}
        {selectedPerson && (
          <DefaultButton
            text="Izmeni"
            onClick={() => openEditForm(selectedPerson)}
          />
        )}
        {selectedPerson && (
          <DefaultButton
            text="Obrisi"
            onClick={() => setPersonToDelete(selectedPerson.id)}
          />
        )}
      </Stack>
      {persons.length === 0 ? (
        <MessageBar messageBarType={MessageBarType.warning}>
          Ne postoji rezultat za zadate kriterijume pretrage.
        </MessageBar>
      ) : (
        <Text variant="small" block styles={{ root: { margin: "0 0 10px 0" } }}>
          Broj prikazanih osoba: od {(page - 1) * PAGE_SIZE + 1} do{" "}
          {(page - 1) * PAGE_SIZE + persons.length}
        </Text>
      )}
      {persons.length > 0 && (
        <div className="table-container">
          <PersonTable
            persons={persons}
            onSelectionChange={setSelectedPerson}
            sortField={sortField}
            sortDescending={sortDescending}
            onSort={sortBy}
          />
        </div>
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
      <Pagination
        page={page}
        totalPages={Math.ceil(totalCount / PAGE_SIZE)}
        onPageChange={setPage}
      />
      {isFormOpen && (
        <PersonForm
          person={personToEdit}
          onSave={savePerson}
          onCancel={closeForm}
        />
      )}
    </>
  );
}

export default Persons;
