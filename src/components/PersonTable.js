import { useState } from "react";
import { DetailsList, SelectionMode, Selection } from "@fluentui/react";

// DetailsList ne cita polja sam - mora mu se opisati svaka kolona
const columns = [
  { key: "id", name: "Id", fieldName: "id", minWidth: 25, maxWidth: 35 },
  { key: "name", name: "Ime", fieldName: "name", minWidth: 70, maxWidth: 100 },
  {
    key: "surname",
    name: "Prezime",
    fieldName: "surname",
    minWidth: 80,
    maxWidth: 110,
  },
  {
    key: "userType",
    name: "Tip korisnika",
    fieldName: "userType",
    minWidth: 90,
    maxWidth: 110,
  },
  {
    key: "createdDate",
    name: "Datum kreiranja",
    fieldName: "createdDate",
    minWidth: 100,
    maxWidth: 110,
  },
  { key: "city", name: "Grad", fieldName: "city", minWidth: 70, maxWidth: 100 },
  {
    key: "address",
    name: "Adresa",
    fieldName: "address",
    minWidth: 130,
    maxWidth: 180,
  },
];

function PersonTable({
  persons,
  onSelectionChange,
  sortField,
  sortDescending,
  onSort,
}) {
  //ovde se prima props iz App.js
  // Selection pamti koji je red selektovan, a kad se selekcija promeni
  // javlja se App.js-u koja je osoba selektovana (ili null ako nije nijedna)
  const [selection] = useState(
    () =>
      new Selection({
        onSelectionChanged: () => {
          onSelectionChange(selection.getSelection()[0] || null);
        },
      }),
  );

  // svakoj koloni se dodaje strelica za sortiranje i klik koji javlja App.js-u koja je kolona kliknuta
  const sortableColumns = columns.map((column) => ({
    ...column,
    isSorted: column.key === sortField,
    isSortedDescending: sortDescending,
    onColumnClick: () => onSort(column.key),
  }));

  return (
    <DetailsList
      items={persons}
      columns={sortableColumns}
      getKey={(person) => person.id}
      selection={selection}
      selectionMode={SelectionMode.single}
    />
  );
}

export default PersonTable;
