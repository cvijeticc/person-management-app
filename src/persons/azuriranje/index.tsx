import { useState } from "react";
import {
  DefaultButton,
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DialogContent,
  TextField,
} from "@fluentui/react";
import * as Api from "../api";

type Form = {
  name: string;
  surname: string;
  userType: string;
  city: string;
  address: string;
};

const INIT_FORM = (original: Api.Person | null): Form => ({
  name: original ? original.name : "",
  surname: original ? original.surname : "",
  userType: original ? original.userType : "",
  city: original ? original.city : "",
  address: original ? original.address : "",
});

export type AzuriranjeState = {
  original: Api.Person | null;
  isVisible: boolean;
};

export type Props = AzuriranjeState & {
  onCancel: () => void;
};

const Azuriranje: React.FC<Props> = ({ onCancel, isVisible, original }) => {
  const [form, setForm] = useState<Form>(INIT_FORM(original));

  // Datum kreiranja je datum kada je objekat kreiran. Nema potrebe da se bira iz kalendara
  // Tip korisnika je ponudjen iz liste izvedene iz trenutne baze, mozda da se napravi takav izbor?

  const onSave = () => {
    // Dodaj logiku za cuvanje.
    // Ako je uspesno, zatvori dialog.
  };

  return (
    <Dialog
      hidden={!isVisible}
      onDismiss={onCancel}
      dialogContentProps={{
        type: DialogType.normal,
        title: "Nova osoba",
      }}
    >
      <DialogContent>
        <TextField
          label="Ime"
          value={form.name}
          required={true}
          onChange={(_, newValue) => setForm({ ...form, name: newValue || "" })}
        />
        <TextField
          label="Prezime"
          value={form.surname}
          required={true}
          onChange={(_, newValue) =>
            setForm({ ...form, surname: newValue || "" })
          }
        />
        <TextField
          label="Tip korisnika"
          value={form.userType}
          required={true}
          onChange={(_, newValue) =>
            setForm({ ...form, userType: newValue || "" })
          }
        />
        <TextField
          label="Grad"
          value={form.city}
          required={true}
          onChange={(_, newValue) => setForm({ ...form, city: newValue || "" })}
        />
        <TextField
          label="Adresa"
          value={form.address}
          required={true}
          onChange={(_, newValue) =>
            setForm({ ...form, address: newValue || "" })
          }
        />
      </DialogContent>
      <DialogFooter>
        <PrimaryButton onClick={onSave} text="Sacuvaj" />
        <DefaultButton onClick={onCancel} text="Odustani" />
      </DialogFooter>
    </Dialog>
  );
};

export default Azuriranje;
