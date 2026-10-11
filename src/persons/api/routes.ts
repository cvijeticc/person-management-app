import { get, post } from "../../common/api";
import { Person, PersonKreiranjeCmd } from "./types";

export const getPersons = () => get<Person[]>("persons");

export const createPerson = (person: PersonKreiranjeCmd) =>
  post<PersonKreiranjeCmd>("person", person);
