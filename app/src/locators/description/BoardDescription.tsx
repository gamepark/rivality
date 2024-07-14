/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { score } from '@gamepark/rivality/logic/Score'
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

  highlight(location: Location, context: MaterialContext): boolean {
    const isTutorial = context.rules!==undefined && context.rules.game.tutorialStep!==undefined
    if (!isTutorial)
      return false
    const tutoStep=context.rules.game.tutorialStep
    return (
      (tutoStep===15 && location.x===-2 && location.y===0) ||
      (tutoStep===19 && location.x===-1 && location.y===1) ||
      (tutoStep===23 && location.x===1 && location.y===1) ||
      (tutoStep===27 && location.x===-1 && location.y===0)
    )
  }

  getLocations(context: MaterialContext) : Location[]  {
    const locations : Location[] = []
    let boardDimensions=tableDesign.getBoardDimensions(context.rules)
    const gameIsOver=context.rules.isOver()
    const golems=context.rules.material(MaterialType.Golem).location(LocationType.Board)
    const wizards=context.rules.material(MaterialType.Wizard).location(LocationType.Board)
    const wellController=score.playerControllingWellOfMana(golems)

    for (let i=boardDimensions.boardXMin-1; i<=boardDimensions.boardXMax+1; i++){
      for (let j=boardDimensions.boardYMin-1; j<=boardDimensions.boardYMax+1; j++){
        locations.push({
          type: LocationType.Board,
          x: i,
          y: j
        })

        // Score for the tile
        if (gameIsOver){
          const tile=context.rules
            .material(MaterialType.Tile)
            .location(LocationType.Board)
            .filter(item => item.location.x===i && item.location.y===j)
            .getItem()
          if (tile!==undefined){
            let highScore=0
            let highScorePlayer=0
            context.rules.players.forEach(p => {
              const playerScore=score.tileScore(p, tile, golems, wizards, wellController)
              if (playerScore>highScore){
                highScore=playerScore
                highScorePlayer=p
              }
            })
            if (highScore>0){
              locations.push({
                type: LocationType.TileScore,
                x: i,
                y: j,
                id: {score:highScore, player:highScorePlayer}
              })
            }
          }
        }
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
