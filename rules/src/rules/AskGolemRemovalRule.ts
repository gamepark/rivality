import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class AskGolemRemovalRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    return this.game.players.filter(p => p !== this.getActivePlayer()).map(p => this.customMove(CustomMoveType.ChoosePlayer, p))
  }

  applyEffect(player: number): MaterialMove[] {
    const tileX=this.remind(Memory.SpellTileX)
    const tileY=this.remind(Memory.SpellTileY)

    let moves:MaterialMove[]=[]
    moves.push(...this
      .material(MaterialType.Golem)
      .location(LocationType.Board)
      .filter(item =>
        item.location.x==tileX
        && item.location.y==tileY
        && item.id==player
      )
      .limit(1)
      .moveItems(
        {
          type: LocationType.PlayerGolemStack,
          player: player
        }
      ))
    moves.push(this.startPlayerTurn(RuleId.RemoveGolem, this.getActivePlayer()))
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (move.type !== CustomMoveType.ChoosePlayer) return []
    return this.applyEffect(move.data)
  }
}
