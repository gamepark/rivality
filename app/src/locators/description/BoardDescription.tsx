/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { spaceBetweenTiles, tileDescription } from '../../material/TileDescription'
import { tableDesign } from '../position/TableDesign'
import { uiTileTools } from '../../material/UITileTools'

export class BoardDescription extends LocationDescription {
  height = tileDescription.height
  width = tileDescription.width
  borderRadius = tileDescription.borderRadius

//  alwaysVisible = true
  extraCss = css`border: 0.1em solid lightgrey`

  isAlwaysVisible(location:Location, context: MaterialContext) : boolean {
    // Set as visible the locations around the tiles on the board
    // the tile preview is explicitly excluded
    let boardTiles=context.rules.material(MaterialType.Tile).location(LocationType.Board)
    let isOccupied=boardTiles
      .filter(item => item.location.x===location.x && item.location.y===location.y)
      .length > 0
    if (isOccupied)
      return false
    const tilePreviewCoords=uiTileTools.tilePreviewCoordinates(context.rules)
    let hasOccupiedNeighboors=boardTiles
      .filter(item =>
        (item.location.x===location.x!-1 && item.location.y===location.y) ||
        (item.location.x===location.x    && item.location.y===location.y!-1) ||
        (item.location.x===location.x!+1 && item.location.y===location.y) ||
        (item.location.x===location.x    && item.location.y===location.y!+1)
      )
      .filter(item =>
        (tilePreviewCoords===undefined ||
          item.location.x!==tilePreviewCoords.x ||
          item.location.y!==tilePreviewCoords.y)
      )
      .length > 0
    return hasOccupiedNeighboors
  }

  getLocations(context: MaterialContext) : Location[]  {
    const locations : Location[] = []
    let boardDimensions=tableDesign.getBoardDimensions(context.rules)
    for (let i=boardDimensions.boardXMin-1; i<=boardDimensions.boardXMax+1; i++){
      for (let j=boardDimensions.boardYMin-1; j<=boardDimensions.boardYMax+1; j++){
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
    return this.getCoordinatesFromXY(
      {x:location.x!, y:location.y!},
      context
    )
  }

  getCoordinatesFromXY(coords: XYCoordinates, context: LocationContext): Coordinates  {
    const baseCoordinates = this.getRegionCoordinates(context)
    return {
      x: baseCoordinates.x + (tileDescription.width +spaceBetweenTiles) * coords.x,
      y: baseCoordinates.y + (tileDescription.height+spaceBetweenTiles) * coords.y,
      z: 0
    }
  }

  getRegionCoordinates(context: LocationContext) {
    return tableDesign.boardCoordinates(context)
  }
}
