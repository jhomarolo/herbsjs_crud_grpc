const { usecase, step } = require('buchu')
const dependency = {
  CustomerRepository: require("../../infra/repositories/memDB/customerRepository"),
}
const getCustomer = injection =>
  usecase('Get customer by id', {
    request: { customerId : Number},

    setup: ctx => {
      ctx.di = { ...dependency, ...injection }
    },

    'Retrieve customer from database by parameter customerId': step(async ctx => {
       const customerRepo = new ctx.di.CustomerRepository(injection)
       return (ctx.ret = await customerRepo.getByID(ctx.req.customerId))
    }),
  })

module.exports = getCustomer
