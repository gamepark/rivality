import { CustomMove, isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { tileTools } from '../logic/TileTools'
import { wizardTools } from '../logic/WizardTools'
import { BoardSpace } from '../material/BoardSpace'
import { Golem } from '../material/Golem'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from '../rules/RuleId'
import { Orientation } from '../Orientation'
import { CustomMoveType } from './CustomMoveType'

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

    // Orientation of hand cards
    moves.push(this.rules().customMove(CustomMoveType.RotateClockwise))

    let handTilesItems=handTiles.getItems()
    let currentOrientation=Orientation.North
    if (handTilesItems.length>0){
      currentOrientation=handTilesItems[0].location.rotation
    }

    let availableBoardCoords=tileTools.possibleTileLocations(
      this.material(MaterialType.Tile)
      .location(LocationType.Board)
      .getItems()
    )

    for (let i=0; i<availableBoardCoords.length; i++){
      let coord=availableBoardCoords[i]
      moves.push(...handTiles.moveItems({
        type: LocationType.Board,
        id: BoardSpace.Tile,
        x: coord.x,
        y: coord.y,
        rotation: currentOrientation
      }))
    }

    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItem(move)){
      if (move.itemType==MaterialType.Tile){
        // Move the wizard and a golem to the tile
        // Then apply tile effects
        return [
          ...this.material(MaterialType.Wizard).filter(item => item.id==wizardTools.playerWizard(this.getActivePlayer())).moveItems(
            {
              type: LocationType.Board,
              id: BoardSpace.Wizard,
              x:move.location.x,
              y:move.location.y
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
              x:move.location.x,
              y:move.location.y
            }
          ),
          this.rules().startPlayerTurn(RuleId.ValidateTile, this.getActivePlayer())
        ]
      }
    }
    return []
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (move.type===CustomMoveType.RotateClockwise){
      // 1 - Get current orientation
      let currentOrientation=Orientation.North
      let handTilesItems=this
        .material(MaterialType.Tile)
        .location(LocationType.PlayerHand)
        .player(this.getActivePlayer())
        .getItems()
      if (handTilesItems.length>0){
        currentOrientation=handTilesItems[0].location.rotation
      }

      // 2 - Compute new orientation
      let orientation=Orientation.North
      switch (currentOrientation){
        case Orientation.West:  orientation=Orientation.North; break
        case Orientation.North: orientation=Orientation.East; break
        case Orientation.East:  orientation=Orientation.South; break
        case Orientation.South: orientation=Orientation.West; break
      }

      // 3 - Apply new orientation
      return [this.material(MaterialType.Tile).location(LocationType.PlayerHand).player(this.getActivePlayer()).moveItemsAtOnce({ rotation:orientation })]
    }
    return []
  }
}
