const ucCreateCustomer = require("./ucCreateCustomer")
const assert = require('assert')

describe('Create Customer', () => {

    describe('Valid Customer', () => {

        it('should create Customer ', async () => {
            // Given
            const injection = {
                CustomerRepository: class CustomerRepository {
                    async insert(customer) { return customer }
                }
            }
            const req = {
                "name": "Customer Hello",
                "age": 10,
                "address": "Address Hello"
              }

            // When
            const uc = ucCreateCustomer(injection)
            const ret = await uc.run({ customer: req })

            // Then
            assert.ok(ret.isOk)
            assert.deepStrictEqual(ret.ok.toJSON(), { id: ret.ok.id, name: `Customer Hello`, address: "Address Hello", age: 10 })
        })
    })

    describe('Invalid Customer', () => {

        it('should not create Customer', async () => {
            // Given
            const injection = {}
            const req = { name: "A", age: 1 }

            // When
            const uc = ucCreateCustomer(injection)
            const ret = await uc.run({ customer: req })

            // Then
            assert.ok(ret.isErr)
            assert.deepStrictEqual(ret.err, { name: [ { isTooShort: 3 }] })
        })
    })
})


