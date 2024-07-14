/** @jsxImportSource @emotion/react */
import { ItemLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { PlayerDeckQuantityDescription } from './description/PlayerDeckQuantityDescription'
import { tableDesign } from './position/TableDesign'

export class PlayerDeckQuantityLocator extends ItemLocator {
  locationDescription = new PlayerDeckQuantityDescription()

  getCoordinates(item: MaterialItem, context: ItemContext) {
    return tableDesign.playerDeckCoordinates(item.location, context)
  }
}

export const playerDeckQuantityLocator = new PlayerDeckQuantityLocator()
