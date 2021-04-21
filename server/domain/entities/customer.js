const { entity, field } = require('gotu')

module.exports.Customer = entity('Customer', {
  id: field(Number),
  name: field(String, {validation: { presence: true, length: { minimum: 3 } }}),
  address: field(String),
  age: field(Number, { presence: true })
})