/** @jsxImportSource @emotion/react */
import { ItemLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { PlayerGolemStackDescription } from './description/PlayerGolemStackDescription'
import { tableDesign } from './position/TableDesign'

export class PlayerGolemStackLocator extends ItemLocator {
  locationDescription = new PlayerGolemStackDescription()

  getPosition(item: MaterialItem, context: ItemContext) {
    return this.locationDescription.getCoordinates(item.location, context)
  }

  getRotateZ(item: MaterialItem, context: ItemContext): number {
    return tableDesign.rotateZforPlayer(item.location.player, context)
  }
}

export const playerGolemStackLocator = new PlayerGolemStackLocator()
