var PROTO_PATH = './metmuseum.proto';

var parseArgs = require('minimist');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var metmuseum_proto = grpc.loadPackageDefinition(packageDefinition).metmuseum;


  var argv = parseArgs(process.argv.slice(2), {
    string: 'target'
  });
  var target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = 'localhost:50051';
  }
  var client = new metmuseum_proto.Greeter(target,grpc.credentials.createInsecure());
  /*
  client.sayHello({name: user}, function(err, response) {
    console.log('Greeting:', response.message);
  });
  */

module.exports = client;

