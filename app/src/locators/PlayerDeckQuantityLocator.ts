import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { tileDescription } from '../material/TileDescription'
import { PlayerDeckQuantityDescription } from './description/PlayerDeckQuantityDescription'
import { tableDesign } from './position/TableDesign'

export class PlayerDeckQuantityLocator extends Locator {
  locationDescription = new PlayerDeckQuantityDescription()

  getPositionDependencies(_location: Location, context: MaterialContext) {
    // The player areas reposition when the board (and thus the table size) grows
    return tableDesign.getBoardDimensions(context.rules)
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const { x, y } = tableDesign.playerDeckCoordinates(location, context)
    return {
      x: x + (tileDescription.width / 2) - 1.5,
      y: y + (tileDescription.height / 2) - 1.5,
      z: 5
    }
  }
}

export const playerDeckQuantityLocator = new PlayerDeckQuantityLocator()
