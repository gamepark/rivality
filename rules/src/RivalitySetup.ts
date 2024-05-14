import { MaterialGameSetup } from '@gamepark/rules-api'
import { RivalityOptions } from './RivalityOptions'
import { RivalityRules } from './RivalityRules'
import { BoardSpace } from './material/BoardSpace'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { tiles, Tile } from './material/Tile'
import { golems, Golem } from './material/Golem'
import { wizards, Wizard } from './material/Wizard'
import { tileTools } from './logic/TileTools'
import { Orientation } from './Orientation'
import { PlayerId } from './PlayerId'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class RivalitySetup extends MaterialGameSetup<PlayerId, MaterialType, LocationType, RivalityOptions> {
  Rules = RivalityRules

  setupMaterial(options: RivalityOptions) {
    this.setupTiles(options)
    this.setupGolems(options)
    this.setupWizards(options)
    this.setupPlayers(options)
  }

  setupTiles(options: RivalityOptions) {
    const newTiles = []

    newTiles.push(...tiles
      .filter(tile => tile==Tile.WellOfMana)
      .map((tile) => ({
        id: tile,
        location: {
          type: LocationType.Board,
          id: BoardSpace.Tile,
          x: 0,
          y: 0,
          rotation: Orientation.North
        }
      })))

    if (options.players==2){
      for (let player=1; player<=2; player++){
        newTiles.push(...tiles
          .filter(tile => tileTools.tileDeck(tile)==player)
          .map((tile) => ({
            id: tile,
            location: {
              type: LocationType.PlayerDeck,
              player: player,
              rotation: false
            }
          })))
      }

      this.material(MaterialType.Tile).createItems(newTiles)

      // Shuffle and ensure that the last card for each player is NOT a fortress
      for (let player=1; player<=2; player++){
        let lastPlayerCardIsAFortress=true
        do {
          this.material(MaterialType.Tile).player(player).shuffle()
          let cards=this.material(MaterialType.Tile).player(player).getItems()
          lastPlayerCardIsAFortress=tileTools.isFortress(cards[cards.length-1].id)
        } while (lastPlayerCardIsAFortress)
      }
    } else {
      console.log("*** ERROR - Unsupported nb of players")
    }
  }

  setupGolems(options: RivalityOptions) {
    const newGolems = []

    let nbGolemsPlayer1=0
    let nbGolemsPlayer2=0
    let nbGolemsPlayer3=0

    if (options.players==2){
      nbGolemsPlayer1=30
      nbGolemsPlayer2=30
      nbGolemsPlayer3=0
    }

    // Player 1
    for (let i=0; i<nbGolemsPlayer1; i++){
      newGolems.push(...golems
        .filter(golem => golem==Golem.Golem1)
        .map((golem) => ({
          id: golem,
          location: {
            type: LocationType.PlayerGolemStack,
            player: 1
          }
        })))
    }

    // Player 2
    for (let i=0; i<nbGolemsPlayer2; i++){
      newGolems.push(...golems
        .filter(golem => golem==Golem.Golem2)
        .map((golem) => ({
          id: golem,
          location: {
            type: LocationType.PlayerGolemStack,
            player: 2
          }
        })))
    }

      // Player 3
    for (let i=0; i<nbGolemsPlayer3; i++){
      newGolems.push(...golems
        .filter(golem => golem==Golem.Golem3)
        .map((golem) => ({
          id: golem,
          location: {
            type: LocationType.PlayerGolemStack,
            player: 3
          }
        })))
    }

    this.material(MaterialType.Golem).createItems(newGolems)
  }

  setupWizards(options: RivalityOptions) {
    const newWizards = []

    if (options.players==2){
      // Player 1
      newWizards.push(...wizards
        .filter(wizard => wizard==Wizard.Wizard1)
        .map((wizard) => ({
          id: wizard,
          location: {
            type: LocationType.Board,
            id: BoardSpace.Wizard,
            x: 0,
            y: 2
          }
        })))

      // Player 2
      newWizards.push(...wizards
        .filter(wizard => wizard==Wizard.Wizard2)
        .map((wizard) => ({
          id: wizard,
          location: {
            type: LocationType.Board,
            id: BoardSpace.Wizard,
            x: 0,
            y: -2
          }
        })))
    } else {
      console.log("*** ERROR - Unsupported nb of players")
    }

    this.material(MaterialType.Wizard).createItems(newWizards)
  }

  setupPlayers(options: RivalityOptions){
    let nbPlayers=options.players
    for (let player=1; player<=nbPlayers; player++){
      const deck = this.material(MaterialType.Tile).location(LocationType.PlayerDeck).player(player).deck()
      for (let i=1; i<=2; i++){
        deck.deal({
          type:LocationType.PlayerHand,
          player:player,
          x:i,
          rotation: Orientation.North
        }, 1)
      }
    }
  }

  start() {
    this.startPlayerTurn(RuleId.ChooseTile, this.game.players[0])
  }
}
