import { FlexLocator, LocationContext, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { golemDescription, spaceBetweenGolems } from '../material/GolemDescription'
import { tableDesign } from './position/TableDesign'

class PlayerGolemStackLocator extends FlexLocator {

  getLineSize(_: Location, { rules: { players } }: MaterialContext) {
    return players.length === 2 ? 10 : 5
  }

  getMaxLines(_: Location, { rules: { players } }: MaterialContext) {
    return players.length === 2 ? 3 : 4
  }

  gap = { x: golemDescription.width + spaceBetweenGolems }
  lineGap = { y: golemDescription.height + spaceBetweenGolems }

  getPositionDependencies(_location: Location, context: MaterialContext) {
    // The player areas reposition when the board (and thus the table size) grows
    return tableDesign.getBoardDimensions(context.rules)
  }

  getCoordinates(location: Location, context: LocationContext) {
    const baseCoordinates = tableDesign.playerGolemStackCoordinates(location, context)
    const nbGolemsPerLine = this.getLineSize(location, context)
    const nbGolemsLines = this.getMaxLines(location, context)
    return {
      x: baseCoordinates.x - (nbGolemsPerLine / 2) * (golemDescription.width + spaceBetweenGolems) + spaceBetweenGolems * 1.5,
      y: baseCoordinates.y - (nbGolemsLines / 2) * (golemDescription.height + spaceBetweenGolems) + spaceBetweenGolems * 1.5
    }
  }

  getRotateZ(location: Location, context: MaterialContext): number {
    return tableDesign.rotateZForPlayer(location.player, context)
  }
}

export const playerGolemStackLocator = new PlayerGolemStackLocator()
