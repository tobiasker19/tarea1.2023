const express = require('express');
const axios = require("axios");
const { createClient } = require("redis");
const responseTime = require("response-time");
var grpc = require('@grpc/grpc-js');
var PROTO_PATH = './metmuseum.proto';
var protoLoader = require('@grpc/proto-loader');
var parseArgs = require('minimist');

// CONEXION A REDIS
const client1 = createClient({
  url: 'redis://127.0.0.1:6379'});
const client2 = createClient({
  url: 'redis://127.0.0.1:6380'});
const client3 = createClient({
  url: 'redis://127.0.0.1:6381'});

app.use(responseTime());  

const app = express();

async function main() {
  await client1.connect();
  await client2.connect();
  await client3.connect();
  app.listen(3000);
  console.log("Redis conectado");
}
main();

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var metmuseum_proto = grpc.loadPackageDefinition(packageDefinition).metmuseum_proto;

const clientService = new metmuseum_proto(
    "127.0.0.1:50051",
    grpc.credentials.createInsecure()
  );

// GET Object EN ESPECIFICO
app.get("/objects/:id", async (req, res) => {
  if(req.params.id <=400){
    try {
      const reply = await client1.get(req.params.id);
  
      if (reply) {
        console.log("USANDO LA DATA EN CACHE (Redis1)");
        res.json(JSON.parse(reply));
      }
      else{
        
        clientService.Get({id : req.params.id}, (error,items) =>{
          if(error){
              res.send(error.message);
              console.log(`Error en el guardado de data (Redis1), no se encuentra el id ${req.params.id}`);
              //console.log(error);
          }
          else{
              data = JSON.stringify(items)
              
              client1.set(req.params.id, data,{EX: 10000,});
              res.json(items);
              console.log("GUARDANDO LA DATA EN CACHE (Redis1)");
          }
      })
      }
      
      
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
        res.json(JSON.parse(reply));
      }
      else{
        
        clientService.Get({id : req.params.id}, (error,items) =>{
          if(error){
              res.send(error.message);
              console.log(`Error en el guardado de data (Redis2), no se encuentra el id ${req.params.id}`);
              //console.log(error);
          }
          else{
              data = JSON.stringify(items)
              
              client2.set(req.params.id, data,{EX: 10000,});
              res.json(items);
              console.log("GUARDANDO LA DATA EN CACHE (Redis2)");
          }
      })
      }
    } catch (error) {
      res.send(error.message);
    }
  }
  else if(800 < req.params.id && req.params.id <= 1200){
    try {
      const reply = await client3.get(req.params.id);
  
      if (reply) {
        console.log("USANDO LA DATA EN CACHE (Redis3)");
        res.json(JSON.parse(reply));
      }
      else{
        
        clientService.Get({id : req.params.id}, (error,items) =>{
          if(error){
              res.send(error.message);
              console.log(`Error en el guardado de data (Redis3), no se encuentra el id ${req.params.id}`);
              //console.log(error);
          }
          else{
              data = JSON.stringify(items)
              client3.set(req.params.id, data,{EX: 10000,});
              res.json(items);
              console.log("GUARDANDO LA DATA EN CACHE (Redis3)");
          }
      })
      
      }
    } catch (error) {
      res.send(error.message);
    }
  }
  
});

