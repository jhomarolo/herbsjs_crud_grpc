const { Ok, Err, usecase, step } = require('buchu')

const dependency = {
  CustomerRepository: require("../../infra/repositories/memDB/customerRepository"),
}
const updateCustomer = injection =>
  usecase('Update customer', {
    request: { customer : Object},

    setup: ctx => {
      ctx.di = { ...dependency, ...injection }
    },

    'Retrieve the customer': step(async ctx => {
      const repo = new ctx.di.CustomerRepository(injection)
      const ret = await repo.getByID([ctx.req.customer.id])
      const customer = (ctx.customer = ret.value)
      if (customer === undefined) return Err(`Customer not found - ID: ${ctx.req.customer.id}`)
      return Ok(customer)
    }),

    'Check if it is a valid customer before update': step(ctx => {
      const customer = ctx.customer  
      ctx.customer = ctx.req.customer
      return customer.isValid() ? Ok() : Err(customer.errors)
    }),

    'Upsert the customer': step(async ctx => {
      const repo = new ctx.di.CustomerRepository(injection)
      return (ctx.ret = await repo.update(ctx.customer))
    }),


  })

module.exports = updateCustomer
