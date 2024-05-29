import { RivalitySetup } from '@gamepark/rivality/RivalitySetup'
import { RuleId } from '@gamepark/rivality/rules/RuleId'

//const me = 1
//const opponent = 2
export class TutorialSetup extends RivalitySetup {
  start() {
//    this.material(MaterialType.KingdomCard).location(LocationType.KingdomDeck).deck().dealOne({ type: LocationType.KingdomDiscard, rotation:true })
    this.startPlayerTurn(RuleId.Start, this.game.players[0])
  }
}
