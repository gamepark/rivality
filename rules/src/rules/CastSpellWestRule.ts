import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from '../rules/RuleId'
import { Orientation } from '../Orientation'

export class CastSpellWestRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    let moves:MaterialMove[]=[]

    // Apply effects of spell North
    // TODO

    // Find current hand orientation
    let handTilesItems=this
      .material(MaterialType.Tile)
      .location(LocationType.PlayerHand)
      .player(this.getActivePlayer())
      .getItems()
    let currentOrientation=Orientation.North
    let newCardCoord=1
    if (handTilesItems.length>0){
      currentOrientation=handTilesItems[0].location.rotation
      newCardCoord=3-handTilesItems[0].location.x!
    }

    // Draw card if possible
    moves.push(...this
      .material(MaterialType.Tile)
      .location(LocationType.PlayerDeck)
      .player(this.getActivePlayer())
      .deck().deal({
        type:LocationType.PlayerHand,
        player:this.getActivePlayer(),
        x:newCardCoord,
        rotation:currentOrientation
      }, 1)
    )

    // Go to next player's turn
    moves.push(this.rules().startPlayerTurn(RuleId.ChooseTile,
      this.nextPlayer))

    return moves
  }
}
