/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { Memory } from '@gamepark/rivality/rules/Memory'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { spaceBetweenTiles, tileDescription } from '../../material/TileDescription'
import { tableDesign } from '../position/TableDesign'

export class BoardDescription extends LocationDescription {
  height = tileDescription.height
  width = tileDescription.width
  borderRadius = tileDescription.borderRadius

//  alwaysVisible = true
//  extraCss = css`border: 0.05em solid lightgrey`

  isHighlightedSquare(location:Location, context: MaterialContext){
    let spellX=context.rules.remind(Memory.SpellTileX)
    let spellY=context.rules.remind(Memory.SpellTileY)
    return (spellX!==undefined && spellY!==undefined && location.x==spellX && location.y==spellY)
  }

  getExtraCss(location:Location, context: MaterialContext){
    if (this.isHighlightedSquare(location, context)){
      console.log('foo')
      return css`border: 0.2em solid darkred`
    }
    return css`border: 0.05em solid lightgrey`
  }

  isAlwaysVisible(location:Location, context: MaterialContext) : boolean {
    // Set as visible the highlighted square if any
    if (this.isHighlightedSquare(location, context))
      return true

    // Set as visible the locations around the tiles on the board
    let boardTiles=context.rules.material(MaterialType.Tile).location(LocationType.Board)
    let isOccupied=boardTiles
      .filter(item => item.location.x===location.x && item.location.y===location.y)
      .length > 0
    if (isOccupied)
      return false
    let hasOccupiedNeighboors=boardTiles
      .filter(item =>
        (item.location.x===location.x!-1 && item.location.y===location.y) ||
        (item.location.x===location.x    && item.location.y===location.y!-1) ||
        (item.location.x===location.x!+1 && item.location.y===location.y) ||
        (item.location.x===location.x    && item.location.y===location.y!+1)
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
    const baseCoordinates = this.getRegionCoordinates(location, context)
    return {
      x: baseCoordinates.x + (tileDescription.width +spaceBetweenTiles) * location.x!,
      y: baseCoordinates.y + (tileDescription.height+spaceBetweenTiles) * location.y!,
      z: 0
    }
  }

  getRegionCoordinates(location: Location, context: LocationContext) {
    return tableDesign.boardCoordinates(location, context)
  }
}
