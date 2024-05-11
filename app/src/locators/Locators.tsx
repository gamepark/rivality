import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { PlayerColor } from '@gamepark/rivality/PlayerColor'
import { ItemLocator } from '@gamepark/react-game'
import { boardLocator } from './BoardLocator'
import { playerGolemStackLocator } from './PlayerGolemStackLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { playerDeckLocator } from './PlayerDeckLocator'

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.PlayerHand]: playerHandLocator,
  [LocationType.PlayerDeck]: playerDeckLocator,
  [LocationType.Board]: boardLocator,
  [LocationType.PlayerGolemStack]: playerGolemStackLocator
}
