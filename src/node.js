const express = require('express');
const axios = require('axios');
const redis = require('redis');
const util = require('util');

const app = express();

// Configuramos la URL base de la API
const BASE_URL = 'https://www.freetogame.com/api';

// Creamos un cliente de Redis
const client = redis.createClient({
  host: 'redis1',
  port: 6379,
});

// Promisificamos las funciones de Redis para usar async/await
const getAsync = util.promisify(client.get).bind(client);
const setAsync = util.promisify(client.set).bind(client);

// Definimos una función middleware para cachear las respuestas de la API
async function cache(req, res, next) {
  const { page } = req.query;
  const key = `games:${platform || 'pc'}`;

  // Intentamos obtener la respuesta de Redis
  const cachedResponse = await getAsync(key);

  if (cachedResponse) {
    console.log(`Obteniendo respuesta de Redis para la clave ${key}`);
    return res.json(JSON.parse(cachedResponse));
  }

  // Si no hay una respuesta en caché, realizamos la solicitud a la API
  console.log(`Obteniendo respuesta de la API para la clave ${key}`);
  const response = await axios.get(`${BASE_URL}/games`, { params: { page } });
  const data = response.data;

  // Almacenamos la respuesta en caché durante 5 minutos
  await setAsync(key, JSON.stringify(data), 'EX', 300);

  return res.json(data);
}

// Definimos una ruta que utilice la función middleware de caché
app.get('/games', cache);

// Configuramos el puerto en el que se ejecutará la API
const PORT = process.env.PORT || 3000;

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});