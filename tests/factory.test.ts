import { Address, ethereum } from '@graphprotocol/graph-ts'
import { afterAll, describe, test, newMockEvent, logStore, logDataSources, assert, beforeAll } from 'matchstick-as/assembly/index'
import { PoolCreated, PoolAdded } from '../generated/Factory/Factory'
import { handlePoolCreated, handlePoolAdded } from '../src/mappings/factory'

// for coverage (not working)
export {
  handlePoolCreated,
}

describe('Factory - PoolCreated', () => {
  beforeAll(() => {
    const mockEvent = changetype<PoolCreated>(newMockEvent())
    const poolAddress = new ethereum.EventParam('poolAddress', ethereum.Value.fromAddress(Address.zero()))
    mockEvent.parameters.push(poolAddress)
    handlePoolCreated(mockEvent)
  })

  afterAll(() => {
    logDataSources('StakePool')
    logStore()
  })

  test('handlePoolCreated', () => {
    // doesn't work either...
    // const mockEvent = changetype<PoolCreated>(newMockEvent())
    // const poolAddress = new ethereum.EventParam('poolAddress', ethereum.Value.fromAddress(Address.zero()))
    // mockEvent.parameters.push(poolAddress)
    // handlePoolCreated(mockEvent)
    assert.dataSourceCount('StakePool', 1)
    assert.dataSourceExists('StakePool', Address.zero().toHex())
    assert.entityCount('StakePool', 0)
  })
})
