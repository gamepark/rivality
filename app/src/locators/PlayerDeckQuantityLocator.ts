/** @jsxImportSource @emotion/react */
import { ItemLocator } from '@gamepark/react-game'
import { PlayerDeckQuantityDescription } from './description/PlayerDeckQuantityDescription'

export class PlayerDeckQuantityLocator extends ItemLocator {
  locationDescription = new PlayerDeckQuantityDescription()
}

export const playerDeckQuantityLocator = new PlayerDeckQuantityLocator()
