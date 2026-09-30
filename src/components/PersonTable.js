import { useState, useRef } from "react";
import {
  DetailsList,
  SelectionMode,
  Selection,
  ScrollablePane,
  Sticky,
  StickyPositionType,
} from "@fluentui/react";

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
    minWidth: 115,
    maxWidth: 165,
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

  // zaglavlje tabele ostaje na vrhu dok se redovi skroluju
  function renderHeader(props, defaultRender) {
    return (
      <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced>
        {defaultRender(props)}
      </Sticky>
    );
  }

  // klik na vec selektovan red ga odselektuje
  // Fluent selektuje red vec na pritisak misa (mousedown), zato se pamti da li je red
  // bio selektovan pre pritiska, pa ako jeste odselektuje se kad se klik zavrsi
  const wasSelected = useRef(false);

  function renderRow(props, defaultRender) {
    const index = props.itemIndex;
    return (
      <div
        onMouseDownCapture={() => {
          wasSelected.current = selection.isIndexSelected(index);
        }}
        onClick={() => {
          if (wasSelected.current) {
            wasSelected.current = false;
            setTimeout(() => selection.setIndexSelected(index, false, false), 0);
          }
        }}
      >
        {defaultRender(props)}
      </div>
    );
  }

  return (
    <ScrollablePane styles={{ contentContainer: { overflowX: "hidden" } }}>
      <DetailsList
        items={persons}
        columns={sortableColumns}
        getKey={(person) => person.id}
        selection={selection}
        selectionMode={SelectionMode.single}
        onRenderDetailsHeader={renderHeader}
        onRenderRow={renderRow}
        styles={{ root: { overflowX: "hidden" } }} // i sama lista ima svoj horizontalni skrol
      />
    </ScrollablePane>
  );
}

export default PersonTable;
