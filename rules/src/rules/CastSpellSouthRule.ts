import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { RuleId } from '../rules/RuleId'

export class CastSpellSouthRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    let moves:MaterialMove[]=[]

    // Apply effects of spell North
    // TODO

    moves.push(this.rules().startPlayerTurn(RuleId.CastSpellWest,
      this.getActivePlayer()))

    return moves
  }
}
