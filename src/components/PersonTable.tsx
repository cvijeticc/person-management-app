import { useState, useRef } from "react";
import {
  DetailsList,
  SelectionMode,
  Selection,
  ScrollablePane,
  Sticky,
  StickyPositionType,
  IColumn,
  IDetailsListProps,
  IDetailsHeaderProps,
  IRenderFunction,
} from "@fluentui/react";
import { Person } from "../persons/api/types";

// DetailsList ne cita polja sam - mora mu se opisati svaka kolona
const columns: IColumn[] = [
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

interface PersonTableProps {
  persons: Person[];
  onSelectionChange: (person: Person | null) => void;
  sortField: string;
  sortDescending: boolean;
  onSort: (field: string) => void;
}

function PersonTable({
  persons,
  onSelectionChange,
  sortField,
  sortDescending,
  onSort,
}: PersonTableProps) {
  //ovde se prima props iz App.js
  // Selection pamti koji je red selektovan, a kad se selekcija promeni
  // javlja se App.js-u koja je osoba selektovana (ili null ako nije nijedna)
  const [selection] = useState(
    () =>
      new Selection({
        onSelectionChanged: () => {
          // Selection vraca opste objekte pa se kaze TypeScript-u da je to Person
          onSelectionChange((selection.getSelection()[0] as Person) || null);
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
  const renderHeader: IRenderFunction<IDetailsHeaderProps> = (
    props,
    defaultRender
  ) => {
    if (!props || !defaultRender) {
      return null;
    }
    return (
      <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced>
        {defaultRender(props)}
      </Sticky>
    );
  }

  // klik na vec selektovan red ga odselektuje
  // Fluent selektuje red vec na pritisak misa (mousedown), zato se pamti da li je red
  // bio selektovan pre pritiska, pa ako jeste odselektuje se kad se klik zavrsi
  const wasSelected = useRef<boolean>(false);

  const renderRow: IDetailsListProps["onRenderRow"] = (props, defaultRender) => {
    if (!props || !defaultRender) {
      return null;
    }
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
