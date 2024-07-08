import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

// Note: This rule allows to ensure that the hiding strategy for all cards in the player's deck is the same
export class ShufflePlayer1DeckRule extends PlayerTurnRule {
  onRuleStart(){
    return [
      this.material(MaterialType.Tile).location(LocationType.PlayerDeck).player(1).shuffle(),
      this.startPlayerTurn(RuleId.ChooseTile, this.getActivePlayer())
    ]
  }
}
