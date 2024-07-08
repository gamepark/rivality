import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CustomMoveType } from './CustomMoveType'
import { Direction } from '../logic/Direction'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Orientation } from '../Orientation'
import { RuleId } from './RuleId'
import { Tile } from '../material/Tile'
import { tileSpells } from '../logic/TileSpells'

export class StartRule extends PlayerTurnRule {
  onRuleStart(){
    if (this.firstPlayerMayPlaceAGolem()){
      return [this.rules().startPlayerTurn(RuleId.ChooseTile, this.getActivePlayer())]
    }
    return []
  }

  firstPlayerMayPlaceAGolem(){
    let foundSpellWithDistance1=false
    this.material(MaterialType.Tile).location(LocationType.PlayerHand).player(1)
      .getItems()
      .forEach(item => {
        const tile:Tile=item.id
        const leftSpell=tileSpells.spell(tile, Direction.Left)
        const topSpell=tileSpells.spell(tile, Direction.Top)
        const rightSpell=tileSpells.spell(tile, Direction.Right)
        const bottomSpell=tileSpells.spell(tile, Direction.Bottom)
        if (leftSpell.distance==1 || topSpell.distance==1 || rightSpell.distance==1 || bottomSpell.distance==1){
          foundSpellWithDistance1=true
        }
      })
    return foundSpellWithDistance1
  }

  getPlayerMoves(): MaterialMove[] {
    if (this.firstPlayerMayPlaceAGolem())
      return []
    return [
      this.rules().customMove(CustomMoveType.KeepHand),
      this.rules().customMove(CustomMoveType.NewHand)
    ]
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (move.type === CustomMoveType.KeepHand) {
      return [this.rules().startPlayerTurn(RuleId.ChooseTile, this.getActivePlayer())]
    } else if (move.type === CustomMoveType.NewHand) {
      let moves:MaterialMove[]=[]

      const initialDeck = this.material(MaterialType.Tile).location(LocationType.PlayerDeck).player(1).deck()

      // Discard hand
      moves.push(
        this.material(MaterialType.Tile).location(LocationType.PlayerHand).player(1)
          .moveItemsAtOnce({
            type: LocationType.PlayerDeck,
            player: 1
          })
        )

        moves.push(...initialDeck.deal({
          type: LocationType.PlayerHand,
          player:1,
          rotation: Orientation.North
          }, 2)
        )

      // Rebuild deck
      // Nothing to do

      // Shuffle deck then Start game
      // Note: The shuffle is delayed to ensure that the hiding strategy for all cards is the same
      moves.push(this.rules().startPlayerTurn(RuleId.ShufflePlayer1Deck, this.getActivePlayer()))
      return moves
    }
    return []
  }
}
