export const PERSONS_URL = "http://localhost:3001/persons";

export function personUrl(id: number) {
  return PERSONS_URL + "/" + id;
}
