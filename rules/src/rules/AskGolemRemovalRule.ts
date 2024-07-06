import { CustomMove, isCustomMove, isSelectItemType, ItemMove, MaterialItem, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { BoardSpace } from '../material/BoardSpace'
import { Button } from '../material/Button'
import { CustomMoveType } from './CustomMoveType'
import { golemTools } from '../logic/GolemTools'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from '../rules/RuleId'

export class AskGolemRemovalRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    const moves:MaterialMove[]=[]
    // Remove any previous button
    moves.push(this.material(MaterialType.Button).location(LocationType.Board).deleteItemsAtOnce())

    // Add needed buttons
    const legalMoves:MaterialMove[]=this.listPossiblePlayerMoves()
    const newButtons:MaterialItem[]=[]
    let boardButtons:Button[]=[]

    if (legalMoves
      .filter((move) =>
        isCustomMove(move) && move.type===CustomMoveType.Player1)
      .length > 0)
      boardButtons.push(Button.RemoveGolem1)

    if (legalMoves
      .filter((move) =>
        isCustomMove(move) && move.type===CustomMoveType.Player2)
      .length > 0)
      boardButtons.push(Button.RemoveGolem2)

    if (legalMoves
      .filter((move) =>
        isCustomMove(move) && move.type===CustomMoveType.Player3)
      .length > 0)
      boardButtons.push(Button.RemoveGolem3)

    boardButtons.forEach(button => {
      newButtons.push({
        id: button,
        location: {
          type: LocationType.Board,
          id: BoardSpace.Button
        }
      })
    })
    moves.push(this.material(MaterialType.Button).createItemsAtOnce(newButtons))

    return moves
  }

  onRuleEnd(){
    // Remove all buttons
    return [this.material(MaterialType.Button).location(LocationType.Board).deleteItemsAtOnce()]
  }

  listPossiblePlayerMoves(): MaterialMove[] {
    let moves:MaterialMove[]=[]

    const activePlayer = this.getActivePlayer()
    if (activePlayer!=1){
      moves.push(this.rules().customMove(CustomMoveType.Player1))
    }
    if (activePlayer!=2){
      moves.push(this.rules().customMove(CustomMoveType.Player2))
    }
    if (activePlayer!=3){
      moves.push(this.rules().customMove(CustomMoveType.Player3))
    }

    return moves
  }

  getPlayerMoves(): MaterialMove[] {
    let moves:MaterialMove[]=[]

    // Header moves
    moves.push(...this.listPossiblePlayerMoves())

    // Button moves
    moves.push(...this.material(MaterialType.Button).location(LocationType.Board).selectItems())

    return moves
  }

  applyEffect(player: number): MaterialMove[] {
    const tileX=this.remind(Memory.SpellTileX)
    const tileY=this.remind(Memory.SpellTileY)
    const golemId=golemTools.playerGolem(player)

    let moves:MaterialMove[]=[]
    moves.push(...this
      .material(MaterialType.Golem)
      .location(LocationType.Board)
      .filter(item =>
        item.location.x==tileX
        && item.location.y==tileY
        && item.id==golemId
      )
      .limit(1)
      .moveItems(
        {
          type: LocationType.PlayerGolemStack,
          player: player
        }
      ))
    moves.push(this.rules().startPlayerTurn(RuleId.RemoveGolem, this.getActivePlayer()))
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    let player=1
    if (move.type === CustomMoveType.Player1) {
      player=1
    } else if (move.type === CustomMoveType.Player2) {
      player=2
    } else if (move.type === CustomMoveType.Player3) {
      player=3
    }

    return this.applyEffect(player)
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isSelectItemType(MaterialType.Button)(move)){
      const buttonId=this.material(MaterialType.Button).getItem(move.itemIndex)?.id
      let player:number|undefined=undefined
      switch (buttonId){
        case Button.RemoveGolem1:
          player=1
          break
        case Button.RemoveGolem2:
          player=2
          break
        case Button.RemoveGolem3:
          player=3
          break
      }
      if (player===undefined){
        console.log("*** ERROR - Unknown player")
        return []
      }
      return this.applyEffect(player)
    }
    return []
  }
}
