import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Orientation } from '../Orientation'
import { RuleId } from './RuleId'
import { Memory } from './Memory'

export class EndTurnRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    let moves:MaterialMove[]=[]

    // Clean game state
    this.forget(Memory.SpellOrientation)
    this.forget(Memory.SpellTileX)
    this.forget(Memory.SpellTileY)

    // Draw card if possible
    moves.push(...this
      .material(MaterialType.Tile)
      .location(LocationType.PlayerDeck)
      .player(this.getActivePlayer())
      .deck().deal({
        type:LocationType.PlayerHand,
        player:this.getActivePlayer(),
        rotation:Orientation.North
      }, 1)
    )

    // Go to next player's turn
    moves.push(this.startPlayerTurn(RuleId.ChooseTile,
      this.nextPlayer))

    return moves
  }
}
