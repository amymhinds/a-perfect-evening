import tokenService from "./tokenService";
const BASE_URL = "/api/wines/";

export default {
  index,
  create
};

function index() {
  return fetch(BASE_URL).then(res => res.json());
}

function create(wine) {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + tokenService.getToken()
    },
    body: JSON.stringify(wine)
  };
  return fetch(BASE_URL, options).then(res => res.json());
}
