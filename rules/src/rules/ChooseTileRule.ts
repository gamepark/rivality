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

    /*
    let nbUnplayedGolems3=this
      .material(MaterialType.Golem)
      .location(LocationType.PlayerGolemStack)
      .filter(item => item.id==Golem.Golem3)
      .length
      */

    console.log(nbUnplayedTiles)
    console.log(nbUnplayedGolems1)
    console.log(nbUnplayedGolems2)
//    console.log(nbUnplayedGolems3)

    if (nbUnplayedTiles==0
      || nbUnplayedGolems1==0
      || nbUnplayedGolems2==0)
//      || nbUnplayedGolems3==0)
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
    let handTilesItems=handTiles.getItems()
    let currentOrientation=Orientation.North
    if (handTilesItems.length>0){
      currentOrientation=handTilesItems[0].location.rotation
      if (currentOrientation !== Orientation.North){
        moves.push(this.rules().customMove(CustomMoveType.Top))
      }
      if (currentOrientation !== Orientation.West){
        moves.push(this.rules().customMove(CustomMoveType.Left))
      }
      if (currentOrientation !== Orientation.South){
        moves.push(this.rules().customMove(CustomMoveType.Bottom))
      }
      if (currentOrientation !== Orientation.East){
        moves.push(this.rules().customMove(CustomMoveType.Right))
      }
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
          this.material(MaterialType.Golem).location(LocationType.PlayerGolemStack).player(this.getActivePlayer()).limit(1).moveItemsAtOnce(
            {
              type: LocationType.Board,
              id: BoardSpace.Golem,
              x:move.location.x,
              y:move.location.y
            }
          ),
          this.rules().startPlayerTurn(RuleId.CastSpellNorth, this.getActivePlayer())
        ]
      }
    }
    return []
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    let orientation:Orientation=Orientation.North
    if (move.type === CustomMoveType.Left) {
      orientation=Orientation.West
    } else if (move.type === CustomMoveType.Top) {
      orientation=Orientation.North
    } else if (move.type === CustomMoveType.Right) {
      orientation=Orientation.East
    } else if (move.type === CustomMoveType.Bottom) {
      orientation=Orientation.South
    }
    return [this.material(MaterialType.Tile).location(LocationType.PlayerHand).player(this.getActivePlayer()).moveItemsAtOnce({ rotation:orientation })]
  }
}
