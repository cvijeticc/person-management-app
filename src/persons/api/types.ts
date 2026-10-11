export type Person = {
  id: number;
  name: string;
  surname: string;
  userType: string;
  createdDate: string;
  city: string;
  address: string;
};

export type PersonKreiranjeCmd = {
  name: string;
  surname: string;
  userType: string;
  createdDate: string;
  city: string;
  address: string;
};

// Primeri tipova podataka:

export type PersonCriteria = {
  // TODO: Dodaj po cemu pretrazujes
};

export type PersonOrder = {
  // TODO: Dodaj po cemu vrsis order
};

export type PersonAzuriranjeCmd = {
  // TODO: Dodaj polja za azuriranje
};
