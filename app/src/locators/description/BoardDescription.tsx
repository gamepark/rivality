/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { golemTools } from '@gamepark/rivality/logic/GolemTools'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Orientation } from '@gamepark/rivality/Orientation'
import { RuleId } from '@gamepark/rivality/rules/RuleId'
import { score } from '@gamepark/rivality/logic/Score'
import { spaceBetweenTiles, tileDescription } from '../../material/TileDescription'
import { tableDesign } from '../position/TableDesign'
import { tileSpells } from '@gamepark/rivality/logic/TileSpells'
import { tileTools } from '@gamepark/rivality/logic/TileTools'
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
      (tutoStep===27 && location.x===0 && location.y===-1)
    )
  }

  getLocations(context: MaterialContext) : Location[]  {
    const locations : Location[] = []
    let boardDimensions=tableDesign.getBoardDimensions(context.rules)
    const activePlayer=context.rules.getActivePlayer()
    const currentPlayer=context.player
    const gameIsOver=context.rules.isOver()
    const pendingTileValidation=context.rules.state.rule?.id===RuleId.ChooseTile
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

        // Only write on top of occupied tiles
        const tile=context.rules
          .material(MaterialType.Tile)
          .location(LocationType.Board)
          .filter(item => item.location.x===i && item.location.y===j)
          .getItem()
        if (tile===undefined)
          continue

        // Score for the tile
        if (gameIsOver){
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
        } else if (pendingTileValidation){
          if (activePlayer===undefined)
            continue

          if (activePlayer!==currentPlayer)
            continue

          // Nb golems on this target tile if the current tile is validated
          if (uiTileTools.isUnderAttackSquareXY({x:i, y:j}, context)){
            let nbAddedGolems=0
            const hasOpponentWizard=context.rules.material(MaterialType.Wizard)
              .location(LocationType.Board)
              .filter(item =>
                item.location.x===i &&
                item.location.y===j &&
                item.id!==activePlayer
              )
              .length > 0

            if (!hasOpponentWizard){
              // Look for the spell tile
              const spellLocation=uiTileTools.activePlayerWizardLocation(context)
              if (spellLocation===undefined || spellLocation.x===undefined || spellLocation.y===undefined)
                continue

              const spellTileItem=context.rules.material(MaterialType.Tile)
                .location(LocationType.Board)
                .filter(item => item.location.x===spellLocation.x && item.location.y===spellLocation.y)
                .getItem()
              if (spellTileItem===undefined)
                continue
              const spellTileId=spellTileItem.id

              // Look for the spell targeting the current tile
              const spellTileOrientation=spellLocation.rotation
              let spellOrientation=Orientation.North
              if (spellLocation.x<i)
                spellOrientation=Orientation.East
              else if (spellLocation.x>i)
                spellOrientation=Orientation.West
              else if (spellLocation.y<j)
                spellOrientation=Orientation.South

              const spellSide=tileTools.tileSideFromOrientations(spellOrientation, spellTileOrientation)
              const spell=tileSpells.spell(spellTileId, spellSide)

              // Look for the nb of golems sent by the spell
              const nbSpellGolems=spell.nbGolems
              const stackSize=context.rules.material(MaterialType.Golem)
                .location(LocationType.PlayerGolemStack)
                .player(activePlayer)
                .length
              const nbSpellGolemsOrStackMinusOne=(stackSize>(nbSpellGolems+1)) ? nbSpellGolems : stackSize-1

              // Clarify the control of the current tile by golems
              const golemsOnCurrentTile=context.rules.material(MaterialType.Golem)
                .location(LocationType.Board)
                .filter(item => item.location.x===i && item.location.y===j)
              const golemCountOnCurrentTile=golemTools.golemCount(golemsOnCurrentTile, activePlayer)

              // Look for the nb of active shields on the current tile
              let nbShields=0
              if (golemCountOnCurrentTile.isTileControlledByOpponent &&
                !spell.breakShields){
                nbShields=tileTools.nbProtectionShields(tile.id)

                // Extra shield for 5 golems
                if (golemCountOnCurrentTile.hasFiveGolemsOfASingleOpponent)
                  nbShields+=1
              }

              // Total nb of added golems
              nbAddedGolems=nbSpellGolemsOrStackMinusOne-nbShields

              if (nbAddedGolems<0)
                nbAddedGolems=0
            }

            locations.push({
              type: LocationType.TileScore,
              x: i,
              y: j,
              id: {golems:nbAddedGolems, player:activePlayer}
            })
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
