const { Ok, Err, usecase, step } = require('buchu')

const dependency = {
  CustomerRepository: require("../../infra/repositories/memDB/customerRepository"),
}
const removeCustomer = injection =>
  usecase('Remove customer', {
    request: { customerId : Number},

    setup: ctx => {
      ctx.di = { ...dependency, ...injection }
    },

    'Retrieve the customer': step(async ctx => {
      const repo = new ctx.di.CustomerRepository(injection)
      const ret = await repo.getByID([ctx.req.customerId])
      const customer = (ctx.customer = ret.value)
      if (customer === undefined) return Err(`Customer not found - ID: ${ctx.req.customerId}`)
      return Ok(customer)
    }),

    'Delete the customer': step(async ctx => {
      const repo = new ctx.di.CustomerRepository(injection)
      const customer = ctx.customer
      const ret = await repo.deleteByID(customer.id)
      return Ok(ctx.ret = ret)
    })


  })

module.exports = removeCustomer
