const axios = require('axios');

// Configuramos la URL base de la API
const BASE_URL = 'https://www.freetogame.com/api';
//const BASE_URL = 'http://localhost:3000';
// Definimos el número de solicitudes a realizar
const NUM_REQUESTS = 5000;

// Creamos una función para realizar una solicitud a la API con un ID aleatorio
async function makeRequest() {
  const id = Math.floor(Math.random() * 550) + 1; // Generamos un ID aleatorio entre 1 y 550
  const start = Date.now(); // Registramos el tiempo de inicio de la solicitud
  //const response = await axios.get(`${BASE_URL}/game/${id}`); // Realizamos la solicitud HTTP con el ID aleatorio
  const response = await axios.get(`${BASE_URL}/game?id=${id}`); // Realizamos la solicitud HTTP con el ID aleatorio
  const end = Date.now(); // Registramos el tiempo de finalización de la solicitud
  return { data: response.data, time: end - start }; // Devolvemos los datos y el tiempo de respuesta
}

// Realizamos las solicitudes en bucle
async function run() {
  const results = []; // Creamos una matriz vacía para almacenar los resultados
  for (let i = 0; i < NUM_REQUESTS; i++) {
    const { data, time } = await makeRequest();
    console.log(`Solicitud ${i}: ID ${data.id}, ${time}ms`);
    results.push(time); // Agregamos el tiempo de respuesta a la matriz de resultados
  }
  console.log(results); // Imprimimos la matriz de resultados en la consola
}

// Ejecutamos el script
run();
