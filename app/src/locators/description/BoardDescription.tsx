/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DropAreaDescription, LocationContext, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'
import { spaceBetweenTiles, tileDescription } from '../../material/TileDescription'
import { tableDesign } from '../position/TableDesign'

export class BoardDescription extends DropAreaDescription {
  height = tileDescription.height
  width = tileDescription.width
  borderRadius = tileDescription.borderRadius

  extraCss = css`border: 0.1em solid lightgrey`

  highlight(location: Location, context: MaterialContext): boolean {
    if (!context.rules.game.tutorial)
      return false
    const tutoStep = context.rules.game.tutorial.step
    return (
      (tutoStep === 15 && location.x === -2 && location.y === 0) ||
      (tutoStep === 19 && location.x === -1 && location.y === 1) ||
      (tutoStep === 23 && location.x === 1 && location.y === 1) ||
      (tutoStep === 27 && location.x === 0 && location.y === -1)
    )
  }

  getCoordinatesFromXY(coords: XYCoordinates, context: LocationContext): Coordinates {
    const baseCoordinates = tableDesign.boardCoordinates(context)
    return {
      x: baseCoordinates.x + (tileDescription.width + spaceBetweenTiles) * coords.x,
      y: baseCoordinates.y + (tileDescription.height + spaceBetweenTiles) * coords.y,
      z: 0
    }
  }
}
