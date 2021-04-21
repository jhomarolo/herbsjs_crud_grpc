/* eslint-disable no-unused-vars */
const ucRemoveCustomer  = require('./ucRemoveCustomer')
const assert = require('assert')
const { Ok} = require('buchu')

const { Customer } = require('../entities/customer')


describe('Delete Customer', () => {

    it('should delete Customer', async () => {
        // Given
        const injection = {
            CustomerRepository: class CustomerRepository {
                async getByID(id) { return Ok(Customer.fromJSON({ "id": 1, "name": "Customer name", "age": 10, "address": "Nice address" })) }
                async deleteByID(id) { return true }
            }
        }

        const req = { id: 1 }

        // When
        const uc = ucRemoveCustomer(injection)
        const ret = await uc.run({ customerId: req.id })

        // Then
        assert.ok(ret.isOk)
    })

    it('should not delete Customer if the Customer does not exist', async () => {
        // Given
        const injection = {
            CustomerRepository: class CustomerRepository {
                async getByID(id) { return [] }
            }
        }

        const req = { id: 2 }
        // When
        const uc = ucRemoveCustomer(injection)
        const ret = await uc.run({ customerId: req.id })

        // Then
        assert.ok(!ret.isOk)
        assert.strictEqual(ret.err, 'Customer not found - ID: 2')
    })
})


