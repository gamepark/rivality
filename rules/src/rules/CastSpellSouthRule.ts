import { MaterialMove } from '@gamepark/rules-api'
// import { RuleId } from '../rules/RuleId'
import { CastSpellRule } from './CastSpellRule'
import { Orientation } from '../Orientation'

export class CastSpellSouthRule extends CastSpellRule {
  onRuleStart(): MaterialMove[] {
    let moves:MaterialMove[]=[]

    // Apply effects of spell North
    moves.push(...this.castEffectsOrGoToNextOrientation(Orientation.South))

/*
    moves.push(this.rules().startPlayerTurn(RuleId.CastSpellWest,
      this.getActivePlayer()))
*/

    return moves
  }

  nextOrientation():Orientation {
    return Orientation.West
  }
}
