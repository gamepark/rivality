/** @jsxImportSource @emotion/react */
import { ItemLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { PlayerGolemStackDescription } from './description/PlayerGolemStackDescription'

export class PlayerGolemStackLocator extends ItemLocator {
  locationDescription = new PlayerGolemStackDescription()

  getPosition(item: MaterialItem, context: ItemContext) {
    return this.locationDescription.getCoordinates(item.location, context)
  }
}

export const playerGolemStackLocator = new PlayerGolemStackLocator()
