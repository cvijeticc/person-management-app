import { Stack, TextField, Dropdown, IDropdownOption } from "@fluentui/react";
import * as Api from "../api";

export const getUserType = (data: Api.Person[]): IDropdownOption[] => {
  const set = new Set(data.map((user) => user.userType));
  return Array.from(set).map((value) => ({
    key: value.toLowerCase(),
    text: value,
  }));
};

export type FilterState = {
  isVisible: boolean;
  selectedUserType: string | null;
  userName: string;
  userTypes: IDropdownOption[];
};

export type Props = FilterState & {
  onChangeUserType: (key: string | null) => void;
  onChangeUserName: (value: string) => void;
};

const Filter: React.FC<Props> = ({
  isVisible,
  selectedUserType,
  userTypes,
  userName,
  onChangeUserType,
  onChangeUserName,
}) => {
  if (!isVisible) return null;

  return (
    <Stack horizontal={true} tokens={{ childrenGap: 10 }}>
      <TextField
        label="Ime"
        placeholder="Unesite ime..."
        value={userName}
        onChange={(_, newValue) => onChangeUserName(newValue || "")}
      />
      <Dropdown
        label="Tip korisnika"
        placeholder="Odaberi tip korisnika..."
        selectedKey={selectedUserType}
        options={userTypes}
        onChange={(_, option) => {
          if (!option) return onChangeUserType(null);
          return onChangeUserType(String(option.key));
        }}
        styles={{ root: { width: 250 } }}
      />
    </Stack>
  );
};

export default Filter;
