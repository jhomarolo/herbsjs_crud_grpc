const { Ok, Err, usecase, step } = require('buchu')
const { Customer } = require('../entities/customer')

const dependency = {
  CustomerRepository: require("../../infra/repositories/memDB/customerRepository"),
}
const createCustomer = injection =>
  usecase('Create customer', {
    request: { customer : Object},

    setup: ctx => {
      ctx.di = { ...dependency, ...injection }
    },

    'Check if the customer is valid': step((ctx) => {
      const customer = ctx.customer = Customer.fromJSON(ctx.req.customer)
      customer.id = Math.floor(Math.random() * 1000)
      if (!customer.isValid()) return Err(customer.errors)
      return Ok()
    }),

    'Insert customer into database': step(async ctx => {
       const customerRepo = new ctx.di.CustomerRepository(injection)
       return (ctx.ret = await customerRepo.insert(ctx.customer))
    }),
  })

module.exports = createCustomer
