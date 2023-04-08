const axios = require('axios');
const Chart = require('chart.js');

// Configuramos la URL base de la API
const BASE_URL = 'https://www.freetogame.com/api';

// Definimos el número de solicitudes a realizar
const NUM_REQUESTS = 100;

// Creamos un array para almacenar los tiempos de respuesta
const responseTimes = [];

// Creamos una función para realizar una solicitud a la API
async function makeRequest() {
  const start = Date.now(); // Registramos el tiempo de inicio de la solicitud
  const response = await axios.get(`${BASE_URL}/games`); // Realizamos la solicitud HTTP
  const end = Date.now(); // Registramos el tiempo de finalización de la solicitud
  return end - start; // Devolvemos el tiempo de respuesta
}

// Realizamos las solicitudes en bucle y almacenamos los tiempos de respuesta
async function run() {
    for (let i = 0; i < NUM_REQUESTS; i++) {
    const time = await makeRequest();
    console.log(`Solicitud ${i}: ${time}ms`);
    responseTimes.push(time);
    }
  // Llamamos a la función para graficar los tiempos de respuesta
    plotGraph(responseTimes);
}

// Función para graficar los tiempos de respuesta utilizando Chart.js
function plotGraph(responseTimes) {
    const ctx = document.getElementById('responseTimesChart').getContext('2d');
    const chart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: responseTimes.map((_, i) => `Solicitud ${i + 1}`),
    datasets: [{
        label: 'Tiempo de respuesta (ms)',
        data: responseTimes,
        backgroundColor: 'rgba(0, 119, 204, 0.2)',
        borderColor: 'rgba(0, 119, 204, 1)',
        borderWidth: 1,
        pointRadius: 2,
        pointBackgroundColor: 'rgba(0, 119, 204, 1)',
        pointBorderColor: 'rgba(0, 119, 204, 1)',
        pointHoverRadius: 4,
        pointHoverBackgroundColor: 'rgba(0, 119, 204, 1)',
        pointHoverBorderColor: 'rgba(0, 119, 204, 1)',
    }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
        yAxes: [{
            ticks: {
            beginAtZero: true
            }
        }]
        }
    }
    });
}

// Ejecutamos el script
run();