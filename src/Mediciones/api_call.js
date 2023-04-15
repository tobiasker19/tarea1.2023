const axios = require('axios');
const fs = require('fs');

// Configuramos la URL base de la API
//const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';
const BASE_URL = 'http://localhost:3000';

// Definimos el número de solicitudes a realizar
const NUM_REQUESTS = 5000;

// Creamos una función para realizar una solicitud a la API con un ID aleatorio
async function makeRequest() {
  const id = Math.floor(Math.random() * 1200) + 1;
  const start = Date.now();
  
  try {
    const response = await axios.get(`${BASE_URL}/objects/${id}`);
    //const response = await axios.get(`${BASE_URL}/game/${id}`);
    const end = Date.now();
    //console.log(response.data);
    return { data: response.data, time: end - start };
  } catch (error) {
    // Si la solicitud falla, devolver un objeto vacío
    //console.error(`Error al solicitar el juego con ID ${id}: ${error}`);
    return { data: {}, time: 0 };
  }
}

function writeResultsToFile(results, filename) {
  fs.writeFile(filename, results.join(','), (err) => {
    if (err) throw err;
    console.log(`Los resultados se han guardado en el archivo ${filename}`);
  });
}

// Realizamos las solicitudes en bucle
async function run() {
  const results = []; // Creamos una matriz vacía para almacenar los resultados
  for (let i = 1; i <= NUM_REQUESTS; i++) {
    const { data, time } = await makeRequest();
    
    if (data && time!=0) {
      console.log(`Solicitud ${i}: ${time}ms`);
      results.push(time);
    } else {
      i=i-1;
    }
    
  }
  writeResultsToFile(results, 'REST_con_cache_1mb_lfu.txt');
  let sum = 0;
  for (let i=1; i< NUM_REQUESTS; i++ ){
    sum += results[i];
  }
}

// Ejecutamos el script
run();
