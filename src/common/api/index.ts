import axios, { isAxiosError } from "axios";

const API_BASE_URL = "http://localhost:3001";

// TODO: Razmisli o generickom tipu za pretragu.
// Ideja je da imas f-ju koja prepakuje realan objekat kao query parametar.
// Procitaj API za URLSearchParams()
// Onda ti nece trebati oni silni izrazi (regex) za order, limit, offset

export type Response<T> =
  | { type: "Success"; data: T }
  | { type: "Failure"; error: string };

export const get = <T>(url: string): Promise<Response<T>> =>
  axios
    .get<T>(`${API_BASE_URL}/${url}`)
    .then(
      (response): Response<T> => ({
        type: "Success",
        data: response.data,
      }),
    )
    .catch((error: unknown): Response<T> => {
      if (isAxiosError(error)) {
        const code = error.response ? ` - Code: ${error.response.status}` : "";

        return {
          type: "Failure",
          error: `Unexpected Server Error ${code}`,
        };
      }

      return {
        type: "Failure",
        error: "Unexpected Server Error",
      };
    });

export const post = <TData, TResult = void>(
  url: string,
  data: TData,
): Promise<Response<TResult>> =>
  axios
    .post<TResult>(`${API_BASE_URL}/${url}`, data)
    .then(
      (response): Response<TResult> => ({
        type: "Success",
        data: response.data,
      }),
    )
    .catch((error: unknown): Response<TResult> => {
      if (isAxiosError(error)) {
        const code = error.response ? ` - Code: ${error.response.status}` : "";

        return {
          type: "Failure",
          error: `Unexpected Server Error${code}`,
        };
      }

      return {
        type: "Failure",
        error: "Unexpected Server Error",
      };
    });
