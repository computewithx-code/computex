export const api = {
  login(data) {
    return fetch("http://localhost:8000/api/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  },
  signup(data) {
    return fetch("http://localhost:8000/api/register", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  },
};
