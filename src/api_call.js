const axios = require('axios');

// Configuramos la URL base de la API
const BASE_URL = 'https://www.freetogame.com/api';
//const BASE_URL = 'http://localhost:3000';
// Definimos el número de solicitudes a realizar
const NUM_REQUESTS = 10;

// Creamos una función para realizar una solicitud a la API con un ID aleatorio
async function makeRequest() {
  const id = Math.floor(Math.random() * 550) + 1;
  const start = Date.now();
  
  try {
    const response = await axios.get(`${BASE_URL}/game?id=${id}`);
    const end = Date.now();
    return { data: response.data, time: end - start };
  } catch (error) {
    // Si la solicitud falla, devolver un objeto vacío
    //console.error(`Error al solicitar el juego con ID ${id}: ${error}`);
    return { data: {}, time: 0 };
  }
}


// Realizamos las solicitudes en bucle
async function run() {
  const results = []; // Creamos una matriz vacía para almacenar los resultados
  for (let i = 1; i <= NUM_REQUESTS; i++) {
    const { data, time } = await makeRequest();
    
    if (data.id) {
      console.log(`Solicitud ${i}: ID ${data.id}, ${time}ms`);
      results.push(time);
    } else {
      i=i-1;
    }
    
  }
  console.log(results); // Imprimimos la matriz de resultados en la consola
  console.log(results.length);
}

// Ejecutamos el script
run();
