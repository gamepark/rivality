import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { Orientation } from '../Orientation'
import { RuleId } from '../rules/RuleId'

export class AskSpellOrientationRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    let moves:MaterialMove[]=[]

    if (!this.remind(Memory.AppliedSpellNorth)===true)
      moves.push(this.rules().customMove(CustomMoveType.North))
    if (!this.remind(Memory.AppliedSpellEast)===true)
      moves.push(this.rules().customMove(CustomMoveType.East))
    if (!this.remind(Memory.AppliedSpellSouth)===true)
      moves.push(this.rules().customMove(CustomMoveType.South))
    if (!this.remind(Memory.AppliedSpellWest)===true)
      moves.push(this.rules().customMove(CustomMoveType.West))

    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    switch (move.type){
      case CustomMoveType.North:
        this.memorize(Memory.SpellOrientation, Orientation.North)
        break
      case CustomMoveType.East:
        this.memorize(Memory.SpellOrientation, Orientation.East)
        break
      case CustomMoveType.South:
        this.memorize(Memory.SpellOrientation, Orientation.South)
        break
      case CustomMoveType.West:
        this.memorize(Memory.SpellOrientation, Orientation.West)
        break
    }
    return [this.rules().startPlayerTurn(RuleId.ApplySpellEffect, this.getActivePlayer())]
  }
}
