import { ItemLocator } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { PlayerId } from '@gamepark/rivality/PlayerId'
import { boardLocator } from './BoardLocator'
import { playerDeckLocator } from './PlayerDeckLocator'
import { playerGolemStackLocator } from './PlayerGolemStackLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { tileButtonLocator } from './TileButtonLocator'

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerId, MaterialType, LocationType>>> = {
  [LocationType.PlayerHand]: playerHandLocator,
  [LocationType.PlayerDeck]: playerDeckLocator,
  [LocationType.Board]: boardLocator,
  [LocationType.PlayerGolemStack]: playerGolemStackLocator,
  [LocationType.TileButton]: tileButtonLocator,
}
