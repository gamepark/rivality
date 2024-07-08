import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { Orientation } from '../Orientation'
import { RuleId } from './RuleId'

export class AskSpellOrientationRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    let moves:MaterialMove[]=[]

    if (!this.remind(Memory.AppliedSpellNorth))
      moves.push(this.rules().customMove(CustomMoveType.ChooseOrientation, Orientation.North))
    if (!this.remind(Memory.AppliedSpellEast))
      moves.push(this.rules().customMove(CustomMoveType.ChooseOrientation, Orientation.East))
    if (!this.remind(Memory.AppliedSpellSouth))
      moves.push(this.rules().customMove(CustomMoveType.ChooseOrientation, Orientation.South))
    if (!this.remind(Memory.AppliedSpellWest))
      moves.push(this.rules().customMove(CustomMoveType.ChooseOrientation, Orientation.West))

    return moves
  }

  applyEffect(spellOrientation:Orientation): MaterialMove[] {
    this.memorize(Memory.SpellOrientation, spellOrientation)
    return [this.rules().startPlayerTurn(RuleId.ApplySpellEffect, this.getActivePlayer())]
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (move.type !== CustomMoveType.ChooseOrientation) return []
    return this.applyEffect(move.data)
  }
}
