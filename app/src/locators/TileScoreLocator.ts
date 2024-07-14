/** @jsxImportSource @emotion/react */
import { ItemLocator /*, ItemContext*/ } from '@gamepark/react-game'
import { TileScoreDescription } from './description/TileScoreDescription'

export class TileScoreLocator extends ItemLocator {
  locationDescription = new TileScoreDescription()
}

export const tileScoreLocator = new TileScoreLocator()
