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

  getRotateZ(item: MaterialItem, context: ItemContext): number {
    return tableDesign.rotateZforPlayer(item.location.player, context)
  }
}

export const playerDeckLocator = new PlayerDeckLocator()
