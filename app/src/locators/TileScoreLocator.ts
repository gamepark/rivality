import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { boardLocator } from './BoardLocator'
import { TileScoreDescription } from './description/TileScoreDescription'

export class TileScoreLocator extends Locator {
  locationDescription = new TileScoreDescription()

  getCoordinates(location: Location, context: MaterialContext) {
    const baseCoords = boardLocator.locationDescription.getCoordinatesFromXY(
      { x: location.x!, y: location.y! },
      context
    )
    return {
      x: baseCoords.x,
      y: baseCoords.y,
      z: 5
    }
  }
}

export const tileScoreLocator = new TileScoreLocator()
