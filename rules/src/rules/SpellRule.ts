import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Memory } from './Memory'
import { Orientation } from '../Orientation'
import { RuleId } from '../rules/RuleId'

export abstract class SpellRule extends PlayerTurnRule {
  spellAction(orientation:Orientation|undefined) : MaterialMove {
    if (orientation===undefined){
      this.forget(Memory.SpellOrientation)
      return this.rules().startPlayerTurn(RuleId.EndTurn, this.getActivePlayer())
    }

    this.memorize(Memory.SpellOrientation, orientation)
    return this.rules().startPlayerTurn(RuleId.CastSpell, this.getActivePlayer())
  }

  nextOrientation() : Orientation|undefined {
    const currentOrientation:Orientation = this.remind(Memory.SpellOrientation)
    if (currentOrientation==Orientation.North) return Orientation.East
    if (currentOrientation==Orientation.East) return Orientation.South
    if (currentOrientation==Orientation.South) return Orientation.West
    if (currentOrientation==Orientation.West) return undefined
    console.log("*** ERROR - Unexpected orientation")
    return undefined
  }
}
