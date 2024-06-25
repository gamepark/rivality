/** @jsxImportSource @emotion/react */
import { ItemLocator } from '@gamepark/react-game'
import { TileButtonDescription } from './description/TileButtonDescription'

export class TileButtonLocator extends ItemLocator {
  locationDescription = new TileButtonDescription()
}

export const tileButtonLocator = new TileButtonLocator()
