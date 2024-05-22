import { MaterialMove } from '@gamepark/rules-api'
// import { RuleId } from '../rules/RuleId'
import { CastSpellRule } from './CastSpellRule'
import { Orientation } from '../Orientation'

export class CastSpellNorthRule extends CastSpellRule {
  onRuleStart(): MaterialMove[] {
    let moves:MaterialMove[]=[]

    // Apply effects of spell North
    moves.push(...this.castEffectsOrGoToNextOrientation(Orientation.North))

/*
    moves.push(this.rules().startPlayerTurn(RuleId.CastSpellEast,
      this.getActivePlayer()))
*/

    return moves
  }

  nextOrientation():Orientation {
    return Orientation.East
  }
}
