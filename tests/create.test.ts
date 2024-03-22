import { Address, ethereum } from '@graphprotocol/graph-ts'
import { afterAll, describe, test, newMockEvent, logStore, logDataSources, assert, beforeAll } from 'matchstick-as/assembly/index'
import { PoolCreated } from '../generated/Factory/Factory'
import { handlePoolCreated } from '../src/mappings/factory'

// for coverage...
export {
  handlePoolCreated,
}

const zeroAddress = Address.zero()

afterAll(() => {
  logDataSources('StakePool')
  logStore()
})

describe('Factory - PoolCreated', () => {
  beforeAll(() => {
    const mockEvent = changetype<PoolCreated>(newMockEvent())
    const poolAddress = new ethereum.EventParam('poolAddress', ethereum.Value.fromAddress(zeroAddress))
    mockEvent.parameters.push(poolAddress)
    handlePoolCreated(mockEvent)
  })

  test('handlePoolCreated: The right data source template is created and no StakePool entity is saved in store.', () => {
    assert.dataSourceCount('StakePool', 1)
    assert.dataSourceExists('StakePool', zeroAddress.toHex())
    assert.entityCount('StakePool', 0)
  })
})
