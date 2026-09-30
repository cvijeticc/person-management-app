export interface Person {
  id: number;
  name: string;
  surname: string;
  userType: string;
  createdDate: string;
  city: string;
  address: string;
}

// podaci iz forme, id dodeljuje server
export type PersonFormData = Omit<Person, "id">;

// sta se salje serveru kad se traze osobe
export interface PersonsQuery {
  name: string;
  userType: string;
  sortField: string;
  sortDescending: boolean;
  page: number;
  pageSize: number;
}

export interface PersonsResponse {
  persons: Person[];
  totalCount: number;
}
