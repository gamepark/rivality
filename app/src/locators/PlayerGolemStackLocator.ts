/** @jsxImportSource @emotion/react */
import { ItemLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { PlayerGolemStackDescription } from './description/PlayerGolemStackDescription'

export class PlayerGolemStackLocator extends ItemLocator {
  locationDescription = new PlayerGolemStackDescription()

  getPosition(item: MaterialItem, context: ItemContext) {
    return this.locationDescription.getCoordinates(item.location, context)
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
      if (item.location.player===3)
        return 180
    }
    return 0
  }
}

export const playerGolemStackLocator = new PlayerGolemStackLocator()
