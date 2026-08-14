import { Stack, TextField, Dropdown } from '@fluentui/react';

function Filters({
  nameFilter,
  onNameFilterChange,
  typeFilter,
  onTypeFilterChange,
  userTypes,
}) {
  // Dropdown ocekuje niz objekata sa key i text
  const options = [
    { key: '', text: 'Svi tipovi' },
    ...userTypes.map((type) => ({ key: type, text: type })),
  ];

  return (
    <Stack horizontal tokens={{ childrenGap: 15 }}>
      <TextField
        label="Pretraga po imenu"
        value={nameFilter}
        onChange={(event, newValue) => onNameFilterChange(newValue || '')}
        styles={{ root: { width: 220 } }}
      />
      <Dropdown
        label="Tip korisnika"
        selectedKey={typeFilter}
        options={options}
        onChange={(event, option) => onTypeFilterChange(option.key)}
        styles={{ root: { width: 220 } }}
      />
    </Stack>
  );
}

export default Filters;
