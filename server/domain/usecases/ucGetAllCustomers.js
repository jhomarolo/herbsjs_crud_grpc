const { usecase, step } = require("buchu")
const dependency = {
  CustomerRepository: require("../../infra/repositories/memDB/customerRepository"),
}
const getAllCustomers = (injection) =>
  usecase("Get all customers", {
    request: {},

    setup: (ctx) => {
      ctx.di = { ...dependency, ...injection }
    },

    "Retrieve all customers from database": step(async (ctx) => {
      const customerRepo = new ctx.di.CustomerRepository(injection)
      return (ctx.ret = await customerRepo.getAll())
    }),
  })

module.exports = getAllCustomers
