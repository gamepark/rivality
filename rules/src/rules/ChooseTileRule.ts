import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { tileTools } from '../logic/TileTools'
import { wizardTools } from '../logic/WizardTools'
import { BoardSpace } from '../material/BoardSpace'
import { Golem } from '../material/Golem'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { orientations } from '../Orientation'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ChooseTileRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    const nbPlayers=this.game.players.length

    // End of game ?
    let nbUnplayedTiles=this
      .material(MaterialType.Tile)
      .filter(item => item.location.type!=LocationType.Board)
      .length

    let nbUnplayedGolems1=this
      .material(MaterialType.Golem)
      .location(LocationType.PlayerGolemStack)
      .filter(item => item.id==Golem.Golem1)
      .length

    let nbUnplayedGolems2=this
      .material(MaterialType.Golem)
      .location(LocationType.PlayerGolemStack)
      .filter(item => item.id==Golem.Golem2)
      .length

    let nbUnplayedGolems3=this
      .material(MaterialType.Golem)
      .location(LocationType.PlayerGolemStack)
      .filter(item => item.id==Golem.Golem3)
      .length

    if (
      nbUnplayedTiles==0
      || nbUnplayedGolems1==0
      || nbUnplayedGolems2==0
      || (nbPlayers== 3 && nbUnplayedGolems3==0)
    )
      return [ this.rules().endGame() ]

    // The game goes on
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    let moves:MaterialMove[]=[]

    let handTiles=this
      .material(MaterialType.Tile)
      .location(LocationType.PlayerHand)
      .player(this.getActivePlayer())

    let availableBoardCoords=tileTools.possibleTileLocations(
      this.material(MaterialType.Tile)
      .location(LocationType.Board)
      .getItems()
    )

    for (const orientation of orientations) {
      for (let i = 0; i < availableBoardCoords.length; i++) {
        let coord = availableBoardCoords[i]
        moves.push(...handTiles.moveItems({
          type: LocationType.Board,
          id: BoardSpace.Tile,
          x: coord.x,
          y: coord.y,
          rotation: orientation
        }))
      }
    }

    return moves
  }

  afterItemMove(move: ItemMove, context?: PlayMoveContext): MaterialMove[] {
    if (isMoveItemType(MaterialType.Tile)(move)) {
      if (move.location.type === LocationType.Board) {
        if (context?.local) {
          this.memorize(Memory.TilePreview, move.itemIndex)
        } else {
          this.forget(Memory.TilePreview)
          // Move the wizard and a golem to the tile
          // Then apply tile effects
          return [
            ...this.material(MaterialType.Wizard).filter(item => item.id == wizardTools.playerWizard(this.getActivePlayer())).moveItems(
              {
                type: LocationType.Board,
                id: BoardSpace.Wizard,
                x: move.location.x,
                y: move.location.y
              }
            ),
            this.material(MaterialType.Golem)
              .location(LocationType.PlayerGolemStack)
              .player(this.getActivePlayer())
              .sort(item => -item.location.x!)
              .limit(1).moveItemsAtOnce(
              {
                type: LocationType.Board,
                id: BoardSpace.Golem,
                x: move.location.x,
                y: move.location.y
              }
            ),
            this.rules().startPlayerTurn(RuleId.PrepareCastSpell, this.getActivePlayer())
          ]
        }
      } else if (move.location.type === LocationType.PlayerHand) {
        this.forget(Memory.TilePreview)
      }
    }
    return []
  }
}
