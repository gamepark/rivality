/** @jsxImportSource @emotion/react */
import { ItemLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { PlayerButtonDescription } from './description/PlayerButtonDescription'

export class PlayerButtonLocator extends ItemLocator {
  locationDescription = new PlayerButtonDescription()

  getPosition(item: MaterialItem, context: ItemContext) {
    return this.locationDescription.getCoordinates(item.location, context)
  }
}

export const playerButtonLocator = new PlayerButtonLocator()
