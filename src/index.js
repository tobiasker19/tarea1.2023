const express = require("express");
const axios = require("axios");
const { createClient } = require("redis");
const responseTime = require("response-time");

const app = express();

// CONEXION A REDIS
const client = createClient({
  host: "127.0.0.1",
  port: 6379,
});

app.use(responseTime());

// GET ALL GAMES
app.get("/games", async (req, res, next) => {
  try {
    // Busca la key "games"
    const reply = await client.get("games");

    // Si la key existe, retorna su contenido sin consultar a la API
    if (reply) {
        console.log("USANDO LA DATA EN CACHE");
        return res.send(JSON.parse(reply));
      }

    // Recuperando data de la API
    const response = await axios.get(
      "https://www.freetogame.com/api/games"
    );

    // Guarda la data en redis. "EX" tiempo de expiracion de la data
    const saveResult = await client.set(
      "games",
      JSON.stringify(response.data),
      {
        EX: 200, //TTL
      }
    );
    console.log("GUARDANDO LA DATA EN CACHE:", saveResult);

    // RES AL CLIENTE
    res.send(response.data);
  } catch (error) {
    res.send(error.message);
  }
});

// GET JUEGO EN ESPECIFICO
app.get("/game/:id", async (req, res, next) => {
  try {
    const reply = await client.get(req.params.id);

    if (reply) {
      console.log("USANDO LA DATA EN CACHE");
      return res.send(JSON.parse(reply));
    }

    const response = await axios.get(
      "https://www.freetogame.com/api/game?id=" + req.params.id
    );
    const saveResult = await client.set(
      req.params.id,
      JSON.stringify(response.data),
      {
        EX: 200,
      }
    );

    console.log("GUARDANDO LA DATA EN CACHE:", saveResult);

    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.get("/games/category/:id", async (req, res, next) => {
  try {
    const reply = await client.get(req.params.id);

    if (reply) {
        console.log("USANDO LA DATA EN CACHE");
      return res.send(JSON.parse(reply));
    }

    const response = await axios.get(
      "https://www.freetogame.com/api/games?category=" + req.params.id
    );
    const saveResult = await client.set(
      req.params.id,
      JSON.stringify(response.data),
      {
        EX: 200,
      }
    );

    console.log("GUARDANDO LA DATA EN CACHE:", saveResult);
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.get("/games/platform/:id", async (req, res, next) => {
  try {
    const reply = await client.get(req.params.id);

    if (reply) {
      console.log("USANDO LA DATA EN CACHE");
      return res.send(JSON.parse(reply));
    }

    const response = await axios.get(
      "https://www.freetogame.com/api/games?platform=" + req.params.id
    );
    const saveResult = await client.set(
      req.params.id,
      JSON.stringify(response.data),
      {
        EX: 200,
      }
    );

    console.log("GUARDANDO LA DATA EN CACHE:", saveResult);
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.get("/games/sort/:id", async (req, res, next) => {
  try {
    const reply = await client.get(req.params.id);

    if (reply) {
      console.log("USANDO LA DATA EN CACHE");
      return res.send(JSON.parse(reply));
    }

    const response = await axios.get(
      "https://www.freetogame.com/api/games?sort-by=" + req.params.id
    );
    const saveResult = await client.set(
      req.params.id,
      JSON.stringify(response.data),
      {
        EX: 200,
      }
    );

    console.log("GUARDANDO LA DATA EN CACHE:", saveResult);
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});


async function main() {
  await client.connect();
  app.listen(3000);
  console.log("SERVIDOR ALOJADO EN PUERTO 3000");
}

main();