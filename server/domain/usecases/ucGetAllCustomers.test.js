const ucGetAllCustomers = require('./ucGetAllCustomers')
const { Ok } = require('buchu')
const assert = require('assert')

describe('Get Customers', () => {

    it('return all Customers', async () => {
        // Given
        const injection = {
            CustomerRepository: class CustomerRepository {
                async getAll() { return Ok([]) }
            }
        }
        // When
        const uc = ucGetAllCustomers(injection)
        const ret = await uc.run()

        // Then
        assert.ok(ret.isOk)
    })

})


