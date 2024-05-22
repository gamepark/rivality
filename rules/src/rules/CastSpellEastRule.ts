import { MaterialMove } from '@gamepark/rules-api'
// import { RuleId } from '../rules/RuleId'
import { CastSpellRule } from './CastSpellRule'
import { Orientation } from '../Orientation'

export class CastSpellEastRule extends CastSpellRule {
  onRuleStart(): MaterialMove[] {
    let moves:MaterialMove[]=[]

    // Apply effects of spell East
    moves.push(...this.castEffectsOrGoToNextOrientation(Orientation.East))

/*
    moves.push(this.rules().startPlayerTurn(RuleId.CastSpellSouth,
      this.getActivePlayer()))
*/

    return moves
  }

  nextOrientation():Orientation {
    return Orientation.South
  }
}
