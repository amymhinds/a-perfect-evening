import tokenService from "./tokenService";
const BASE_URL = "/api/users/";

export default {
  signup,
  getUser,
  logout,
  login,
  updateUserWines,
  addCheeseToWine
};

async function addCheeseToWine(user) {
  console.log("service", user);

  return await fetch(`${BASE_URL}${user._id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user)
  }).then(res => res.json());
}

function updateUserWines(user) {
  return fetch(`${BASE_URL}${user._id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user)
  }).then(res => res.json());
}

function login(creds) {
  return fetch(BASE_URL + "login", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(creds)
  })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error("Bad Credentials!");
    })
    .then(({ token }) => tokenService.setToken(token));
}

function logout() {
  tokenService.removeToken();
}

function getUser() {
  return tokenService.getUserFromToken();
}

function signup(user) {
  return fetch(BASE_URL + "signup", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(user)
  })
    .then(res => {
      if (res.ok) return res.json();
      // Probably a duplicate email
      throw new Error("Email already taken!");
    })
    .then(({ token }) => tokenService.setToken(token));
}
