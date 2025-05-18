import { useUserStore } from "../stores/user";
class Api {
  async fetch(path: string, args = {}, method = "") {
    if (!method) {
      method = Object.keys(args).length === 0 ? "GET" : "POST";
    }
    let url = `${import.meta.env.VITE_API_SERVER}/${path}`;
    if (Object.keys(args).length && method === "GET") {
      url += `?${new URLSearchParams(args).toString()}`;
    }
    const userStore = useUserStore();
    const token = userStore.token;
    const headers: Record<string, string> = {};
    if (token) headers.token = token;
    const options =
      method === "GET"
        ? { headers }
        : {
            method,
            headers: {
              ...headers,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(args),
          };
    return fetch(url, options).then((res) => res.json());
  }
}
export const api = new Api();
