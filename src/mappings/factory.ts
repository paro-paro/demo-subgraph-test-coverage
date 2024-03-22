import { Address, BigInt } from '@graphprotocol/graph-ts'
import { PoolAdded, PoolCreated } from '../../generated/Factory/Factory'
import { StakePool as StakePoolContract } from '../../generated/Factory/StakePool'
import { StakePool } from '../../generated/schema'
import { StakePool as StakePoolTemplate } from '../../generated/templates'

export function handlePoolCreated(event: PoolCreated): void {
  const poolAddress = event.params.poolAddress
  StakePoolTemplate.create(poolAddress)
}

export function handlePoolAdded(event: PoolAdded): void {
  const poolAddress = event.params.poolAddress
  StakePoolTemplate.create(poolAddress)
  initStakePoolStore(poolAddress)
}

function initStakePoolStore(address: Address): void {
  const contract = StakePoolContract.bind(address)
  const pool = new StakePool(address)
  pool.name = contract.name()
  pool.symbol = contract.symbol()
  pool.totalStaked = BigInt.zero()
  pool.save()
}
