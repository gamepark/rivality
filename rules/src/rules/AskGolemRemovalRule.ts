import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CustomMoveType } from './CustomMoveType'
import { golemTools } from '../logic/GolemTools'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class AskGolemRemovalRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
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
}
