/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { spaceBetweenTiles, tileDescription } from '../../material/TileDescription'
import { tableDesign } from '../position/TableDesign'

export class BoardDescription extends LocationDescription {
  height = tileDescription.height
  width = tileDescription.width
  borderRadius = tileDescription.borderRadius

  alwaysVisible = true
  extraCss = css`border: 0.05em solid lightgrey`

  getLocations(_context: MaterialContext) : Location[]  {
    const locations : Location[] = []
    for (let i=-5; i<=5; i++){
      for (let j=-5; j<=5; j++){
        locations.push({
          type: LocationType.Board,
          x: i,
          y: j
        })
      }
    }
    return locations
  }

  getCoordinates(location: Location, context: LocationContext): Coordinates  {
    const baseCoordinates = this.getRegionCoordinates(location, context)
    return {
      x: baseCoordinates.x + (tileDescription.width +spaceBetweenTiles) * ((location.x!-0.5)),
      y: baseCoordinates.y + (tileDescription.height+spaceBetweenTiles) * ((location.y!-0.5)),
      z: 0
    }
  }

  getRegionCoordinates(location: Location, context: LocationContext) {
    return tableDesign.boardCoordinates(location, context)
  }
}
