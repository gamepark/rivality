import { ItemLocator } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { PlayerColor } from '@gamepark/rivality/PlayerColor'
import { boardLocator } from './BoardLocator'
import { playerDeckLocator } from './PlayerDeckLocator'
import { playerDeckQuantityLocator } from './PlayerDeckQuantityLocator'
import { playerGolemStackLocator } from './PlayerGolemStackLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { tileButtonLocator } from './TileButtonLocator'
import { tileScoreLocator } from './TileScoreLocator'

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.PlayerHand]: playerHandLocator,
  [LocationType.PlayerDeck]: playerDeckLocator,
  [LocationType.Board]: boardLocator,
  [LocationType.PlayerGolemStack]: playerGolemStackLocator,
  [LocationType.TileButton]: tileButtonLocator,
  [LocationType.PlayerDeckQuantity]: playerDeckQuantityLocator,
  [LocationType.TileScore]: tileScoreLocator
}
