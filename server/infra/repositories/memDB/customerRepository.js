const DB = require('./inMemDB')
const { Ok, Err } = require('buchu')
const { Customer } = require('../../../domain/entities/customer')

module.exports = class CustomerRepository {
  constructor() {
    this.table = 'customer'
  }

  async insert(customer) {
    try{
      const ret = await DB.set(this.table, customer.id, customer)

      if(!ret)
      return Err('Not Saved')

      return Ok(Customer.fromJSON(ret))
    }catch(__){
      return Err('Not Saved')
    }
  }

  async update(customer) {
    try{
      const ret = await DB.set(this.table, customer.id, customer)

      if(!ret)
      return Err('Not Saved')

      return Ok(Customer.fromJSON(ret))
    }catch(__){
      return Err('Not Saved')
    }
  }

  async getAll() {
    const ret = await DB.getAll(this.table)
    const customerArray = []
    for (var i = 0, len = ret.length; i < len; i++) {
      if (ret[i] === undefined) continue
      customerArray.push(Customer.fromJSON(ret[i]))
    }
    return Ok(customerArray)
  }

  async getByID(id) {
    const ret = await DB.get(this.table,id)

    if (ret !== undefined || JSON.parse(ret).id == id) 
        return Ok(Customer.fromJSON(ret))
    else return Ok()
}

  async deleteByID(id) {
    await DB.delete(this.table, id)
    const customerArray = await this.getAll()
    return Ok(customerArray)
  }
}
