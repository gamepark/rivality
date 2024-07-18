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
      return [this.startPlayerTurn(RuleId.ChooseTile, this.getActivePlayer())]
    }
    return []
  }

  firstPlayerMayPlaceAGolem(){
    const activePlayer=this.getActivePlayer()
    let foundSpellWithDistance1=false
    this.material(MaterialType.Tile).location(LocationType.PlayerHand).player(activePlayer)
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
      this.customMove(CustomMoveType.KeepHand),
      this.customMove(CustomMoveType.NewHand)
    ]
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    const activePlayer=this.getActivePlayer()
    if (move.type === CustomMoveType.KeepHand) {
      return [this.startPlayerTurn(RuleId.ChooseTile, activePlayer)]
    } else if (move.type === CustomMoveType.NewHand) {
      let moves:MaterialMove[]=[]

      const initialDeck = this.material(MaterialType.Tile).location(LocationType.PlayerDeck).player(activePlayer).deck()

      // Discard hand
      moves.push(
        this.material(MaterialType.Tile).location(LocationType.PlayerHand).player(activePlayer)
          .moveItemsAtOnce({
            type: LocationType.PlayerDeck,
            player: activePlayer
          })
        )

        moves.push(...initialDeck.deal({
          type: LocationType.PlayerHand,
          player:activePlayer,
          rotation: Orientation.North
          }, 2)
        )

      // Rebuild deck
      // Nothing to do

      // Shuffle deck then Start game
      // Note: The shuffle is delayed to ensure that the hiding strategy for all cards is the same
      moves.push(this.startPlayerTurn(RuleId.ShufflePlayer1Deck, activePlayer))
      return moves
    }
    return []
  }
}
