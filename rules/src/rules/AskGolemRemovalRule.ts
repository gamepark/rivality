import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CustomMoveType } from './CustomMoveType'
import { golemTools } from '../logic/GolemTools'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class AskGolemRemovalRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    return this.game.players.filter(p => p !== this.getActivePlayer()).map(p => this.rules().customMove(CustomMoveType.ChoosePlayer, p))
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
    if (move.type !== CustomMoveType.ChoosePlayer) return []
    return this.applyEffect(move.data)
  }
}
