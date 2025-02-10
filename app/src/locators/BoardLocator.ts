/** @jsxImportSource @emotion/react */
import { Locator, MaterialContext } from '@gamepark/react-game'
import { golemTools } from '@gamepark/rivality/logic/GolemTools'
import { score } from '@gamepark/rivality/logic/Score'
import { tileSpells } from '@gamepark/rivality/logic/TileSpells'
import { tileTools } from '@gamepark/rivality/logic/TileTools'
import { BoardSpace } from '@gamepark/rivality/material/BoardSpace'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { Orientation } from '@gamepark/rivality/Orientation'
import { RuleId } from '@gamepark/rivality/rules/RuleId'
import { Location } from '@gamepark/rules-api'
import { uiTileTools } from '../material/UITileTools'
import { BoardDescription } from './description/BoardDescription'
import { tableDesign } from './position/TableDesign'

class BoardLocator extends Locator {

  locationDescription = new BoardDescription()

  getLocations(context: MaterialContext): Location[] {
    const locations: Location[] = []
    let boardDimensions = tableDesign.getBoardDimensions(context.rules)
    const activePlayer = context.rules.getActivePlayer()
    const currentPlayer = context.player
    const gameIsOver = context.rules.isOver()
    const pendingTileValidation = context.rules.state.rule?.id === RuleId.ChooseTile
    const golems = context.rules.material(MaterialType.Golem).location(LocationType.Board)
    const wizards = context.rules.material(MaterialType.Wizard).location(LocationType.Board)
    const wellController = score.playerControllingWellOfMana(golems)
    const boardTiles = context.rules.material(MaterialType.Tile).location(LocationType.Board)
    const tilePreviewCoords = uiTileTools.tilePreviewCoordinates(context.rules)

    for (let x = boardDimensions.boardXMin - 1; x <= boardDimensions.boardXMax + 1; x++) {
      for (let y = boardDimensions.boardYMin - 1; y <= boardDimensions.boardYMax + 1; y++) {
        const occupied = boardTiles.filter(item => item.location.x === x && item.location.y === y).length > 0
        if (!occupied) {
          const hasOccupiedNeighbors = boardTiles
            .filter(item =>
              (item.location.x === x! - 1 && item.location.y === y) ||
              (item.location.x === x && item.location.y === y! - 1) ||
              (item.location.x === x! + 1 && item.location.y === y) ||
              (item.location.x === x && item.location.y === y! + 1)
            )
            .filter(item =>
              (tilePreviewCoords === undefined ||
                item.location.x !== tilePreviewCoords.x ||
                item.location.y !== tilePreviewCoords.y)
            )
            .length > 0
          if (hasOccupiedNeighbors) {
            locations.push({
              type: LocationType.Board,
              x: x,
              y: y
            })
          }
        } else {
          // Only write on top of occupied tiles
          const tile = context.rules
            .material(MaterialType.Tile)
            .location(LocationType.Board)
            .filter(item => item.location.x === x && item.location.y === y)
            .getItem()
          if (tile === undefined)
            continue
          // Score for the tile
          if (gameIsOver) {
            let highScore = 0
            let highScorePlayer = 0
            context.rules.players.forEach(p => {
              const playerScore = score.tileScore(p, tile, golems, wizards, wellController)
              if (playerScore > highScore) {
                highScore = playerScore
                highScorePlayer = p
              }
            })
            if (highScore > 0) {
              locations.push({
                type: LocationType.TileScore,
                x: x,
                y: y,
                id: { score: highScore, player: highScorePlayer }
              })
            }
          } else if (pendingTileValidation) {
            if (activePlayer === undefined)
              continue

            if (activePlayer !== currentPlayer)
              continue

            // Nb golems on this target tile if the current tile is validated
            if (uiTileTools.isUnderAttackSquareXY({ x: x, y: y }, context)) {
              let nbAddedGolems = 0
              const hasOpponentWizard = context.rules.material(MaterialType.Wizard)
                .location(LocationType.Board)
                .filter(item =>
                  item.location.x === x &&
                  item.location.y === y &&
                  item.id !== activePlayer
                )
                .length > 0

              if (!hasOpponentWizard) {
                // Look for the spell tile
                const spellLocation = uiTileTools.activePlayerWizardLocation(context)
                if (spellLocation === undefined || spellLocation.x === undefined || spellLocation.y === undefined)
                  continue

                const spellTileItem = context.rules.material(MaterialType.Tile)
                  .location(LocationType.Board)
                  .filter(item => item.location.x === spellLocation.x && item.location.y === spellLocation.y)
                  .getItem()
                if (spellTileItem === undefined)
                  continue
                const spellTileId = spellTileItem.id

                // Look for the spell targeting the current tile
                const spellTileOrientation = spellLocation.rotation
                let spellOrientation = Orientation.North
                if (spellLocation.x < x)
                  spellOrientation = Orientation.East
                else if (spellLocation.x > x)
                  spellOrientation = Orientation.West
                else if (spellLocation.y < y)
                  spellOrientation = Orientation.South

                const spellSide = tileTools.tileSideFromOrientations(spellOrientation, spellTileOrientation)
                const spell = tileSpells.spell(spellTileId, spellSide)

                // Look for the nb of golems sent by the spell
                const nbSpellGolems = spell.nbGolems
                const stackSize = context.rules.material(MaterialType.Golem)
                  .location(LocationType.PlayerGolemStack)
                  .player(activePlayer)
                  .length
                const nbSpellGolemsOrStackMinusOne = (stackSize > (nbSpellGolems + 1)) ? nbSpellGolems : stackSize - 1

                // Clarify the control of the current tile by golems
                const golemsOnCurrentTile = context.rules.material(MaterialType.Golem)
                  .location(LocationType.Board)
                  .filter(item => item.location.x === x && item.location.y === y)
                const golemCountOnCurrentTile = golemTools.golemCount(golemsOnCurrentTile, activePlayer)

                // Look for the nb of active shields on the current tile
                let nbShields = 0
                if (golemCountOnCurrentTile.isTileControlledByOpponent &&
                  !spell.breakShields) {
                  nbShields = tileTools.nbProtectionShields(tile.id)

                  // Extra shield for 5 golems
                  if (golemCountOnCurrentTile.hasFiveGolemsOfASingleOpponent)
                    nbShields += 1
                }

                // Total nb of added golems
                nbAddedGolems = nbSpellGolemsOrStackMinusOne - nbShields

                if (nbAddedGolems < 0)
                  nbAddedGolems = 0
              }

              locations.push({
                type: LocationType.TileScore,
                x: x,
                y: y,
                id: { golems: nbAddedGolems, player: activePlayer }
              })
            }
          }
        }
      }
    }
    return locations
  }

  getPositionDeltaTile() {
    // The tile is centered
    return { x: 0, y: 0, z: 0 }
  }

  getPositionDeltaGolem(location: Location, context: MaterialContext) {
    let indexOnCard = context.rules
      .material(MaterialType.Golem)
      .location(LocationType.Board)
      .filter(a => a.location.x === location.x && a.location.y === location.y && a.location.z! <= location.z!)
      .length

    let nbGolemsOnCard = context.rules
      .material(MaterialType.Golem)
      .location(LocationType.Board)
      .filter(a => a.location.x === location.x && a.location.y === location.y)
      .length

    let radius = 2
    return {
      x: -radius * Math.cos(2 * Math.PI / nbGolemsOnCard * indexOnCard + (Math.PI / 2)),
      y: -radius * Math.sin(2 * Math.PI / nbGolemsOnCard * indexOnCard + (Math.PI / 2)),
      z: 1
    }
  }

  getPositionDeltaWizard() {
    return { x: 0, y: 0, z: 1 }
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const baseCoordinates = this.locationDescription.getCoordinatesFromXY(
      { x: location.x!, y: location.y! },
      context
    )
    let delta = { x: 0, y: 0, z: 0 }

    switch (location.id) {
      case BoardSpace.Tile:
        delta = this.getPositionDeltaTile()
        break
      case BoardSpace.Golem:
        delta = this.getPositionDeltaGolem(location, context)
        break
      case BoardSpace.Wizard:
        delta = this.getPositionDeltaWizard()
        break
    }

    return {
      x: baseCoordinates.x + delta.x,
      y: baseCoordinates.y + delta.y,
      z: baseCoordinates.z + delta.z
    }
  }
}

export const boardLocator = new BoardLocator()
