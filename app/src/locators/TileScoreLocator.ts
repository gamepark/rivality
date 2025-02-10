/** @jsxImportSource @emotion/react */
import { Locator /*, ItemContext*/ } from '@gamepark/react-game'
import { TileScoreDescription } from './description/TileScoreDescription'

export class TileScoreLocator extends Locator {
  locationDescription = new TileScoreDescription()
}

export const tileScoreLocator = new TileScoreLocator()
