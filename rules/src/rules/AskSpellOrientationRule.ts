import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { Orientation } from '../Orientation'
import { RuleId } from './RuleId'

export class AskSpellOrientationRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    let moves:MaterialMove[]=[]

    if (!this.remind(Memory.AppliedSpellNorth))
      moves.push(this.rules().customMove(CustomMoveType.North))
    if (!this.remind(Memory.AppliedSpellEast))
      moves.push(this.rules().customMove(CustomMoveType.East))
    if (!this.remind(Memory.AppliedSpellSouth))
      moves.push(this.rules().customMove(CustomMoveType.South))
    if (!this.remind(Memory.AppliedSpellWest))
      moves.push(this.rules().customMove(CustomMoveType.West))

    return moves
  }

  applyEffect(spellOrientation:Orientation): MaterialMove[] {
    this.memorize(Memory.SpellOrientation, spellOrientation)
    return [this.rules().startPlayerTurn(RuleId.ApplySpellEffect, this.getActivePlayer())]
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    let spellOrientation:Orientation|undefined=undefined
    switch (move.type){
      case CustomMoveType.North:
        spellOrientation=Orientation.North
        break
      case CustomMoveType.East:
        spellOrientation=Orientation.East
        break
      case CustomMoveType.South:
        spellOrientation=Orientation.South
        break
      case CustomMoveType.West:
        spellOrientation=Orientation.West
        break
    }
    if (spellOrientation===undefined){
      console.log("*** ERROR - Unknown spell orientation => Game is stuck")
      return []
    }
    return this.applyEffect(spellOrientation)
  }
}
