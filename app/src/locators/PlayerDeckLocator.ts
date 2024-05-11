/** @jsxImportSource @emotion/react */
import { DeckLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { PlayerDeckDescription } from './description/PlayerDeckDescription'
import { tableDesign } from './position/TableDesign'

export class PlayerDeckLocator extends DeckLocator {
  locationDescription = new PlayerDeckDescription()

  getCoordinates(item: MaterialItem, context: ItemContext) {
    return tableDesign.playerDeckCoordinates(item.location, context)
  }

  getRotateZ(item: MaterialItem, _context: ItemContext): number {
    if (item.location.player==1)
      return 0
    return 180
  }
}

export const playerDeckLocator = new PlayerDeckLocator()
