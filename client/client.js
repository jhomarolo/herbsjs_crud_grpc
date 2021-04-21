var path = require('path')
const PROTO_PATH = "../server/infra/customers.proto"

const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")

var packageDefinition = protoLoader.loadSync(path.resolve(__dirname,PROTO_PATH), {
	keepCase: true,
	longs: String,
	enums: String,
	arrays: true
})

const CustomerService = grpc.loadPackageDefinition(packageDefinition).CustomerService
const client = new CustomerService(
	"localhost:30043",
	grpc.credentials.createInsecure()
)

module.exports = client
