import axios from "axios";
import { PERSONS_URL, personUrl } from "./routes";
import { Person, PersonFormData, PersonsQuery, PersonsResponse } from "./types";

// specijalni znaci u imenu (npr. "(") ne smeju da se tumace kao regex
function escapeRegex(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function getPersons(query: PersonsQuery): Promise<PersonsResponse> {
  // fetch(PERSONS_URL + "?name_like=^" + query.name + "&userType=" + query.userType + "&_sort=" + query.sortField + "&_order=" + (query.sortDescending ? "desc" : "asc") + "&_page=" + query.page + "&_limit=" + query.pageSize)
  //   .then((response) => {
  //     const totalCount = Number(response.headers.get("X-Total-Count"));
  //     return response.json().then((persons) => ({ persons, totalCount }));
  //   });

  // ime i tip filtriraju se na serveru, a server vraca samo jednu stranu
  // ukupan broj osoba stize u headeru X-Total-Count
  // name_like je regex pa "^" znaci da ime pocinje tim slovima
  return axios
    .get<Person[]>(PERSONS_URL, {
      params: {
        name_like: query.name ? "^" + escapeRegex(query.name) : undefined,
        userType: query.userType || undefined,
        _sort: query.sortField || undefined,
        _order: query.sortDescending ? "desc" : "asc",
        _page: query.page,
        _limit: query.pageSize,
      },
    })
    .then((response) => ({
      persons: response.data,
      totalCount: Number(response.headers["x-total-count"]),
    }));
}

export function getAllPersons(): Promise<Person[]> {
  return axios.get<Person[]>(PERSONS_URL).then((response) => response.data);
}

export function createPerson(formData: PersonFormData) {
  return axios.post(PERSONS_URL, formData);
}

export function updatePerson(id: number, formData: PersonFormData) {
  return axios.put(personUrl(id), formData);
}

export function deletePerson(id: number) {
  return axios.delete(personUrl(id));
}
