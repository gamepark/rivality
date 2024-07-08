import { PlayerTurnRule } from '@gamepark/rules-api'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PrepareCastSpellRule extends PlayerTurnRule {
  onRuleStart() {
    this.forget(Memory.AppliedSpellNorth)
    this.forget(Memory.AppliedSpellEast)
    this.forget(Memory.AppliedSpellSouth)
    this.forget(Memory.AppliedSpellWest)

    return [
      this.startPlayerTurn(RuleId.SelectCastSpellOrientation, this.getActivePlayer())
    ]
  }
}
