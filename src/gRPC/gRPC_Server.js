const express = require('express');
const axios = require("axios");
const grpc = require("@grpc/grpc-js");
const { createClient } = require("redis");
var PROTO_PATH = './metmuseum.proto';
var protoLoader = require("@grpc/proto-loader");

// CONEXION A REDIS
const client1 = createClient({
  url: 'redis://127.0.0.1:6379'});
const client2 = createClient({
  url: 'redis://127.0.0.1:6380'});
const client3 = createClient({
  url: 'redis://127.0.0.1:6381'});

const app = express();

app.use(responseTime());

async function main() {
  await client1.connect();
  await client2.connect();
  await client3.connect();
  console.log("Redis conectado");
}
main();

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const serviceProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(serviceProto.metmuseum_proto.service, {
    Get: async (call, callback) => {
      let reply = [];
      try{
        //const start = Date.now();
        const response =  await axios.get(
          "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + call.request.id
        );
        //const end = Date.now();
        //time = end-start;
        //console.log(`Pasando por el server ${time}`)
        reply.push(response.data);
        //console.log(reply)
        callback(null, { Objects: reply });
      }
      catch (error) {
        if (error.response && error.response.status === 404) {
          callback({
            code: grpc.status.NOT_FOUND,
            message: 'Object not found'
          });
        } else {
          callback(error);
        }
      }
      
    }
});

server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      console.log("Server running at http://127.0.0.1:50051");
      server.start();
    }
  );