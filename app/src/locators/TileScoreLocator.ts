/** @jsxImportSource @emotion/react */
import { ItemLocator /*, ItemContext*/ } from '@gamepark/react-game'
//import { MaterialItem } from '@gamepark/rules-api'
import { TileScoreDescription } from './description/TileScoreDescription'
//import { tableDesign } from './position/TableDesign'

export class TileScoreLocator extends ItemLocator {
  locationDescription = new TileScoreDescription()

/*
  getCoordinates(item: MaterialItem, context: ItemContext) {
    return tableDesign.playerDeckCoordinates(item.location, context)
  }
*/
}

export const tileScoreLocator = new TileScoreLocator()
