import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { Orientation } from '@gamepark/rivality/Orientation'
import { RivalitySetup } from '@gamepark/rivality/RivalitySetup'
import { RuleId } from '@gamepark/rivality/rules/RuleId'
import { Tile } from '@gamepark/rivality/material/Tile'

const me = 1
const opponent = 2
export class TutorialSetup extends RivalitySetup {
  start() {
    // Move back player's hands into their deck
    this.material(MaterialType.Tile).location(LocationType.PlayerHand).player(me).moveItems({
      type: LocationType.PlayerDeck,
      player: me
    })
    this.material(MaterialType.Tile).location(LocationType.PlayerHand).player(opponent).moveItems({
      type: LocationType.PlayerDeck,
      player: opponent
    })

    // My hand
    this.material(MaterialType.Tile).location(LocationType.PlayerDeck).player(me)
      .filter(item => item.id===Tile.StoneCircle_32_11)
      .moveItems({
        type:LocationType.PlayerHand,
        player:me,
        x:2,
        rotation: Orientation.North
      })
    this.material(MaterialType.Tile).location(LocationType.PlayerDeck).player(me)
      .filter(item => item.id===Tile.StoneCircle_22_21)
      .moveItems({
        type:LocationType.PlayerHand,
        player:me,
        x:1,
        rotation: Orientation.North
      })

    // Opponent's hand
    this.material(MaterialType.Tile).location(LocationType.PlayerDeck).player(opponent)
      .filter(item => item.id===Tile.Cottage_12_21_23B)
      .moveItems({
        type:LocationType.PlayerHand,
        player:opponent,
        x:1,
        rotation: Orientation.North
      })
    this.material(MaterialType.Tile).location(LocationType.PlayerDeck).player(opponent)
      .filter(item => item.id===Tile.Cottage_22_23B_11)
      .moveItems({
        type:LocationType.PlayerHand,
        player:opponent,
        x:2,
        rotation: Orientation.North
      })

    // Check deck size
    console.log(this.material(MaterialType.Tile).location(LocationType.PlayerDeck).player(me).length)
    console.log(this.material(MaterialType.Tile).location(LocationType.PlayerDeck).player(opponent).length)

    // Put card on top of my deck
    this.material(MaterialType.Tile).location(LocationType.PlayerDeck).player(me)
      .filter(item => item.id===Tile.StoneCircle_31_12)
      .moveItems({
        type: LocationType.PlayerDeck,
        player: me
      })
    this.material(MaterialType.Tile).location(LocationType.PlayerDeck).player(me)
      .filter(item => item.id===Tile.Fortress_31_22_13B)
      .moveItems({
        type: LocationType.PlayerDeck,
        player: me
      })
    this.material(MaterialType.Tile).location(LocationType.PlayerDeck).player(me)
      .filter(item => item.id===Tile.Cottage_23B_31_x)
      .moveItems({
        type: LocationType.PlayerDeck,
        player: me
      })

    // Put card on top of the opponent's deck
    this.material(MaterialType.Tile).location(LocationType.PlayerDeck).player(opponent)
      .filter(item => item.id===Tile.StoneCircle_11_32)
      .moveItems({
        type: LocationType.PlayerDeck,
        player: opponent
      })
    this.material(MaterialType.Tile).location(LocationType.PlayerDeck).player(opponent)
      .filter(item => item.id===Tile.StoneCircle_x_41)
      .moveItems({
        type: LocationType.PlayerDeck,
        player: opponent
      })

//    this.material(MaterialType.KingdomCard).location(LocationType.KingdomDeck).deck().dealOne({ type: LocationType.KingdomDiscard, rotation:true })
    this.startPlayerTurn(RuleId.Start, this.game.players[0])
  }
}
