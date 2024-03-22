import { log } from '@graphprotocol/graph-ts'
import { Staked } from '../../generated/Factory/StakePool'

export function handleStaked(event: Staked): void {
  log.debug('handleStaked not implementex', [])
}
