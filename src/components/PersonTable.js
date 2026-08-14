import {
  DetailsList,
  SelectionMode,
  DefaultButton,
  Stack,
} from '@fluentui/react';

// DetailsList ne cita polja sam - mora mu se opisati svaka kolona
const columns = [
  { key: 'id', name: 'Id', fieldName: 'id', minWidth: 25, maxWidth: 35 },
  { key: 'name', name: 'Ime', fieldName: 'name', minWidth: 70, maxWidth: 100 },
  {
    key: 'surname',
    name: 'Prezime',
    fieldName: 'surname',
    minWidth: 80,
    maxWidth: 110,
  },
  {
    key: 'userType',
    name: 'Tip korisnika',
    fieldName: 'userType',
    minWidth: 90,
    maxWidth: 110,
  },
  {
    key: 'createdDate',
    name: 'Datum kreiranja',
    fieldName: 'createdDate',
    minWidth: 100,
    maxWidth: 110,
  },
  { key: 'city', name: 'Grad', fieldName: 'city', minWidth: 70, maxWidth: 100 },
  {
    key: 'address',
    name: 'Adresa',
    fieldName: 'address',
    minWidth: 130,
    maxWidth: 180,
  },
  { key: 'actions', name: 'Akcije', minWidth: 150 },
];

function PersonTable({ persons, onEdit, onDelete }) {
  // poziva se za svaku celiju - za kolonu "actions" vracamo dugmad,
  // a za sve ostale obicnu vrednost iz objekta
  function renderItemColumn(person, index, column) {
    if (column.key === 'actions') {
      return (
        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <DefaultButton text="Izmeni" onClick={() => onEdit(person)} />
          <DefaultButton text="Obrisi" onClick={() => onDelete(person.id)} />
        </Stack>
      );
    }
    return person[column.fieldName];
  }

  return (
    <DetailsList
      items={persons}
      columns={columns}
      getKey={(person) => person.id}
      selectionMode={SelectionMode.none}
      onRenderItemColumn={renderItemColumn}
    />
  );
}

export default PersonTable;
