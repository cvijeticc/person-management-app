import { useState } from 'react';
import {
  Dialog,
  DialogType,
  DialogFooter,
  TextField,
  PrimaryButton,
  DefaultButton,
  MessageBar,
  MessageBarType,
} from '@fluentui/react';

function PersonForm({ person, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: person ? person.name : '',
    surname: person ? person.surname : '',
    userType: person ? person.userType : '',
    createdDate: person ? person.createdDate : '',
    city: person ? person.city : '',
    address: person ? person.address : '',
  });
  const [error, setError] = useState('');

  function handleChange(field, newValue) {
    setFormData({ ...formData, [field]: newValue || '' });
  }

  function handleSave() {
    // Fluent-ov required samo prikaze zvezdicu, ne zaustavlja cuvanje,
    // pa se prazna polja moraju proveriti rucno
    const imaPraznih = Object.values(formData).some(
      (value) => value.trim() === ''
    );
    if (imaPraznih) {
      setError('Sva polja su obavezna.');
      return;
    }
    onSave(formData);
  }

  return (
    <Dialog
      hidden={false}
      onDismiss={onCancel}
      dialogContentProps={{
        type: DialogType.normal,
        title: person ? 'Izmena osobe' : 'Nova osoba',
      }}
    >
      {error && (
        <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>
      )}

      <TextField
        label="Ime"
        required
        value={formData.name}
        onChange={(event, newValue) => handleChange('name', newValue)}
      />
      <TextField
        label="Prezime"
        required
        value={formData.surname}
        onChange={(event, newValue) => handleChange('surname', newValue)}
      />
      <TextField
        label="Tip korisnika"
        required
        value={formData.userType}
        onChange={(event, newValue) => handleChange('userType', newValue)}
      />
      <TextField
        label="Datum kreiranja"
        type="date"
        required
        value={formData.createdDate}
        onChange={(event, newValue) => handleChange('createdDate', newValue)}
      />
      <TextField
        label="Grad"
        required
        value={formData.city}
        onChange={(event, newValue) => handleChange('city', newValue)}
      />
      <TextField
        label="Adresa"
        required
        value={formData.address}
        onChange={(event, newValue) => handleChange('address', newValue)}
      />

      <DialogFooter>
        <PrimaryButton text="Sacuvaj" onClick={handleSave} />
        <DefaultButton text="Otkazi" onClick={onCancel} />
      </DialogFooter>
    </Dialog>
  );
}

export default PersonForm;
