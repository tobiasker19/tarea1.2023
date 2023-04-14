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
      
      const response =  await axios.get(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + call.request.id
      );
      console.log(JSON.stringify(response.data));
      const reply = JSON.stringify(response.data);
      callback(null, { Objects: reply });
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