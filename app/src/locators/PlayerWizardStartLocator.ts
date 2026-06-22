import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { golemDescription, spaceBetweenGolems } from '../material/GolemDescription'
import { Corner, tableDesign } from './position/TableDesign'

export class PlayerWizardStartLocator extends Locator {
  getPositionDependencies(_location: Location, context: MaterialContext) {
    // The player areas reposition when the board (and thus the table size) grows
    return tableDesign.getBoardDimensions(context.rules)
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const player = location.player
    if (player === undefined)
      return { x: 0, y: 0, z: 0 }
    const corner = tableDesign.playerCorner(player, context)
    const baseCoords = tableDesign.playerGolemStackCoordinates(location, context)
    switch (corner) {
      case Corner.TopLeft:
      case Corner.BottomLeft:
        return {
          x: baseCoords.x + 6 * (golemDescription.width + spaceBetweenGolems),
          y: baseCoords.y,
          z: 0
        }
      case Corner.TopRight:
      case Corner.BottomRight:
        return {
          x: baseCoords.x - 6 * (golemDescription.width + spaceBetweenGolems),
          y: baseCoords.y,
          z: 0
        }
    }
    console.log('*** ERROR - Unsupported corner')
    return { x: 0, y: 0, z: 0 }
  }

  getRotateZ(location: Location, context: MaterialContext): number {
    return tableDesign.rotateZForPlayer(location.player, context)
  }
}

export const playerWizardStartLocator = new PlayerWizardStartLocator()
