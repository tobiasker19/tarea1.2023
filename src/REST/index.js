const express = require("express");
const axios = require("axios");
const { createClient } = require("redis");
const responseTime = require("response-time");

const app = express();

app.use(responseTime());

// CONEXION A REDIS
const client1 = createClient({
  url: 'redis://127.0.0.1:6379'});
const client2 = createClient({
  url: 'redis://127.0.0.1:6380'});
const client3 = createClient({
  url: 'redis://127.0.0.1:6381'});


// GET Object EN ESPECIFICO
app.get("/objects/:id", async (req, res, next) => {
  if(req.params.id <=400){
    try {
      const reply = await client1.get(req.params.id);
  
      if (reply) {
        console.log("USANDO LA DATA EN CACHE (Redis1)");
        return res.send(JSON.parse(reply));
      }
  
      const response = await axios.get(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + req.params.id
      );
      const saveResult = await client1.set(
        req.params.id,
        JSON.stringify(response.data),
        {
          EX: 10000,
        }
      );
  
      console.log("GUARDANDO LA DATA EN CACHE (Redis1):", saveResult);
  
      res.send(response.data);
    } catch (error) {
      //console.log(error);
      res.send(error.message);
    }
  }
  else if(400 < req.params.id && req.params.id <= 800){
    try {
      const reply = await client2.get(req.params.id);
  
      if (reply) {
        console.log("USANDO LA DATA EN CACHE (Redis2)");
        return res.send(JSON.parse(reply));
      }
  
      const response = await axios.get(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + req.params.id
      );
      const saveResult = await client2.set(
        req.params.id,
        JSON.stringify(response.data),
        {
          EX: 10000,
        }
      );
  
      console.log("GUARDANDO LA DATA EN CACHE (Redis2):", saveResult);
  
      res.send(response.data);
    } catch (error) {
      res.send(error.message);
    }
  }
  else if(800 < req.params.id && req.params.id <= 1200){
    try {
      const reply = await client3.get(req.params.id);
  
      if (reply) {
        console.log("USANDO LA DATA EN CACHE (Redis3)");
        return res.send(JSON.parse(reply));
      }
  
      const response = await axios.get(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + req.params.id
      );
      const saveResult = await client3.set(
        req.params.id,
        JSON.stringify(response.data),
        {
          EX: 10000,
        }
      );
  
      console.log("GUARDANDO LA DATA EN CACHE (Redis3):", saveResult);
  
      res.send(response.data);
    } catch (error) {
      res.send(error.message);
    }
  }
  
});

async function main() {
  await client1.connect();
  await client2.connect();
  await client3.connect();
  app.listen(3000);
  console.log("Redis conectado");
}

main();