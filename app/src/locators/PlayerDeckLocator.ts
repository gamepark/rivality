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
    const nbPlayers=context.rules.game.players.length

    if (nbPlayers===2){
      if (item.location.player===1)
        return 0
      if (item.location.player===2)
        return 180
    } else if (nbPlayers===3){
      if (item.location.player===1)
        return 0
      if (item.location.player===2)
        return 180
//        return 90
      if (item.location.player===3)
        return 180
    }
    return 0
  }
}

export const playerDeckLocator = new PlayerDeckLocator()
