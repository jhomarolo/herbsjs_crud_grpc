var path = require('path')
const PROTO_PATH = "./infra/customers.proto"

var grpc = require("grpc")
var protoLoader = require("@grpc/proto-loader")
var customerController = require("./infra/api/customerController")

var packageDefinition = protoLoader.loadSync(path.resolve(__dirname,PROTO_PATH), {
	keepCase: true,
	longs: String,
	enums: String,
	arrays: true
})

var customersProto = grpc.loadPackageDefinition(packageDefinition)
const server = new grpc.Server()

server.addService(customersProto.CustomerService.service, {getAll: customerController.getAll, get: customerController.get, insert: customerController.insert, update: customerController.update, remove: customerController.remove})

server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure())
// eslint-disable-next-line no-console
console.log("Server running at http://127.0.0.1:30043")
server.start()