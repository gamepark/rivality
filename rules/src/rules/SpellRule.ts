import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Memory } from './Memory'
import { Orientation } from '../Orientation'
import { RuleId } from '../rules/RuleId'

export abstract class SpellRule extends PlayerTurnRule {
  spellAction(orientation:Orientation|undefined) : MaterialMove {
    if (orientation==Orientation.North){
      return this.rules()
      .startPlayerTurn(RuleId.CastSpellSouth, this.getActivePlayer())
    }
    if (orientation==Orientation.East){
      return this.rules()
      .startPlayerTurn(RuleId.CastSpellEast, this.getActivePlayer())
    }
    if (orientation==Orientation.South){
      return this.rules()
      .startPlayerTurn(RuleId.CastSpellSouth, this.getActivePlayer())
    }
    if (orientation==Orientation.West){
      return this.rules()
      .startPlayerTurn(RuleId.CastSpellWest, this.getActivePlayer())
    }

    return this.rules()
    .startPlayerTurn(RuleId.EndTurn, this.getActivePlayer())
  }

  // TODO - Rename as nextOrientation() after removal of such methods from CastSpellXXX rules
  followingOrientation() : Orientation|undefined {
    const currentOrientation:Orientation = this.remind(Memory.SpellOrientation)
    if (currentOrientation==Orientation.North) return Orientation.East
    if (currentOrientation==Orientation.East) return Orientation.South
    if (currentOrientation==Orientation.South) return Orientation.West
    if (currentOrientation==Orientation.West) return undefined
    console.log("*** ERROR - Unexpected orientation")
    return undefined
  }
}
