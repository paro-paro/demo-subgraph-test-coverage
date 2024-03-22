import { Address, ethereum } from '@graphprotocol/graph-ts'
import { afterAll, describe, test, newMockEvent, logStore, logDataSources, assert, beforeAll, createMockedFunction } from 'matchstick-as/assembly/index'
import { PoolAdded } from '../generated/Factory/Factory'
import { handlePoolAdded } from '../src/mappings/factory'

// for coverage...
export {
  handlePoolAdded
}

const randomAddress = Address.fromString('0x0188CeE01089eE02EB90D7f7f11b7abbcf39A185')

afterAll(() => {
  logDataSources('StakePool')
  logStore()
})

describe('Factory - PoolAdded', () => {
  beforeAll(() => {
    const mockEvent = changetype<PoolAdded>(newMockEvent())
    const poolAddress = new ethereum.EventParam('poolAddress', ethereum.Value.fromAddress(randomAddress))
    mockEvent.parameters.push(poolAddress)
    createMockedFunction(randomAddress, 'name', 'name():(string)').returns([ethereum.Value.fromString('foo')])
    createMockedFunction(randomAddress, 'symbol', 'symbol():(string)').returns([ethereum.Value.fromString('bar')])
    handlePoolAdded(mockEvent)
  })

  test('handlePoolAdded: The right data source template is created and the proper StakePool entity is saved in store.', () => {
    assert.dataSourceCount('StakePool', 1)
    assert.dataSourceExists('StakePool', randomAddress.toHex())
    assert.entityCount('StakePool', 1)
    assert.fieldEquals('StakePool', randomAddress.toHex(), 'id', randomAddress.toHex())
    assert.fieldEquals('StakePool', randomAddress.toHex(), 'name', 'foo')
    assert.fieldEquals('StakePool', randomAddress.toHex(), 'symbol', 'bar')
    assert.fieldEquals('StakePool', randomAddress.toHex(), 'totalStaked', '0')
  })
})
