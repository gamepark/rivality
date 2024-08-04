import { MaterialGameSetup } from '@gamepark/rules-api'
import { tileTools } from './logic/TileTools'
import { BoardSpace } from './material/BoardSpace'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Tile, tiles } from './material/Tile'
import { Orientation } from './Orientation'
import { PlayerColor } from './PlayerColor'
import { RivalityOptions } from './RivalityOptions'
import { RivalityRules } from './RivalityRules'
import { Memory } from './rules/Memory'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class RivalitySetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, RivalityOptions> {
  Rules = RivalityRules

  setupMaterial(options: RivalityOptions) {
    // Global parameters
    this.memorize(Memory.RealTimeScore, options.realTimeScore ?? false)

    this.setupTiles()
    this.setupGolems()
    this.setupWizards()

    this.setupPlayerHands()
  }

  setupTiles() {
    const newTiles = []

    if (this.game.players.length === 2) {
      this.material(MaterialType.Tile).createItem({
        id: Tile.WellOfMana,
        location: {
          type: LocationType.Board,
          id: BoardSpace.Tile,
          x: 0,
          y: 0,
          rotation: Orientation.North
        }
      })

      // In 2 players mode, the deck are predefined
      this.material(MaterialType.Tile).createItems(tileTools.player1Deck.map(tile => ({
        id: tile,
        location: {
          type: LocationType.PlayerDeck,
          player: this.game.players[0]
        }
      })))
      this.material(MaterialType.Tile).createItems(tileTools.player2Deck.map(tile => ({
        id: tile,
        location: {
          type: LocationType.PlayerDeck,
          player: this.game.players[1]
        }
      })))

      // Shuffle and ensure that the last card for each player is NOT a fortress
      for (const player of this.game.players) {
        let lastPlayerCardIsAFortress = true
        do {
          this.material(MaterialType.Tile).player(player).shuffle()
          let cards = this.material(MaterialType.Tile).player(player).getItems()
          lastPlayerCardIsAFortress = tileTools.isFortress(cards[cards.length - 1].id)
        } while (lastPlayerCardIsAFortress)
      }
    } else if (this.game.players.length === 3) {
      // In 3 players mode, the fortress cards are fairly dispatched among players
      // 1. Create all tiles and shuffle them
      newTiles.push(...tiles
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

      this.material(MaterialType.Tile).createItems(newTiles)
      this.material(MaterialType.Tile).shuffle()

      // 2. Create a deck with all fortress tiles
      let fortressDeck = this
        .material(MaterialType.Tile)
        .filter(tile => tileTools.isFortress(tile.id))
        .deck()

      // 3. Dispatch 2 fortress tile to each player
      for (const player of this.game.players) {
        fortressDeck.deal({ type: LocationType.PlayerDeck, player: player }, 2)
      }

      // 4. Create a deck with all non-wellOfMana and non-fortress tiles
      let nonWellNonFortressDeck = this
        .material(MaterialType.Tile)
        .filter(tile => tile.id != Tile.WellOfMana && !tileTools.isFortress(tile.id))
        .deck()

      // 5. Dispatch those tiles into 3 decks - 1 per player
      const nbTiles = nonWellNonFortressDeck.length
      for (let player = 1; player <= 3; player++) {
        nonWellNonFortressDeck.deal({ type: LocationType.PlayerDeck, player: player }, nbTiles / 3)
      }

      // 6. Shuffle each player's deck until their last card is not a fortress
      for (const player of this.game.players) {
        let lastPlayerCardIsAFortress = true
        do {
          this.material(MaterialType.Tile).player(player).shuffle()
          let cards = this.material(MaterialType.Tile).player(player).getItems()
          lastPlayerCardIsAFortress = tileTools.isFortress(cards[cards.length - 1].id)
        } while (lastPlayerCardIsAFortress)
      }
    } else {
      console.log('*** ERROR - Unsupported nb of players')
    }
  }

  setupGolems() {
    const golems = this.game.players.length === 2 ? 30 : 20
    for (const player of this.game.players) {
      for (let i = 0; i < golems; i++) {
        this.material(MaterialType.Golem).createItem({
          id: player,
          location: {
            type: LocationType.PlayerGolemStack,
            player: player
          }
        })
      }
    }
  }

  setupWizards() {
    const nbPlayers = this.game.players.length
    for (let i = 0; i < nbPlayers; i++){
      const player = this.game.players[i]
      this.material(MaterialType.Wizard).createItem({
        id: player,
        location: {
          type: LocationType.PlayerWizardStart,
          player: player
        }
      })
    }
  }

  setupPlayerHands() {
    for (const player of this.game.players) {
      const deck = this.material(MaterialType.Tile).location(LocationType.PlayerDeck).player(player).deck()
      deck.deal({
        type: LocationType.PlayerHand,
        player: player,
        rotation: Orientation.North
      }, 2)
    }
  }

  start(_options: RivalityOptions) {
    this.startPlayerTurn(RuleId.Start, this.game.players[0])
  }
}
