import { Stack, TextField, Dropdown } from "@fluentui/react";

interface FiltersProps {
  nameFilter: string;
  onNameFilterChange: (name: string) => void;
  typeFilter: string;
  onTypeFilterChange: (type: string) => void;
  userTypes: string[];
}

function Filters({
  nameFilter,
  onNameFilterChange,
  typeFilter,
  onTypeFilterChange,
  userTypes,
}: FiltersProps) {
  // Dropdown ocekuje niz objekata sa key i text
  const options = [
    { key: "", text: "Svi tipovi" },
    ...userTypes.map((type) => ({ key: type, text: type })),
  ];

  return (
    <Stack horizontal tokens={{ childrenGap: 15 }}>
      <TextField
        label="Pretraga po imenu"
        value={nameFilter}
        onChange={(event, newValue) => onNameFilterChange(newValue || "")} //kada se upise neko slovo
        //u textfield onda se prvo poziva ova linija koda i onda newValue postaje to slovo
        styles={{ root: { width: 220 } }}
      />
      <Dropdown
        label="Tip korisnika"
        selectedKey={typeFilter}
        options={options}
        onChange={(event, option) => onTypeFilterChange(String(option?.key))}
        styles={{ root: { width: 220 } }}
      />
    </Stack>
  );
}

export default Filters;
