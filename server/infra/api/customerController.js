var grpc = require("grpc")
const getAllCustomers = require("../../domain/usecases/ucGetAllCustomers")
const getCustomer = require("../../domain/usecases/ucGetCustomer")
const createCustomer = require("../../domain/usecases/ucCreateCustomer")
const updateCustomer = require("../../domain/usecases/ucUpdateCustomer")
const removeCustomer = require("../../domain/usecases/ucRemoveCustomer")

class customerController {
  async getAll(_, callback) {
    try {
      const ucGetAllCustomers = getAllCustomers()
      const caseResponse = await ucGetAllCustomers.run()

      if (caseResponse.isErr) {
        callback({code: grpc.status.INTERNAL,details: caseResponse.err, })
      }

      const customers = caseResponse.ok
      callback(null, { customers })
    }
    catch (e) {
      callback({code: grpc.status.UNKNOWN, details: e.message, })
    }
  }

  async get(call, callback) {
    try {
      const ucGetCustomer = getCustomer()
      const caseResponse = await ucGetCustomer.run({
        customerId: Number(call.request.id),
      })

      if (caseResponse.isErr) {
        callback({code: grpc.status.INTERNAL,details: caseResponse.err,})
      }
      
      const customer = caseResponse.ok
      if (customer) {
        callback(null, customer)
      } else {
          callback({ code: grpc.status.NOT_FOUND, details: "Not found", })
      }
    }
    catch (e) {
      callback({code: grpc.status.UNKNOWN, details: e.message, })
    }
  }

  async insert(call, callback) {
    try {
      const ucCreateCustomer = createCustomer()
      const caseResponse = await ucCreateCustomer.run({
        customer: call.request,
      })

      if (caseResponse.isErr) {
        callback({code: grpc.status.INTERNAL, details: caseResponse.err})
      }
      
      const customer = caseResponse.ok
      callback(null, customer)
    }
    catch (e) {
      callback({code: grpc.status.UNKNOWN, details: e.message})
    }
  }

  async update(call, callback) {
    try {
      const ucUpdateCustomer = updateCustomer()
      const caseResponse = await ucUpdateCustomer.run({
        customer: call.request,
      })

      if (caseResponse.isErr) {
        callback({ code: grpc.status.INTERNAL, details: caseResponse.err })
      }
      
      const customer = caseResponse.ok
      callback(null, customer)
    }
    catch (e) {
      callback({code: grpc.status.UNKNOWN, details: e.message })
    }
  }

  async remove(call, callback) {
    try {
      const ucRemoveCustomer = removeCustomer()
      const caseResponse = await ucRemoveCustomer.run({
        customerId: call.request.id,
      })

      if (caseResponse.isErr) {
        callback({code: grpc.status.INTERNAL,details: caseResponse.err})
      }
      
      callback(null,{})

    } 
    catch (e) {
      callback({code: grpc.status.UNKNOWN, details: e.message })
    }
  }
}

module.exports = new customerController()
