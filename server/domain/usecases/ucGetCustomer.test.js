const  ucGetCustomer = require('./ucGetCustomer')
const { Ok } = require('buchu')
const assert = require('assert')

describe('Get Customer', () => {

    it('should find Customer by ID', async () => {
        // Given
        const injection = {
            CustomerRepository: class CustomerRepository {
                async getByID(id) { return Ok([{id: 1}]) }
            }
        }

        const req = { id: 1 }

        // When
        const uc = ucGetCustomer(injection)

        const ret = await uc.run({ customerId: req.id })

        // Then
        assert.ok(ret.isOk)
        assert.strictEqual(ret.ok[0].id, 1)
    })

    it('should not find Customer by ID if it does not exist', async () => {
        // Given
        const injection = {
            CustomerRepository: class CustomerRepository {
                async getByID(id) { return Ok([]) }
            }
        }
        const req = { id: 2}

        // When
        const uc = ucGetCustomer(injection)
        const ret = await uc.run({ customerId: req.id })

        // Then
        assert.ok(ret.isOk)
        assert.strictEqual(ret.ok.length, 0)
    })
})


