import { MaterialMove } from '@gamepark/rules-api'
import { Orientation } from '../Orientation'
import { CastSpellRule } from './CastSpellRule'

export class CastSpellWestRule extends CastSpellRule {
  onRuleStart(): MaterialMove[] {
    let moves:MaterialMove[]=[]

    // Apply effects of spell West
    moves.push(...this.castEffectsOrGoToNextOrientation(Orientation.West))

    return moves
  }

  nextOrientation():Orientation|undefined {
    return undefined
  }
}
