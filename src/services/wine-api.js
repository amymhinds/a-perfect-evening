/*

const BASE_URL =
  "https://api.globalwinescore.com/globalwinescores/latest/?wine=justin/";


export function getAllWines() {
  return fetch(`${BASE_URL}`, {
    headers: {
      Authorization: "Token beef4bd81234e85c6343623eb0da47c5cf55ed65",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://127.0.0.1:3000"
    },
    mode: "cors"
  }).then(res => res.json());
}
*/
export function getAllWines() {
  return fetch(
    "https://globalwinescore-global-wine-score-v1.p.rapidapi.com/globalwinescores/latest/?wine_id=89989&limit=100&ordering=-date",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "globalwinescore-global-wine-score-v1.p.rapidapi.com",
        "x-rapidapi-key": "8488f284c8mshb2d10aec160b79bp14ef40jsn43c2b79185ac",
        authorization: "Token beef4bd81234e85c6343623eb0da47c5cf55ed65",
        accept: "application/json"
      },
      mode: "cors"
    }
  )
    .then(response => {
      response.json();
      //console.log(response.json());
    })
    .catch(err => {
      console.log(err);
    });
}
