import { RivalitySetup } from './RivalitySetup'
import { BoardSpace } from './material/BoardSpace'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Orientation } from './Orientation'
import { RuleId } from './rules/RuleId'
import { Tile } from './material/Tile'
import { Wizard } from './material/Wizard'

class Square {
  x:number
  y:number
  tile:Tile
  orientation:Orientation
  nbGolems1:number
  nbGolems2:number
  nbGolems3:number

  constructor(
    x:number,
    y:number,
    tile:Tile,
    orientation:Orientation,
    nbGolems1:number,
    nbGolems2:number,
    nbGolems3:number
  ){
    this.x=x
    this.y=y
    this.tile=tile
    this.orientation=orientation
    this.nbGolems1=nbGolems1
    this.nbGolems2=nbGolems2
    this.nbGolems3=nbGolems3
  }
}

/**
 * To test specific positions
 *
 * game.new({'test':1})
 */
export class RivalityTests {
  setupMaterial(setup: RivalitySetup, testId:number, nbPlayers:number) {
    console.log("Test "+testId)

    // All tests require 2 players
    let expectedNbPlayers=2

    // Except those tests that require 3 players
/*
    if (testId==3){
      expectedNbPlayers=3
    }
*/

    if (nbPlayers!==expectedNbPlayers){
      console.log("Wrong nb of players for this test")
      console.log("Please retry with:")
      console.log("game.new({'test':"+testId+", 'players':"+expectedNbPlayers+"})")
      return
    }

    switch (testId){
      case 1:
        this.setupMaterial1(setup)
        break
      case 2:
        this.setupMaterial2(setup)
        break
      case 3:
        this.setupMaterial3(setup)
        break
      case 4:
        this.setupMaterial4(setup)
        break

      default:
        console.log("*** Unknown test")
    }
  }

  start(setup: RivalitySetup, testId:number) {
    switch (testId){
      case 1:
        this.start1(setup)
        break
      case 2:
        this.start2(setup)
        break
      case 3:
        this.start3(setup)
        break
      case 4:
        this.start4(setup)
        break

      default:
        console.log("*** Unknown test")
    }
  }

  texts(purpose:string, todo:string, expected:string){
    console.log("Purpose:  "+purpose)
    console.log("TO DO:    "+todo)
    console.log("Expected: "+expected)
  }

  getTile(setup: RivalitySetup, tile:Tile){
    // Note: Few tiles are available in 2 specimens
    return setup
      .material(MaterialType.Tile)
      .filter(item => item.id===tile)
      .limit(1)
  }

  getWizard(setup: RivalitySetup, wizard:Wizard){
    // Note: Few tiles are available in 2 specimens
    return setup
      .material(MaterialType.Wizard)
      .filter(item => item.id===wizard)
  }

  prepareBoard_2players(
    setup:RivalitySetup,
    squares:Square[],
    player1Tile1:Tile|undefined,
    player1Tile2:Tile|undefined,
    player2Tile1:Tile|undefined,
    player2Tile2:Tile|undefined,
    wizard1X:number|undefined,
    wizard1Y:number|undefined,
    wizard2X:number|undefined,
    wizard2Y:number|undefined,
  ){
    return this.prepareBoard_inner(
      setup,
      2,
      squares,
      player1Tile1, player1Tile2,
      player2Tile1, player2Tile2,
      undefined, undefined,
      wizard1X, wizard1Y,
      wizard2X, wizard2Y,
      undefined, undefined
    )
  }

  prepareBoard_inner(
      setup:RivalitySetup,
      nbPlayers:number,
      squares:Square[],
      player1Tile1:Tile|undefined,
      player1Tile2:Tile|undefined,
      player2Tile1:Tile|undefined,
      player2Tile2:Tile|undefined,
      player3Tile1:Tile|undefined,
      player3Tile2:Tile|undefined,
      wizard1X:number|undefined,
      wizard1Y:number|undefined,
      wizard2X:number|undefined,
      wizard2Y:number|undefined,
      wizard3X:number|undefined,
      wizard3Y:number|undefined
    ){
    const golem1Stack=setup.material(MaterialType.Golem).location(LocationType.PlayerGolemStack).player(1).deck()
    const golem2Stack=setup.material(MaterialType.Golem).location(LocationType.PlayerGolemStack).player(2).deck()
    const golem3Stack=setup.material(MaterialType.Golem).location(LocationType.PlayerGolemStack).player(3).deck()

    // Place tiles & golems
    for (let i=0; i<squares.length; i++){
      const square=squares[i]
      this.getTile(setup, square.tile)
        .moveItems({
          type: LocationType.Board,
          id: BoardSpace.Tile,
          x: square.x,
          y: square.y,
          rotation: square.orientation
        })
      if (square.nbGolems1>0){
        golem1Stack.deal({
          type: LocationType.Board,
          id: BoardSpace.Golem,
          x: square.x,
          y: square.y,
        }, square.nbGolems1)
      }
      if (square.nbGolems2>0){
        golem2Stack.deal({
          type: LocationType.Board,
          id: BoardSpace.Golem,
          x: square.x,
          y: square.y,
        }, square.nbGolems2)
      }
      if (square.nbGolems3>0){
        golem3Stack.deal({
          type: LocationType.Board,
          id: BoardSpace.Golem,
          x: square.x,
          y: square.y,
        }, square.nbGolems3)
      }
    }

    // Players' hands
    if (player1Tile1!==undefined){
      this.getTile(setup, player1Tile1)
        .moveItems({
          type:LocationType.PlayerHand,
          player:1,
          x:2,
          rotation: Orientation.North
        })
    }
    if (player1Tile2!==undefined){
      this.getTile(setup, player1Tile2)
        .moveItems({
          type:LocationType.PlayerHand,
          player:1,
          x:1,
          rotation: Orientation.North
        })
    }
    if (player2Tile1!==undefined){
      this.getTile(setup, player2Tile1)
        .moveItems({
          type:LocationType.PlayerHand,
          player:2,
          x:2,
          rotation: Orientation.North
        })
    }
    if (player2Tile2!==undefined){
      this.getTile(setup, player2Tile2)
        .moveItems({
          type:LocationType.PlayerHand,
          player:2,
          x:1,
          rotation: Orientation.North
        })
    }
    if (player3Tile1!==undefined){
      this.getTile(setup, player3Tile1)
        .moveItems({
          type:LocationType.PlayerHand,
          player:3,
          x:2,
          rotation: Orientation.North
        })
    }
    if (player3Tile2!==undefined){
      this.getTile(setup, player3Tile2)
        .moveItems({
          type:LocationType.PlayerHand,
          player:3,
          x:1,
          rotation: Orientation.North
        })
    }
    if (wizard1X!==undefined && wizard1Y!==undefined){
      this.getWizard(setup, Wizard.Wizard1)
        .moveItems({
          type: LocationType.Board,
          id: BoardSpace.Wizard,
          x: wizard1X,
          y: wizard1Y
        })
    }
    if (wizard2X!==undefined && wizard2Y!==undefined){
      this.getWizard(setup, Wizard.Wizard2)
        .moveItems({
          type: LocationType.Board,
          id: BoardSpace.Wizard,
          x: wizard2X,
          y: wizard2Y
        })
    }
    if (wizard3X!==undefined && wizard3Y!==undefined){
      this.getWizard(setup, Wizard.Wizard3)
        .moveItems({
          type: LocationType.Board,
          id: BoardSpace.Wizard,
          x: wizard3X,
          y: wizard3Y
        })
    }

    // Balance remaining tiles in player decks

    // 1. Move all tiles to player 1's deck
    for (let p=2; p<=3; p++){
      setup.material(MaterialType.Tile).location(LocationType.PlayerDeck).player(p)
        .moveItems({
          type: LocationType.PlayerDeck,
          player: 1
        })
    }

    const tileDeck=setup.material(MaterialType.Tile).location(LocationType.PlayerDeck).deck()
    const nbTilesInDeck=tileDeck.length

    // 2. Move tiles from player 1's deck to other players' decks
    if (nbPlayers===2){
      // 2 players
      const nbTilesForPlayer2=Math.ceil(nbTilesInDeck/2)
      tileDeck.deal({
        type: LocationType.PlayerDeck,
        player: 2
      }, nbTilesForPlayer2)
    } else if (nbPlayers==3){
      // 3 players
      let nbTilesForPlayer1=Math.floor(nbTilesInDeck/3)
      let nbTilesForPlayer2=nbTilesForPlayer1
      let nbTilesForPlayer3=nbTilesForPlayer1
      if (nbTilesForPlayer1+nbTilesForPlayer2+nbTilesForPlayer3 < nbTilesInDeck)
        nbTilesForPlayer3++
      if (nbTilesForPlayer1+nbTilesForPlayer2+nbTilesForPlayer3 < nbTilesInDeck)
        nbTilesForPlayer2++

      console.log(nbTilesForPlayer1)
      console.log(nbTilesForPlayer2)
      console.log(nbTilesForPlayer3)

      tileDeck.deal({
        type: LocationType.PlayerDeck,
        player: 2
      }, nbTilesForPlayer2)
      tileDeck.deal({
        type: LocationType.PlayerDeck,
        player: 3
      }, nbTilesForPlayer3)
    } else {
      console.log("*** ERROR - Unsupported nb of players")
    }
  }

  /*
    Tests
    - Simple spell on first tile
      check:
        1 golem + 1 wizard on active tile
        x golems on Well of Mana
    - Simple spell on first tile with rotation
      check:
        1 golem + 1 wizard on active tile
        x golems on Well of Mana
    - Two active spells
    - Three active spells
    - 1 golem vs 1 shield
    - 2 golems vs 1 shield
    - 3 golems vs 1 shield
    - 4 golems vs 1 shield
    - 1 golem vs 2 shields
    - 2 golems vs 2 shields
    - 3 golems vs 2 shields
    - 4 golems vs 2 shields
    - 1 golem vs 1 shield but controlled by player
    - 2 golems vs 1 shield but controlled by player
    - 3 golems vs 1 shield but controlled by player
    - 4 golems vs 1 shield but controlled by player
    - 1 golem vs 2 shields but controlled by player
    - 2 golems vs 2 shields but controlled by player
    - 3 golems vs 2 shields but controlled by player
    - 4 golems vs 2 shields but controlled by player
    - 4 golems vs wizard
    - golems with broken shields vs 1 shield
    - golems with broken shields vs 2 shields
    - golems with broken shields vs wizard
    - Discard opponent golems if more than 5 golems - automated
    - Discard opponent golems if more than 5 golems - question about the golem to be removed
    - Discard player golems if more than 5 player's golems
    - 1 golem vs 1 shield+5 golems
    - 2 golems vs 1 shield+5 golems
    - 3 golems vs 1 shield+5 golems
    - 4 golems vs 1 shield+5 golems
    - 1 golem vs 2 shields+5 golems
    - 2 golems vs 2 shields+5 golems
    - 3 golems vs 2 shields+5 golems
    - 4 golems vs 2 shields+5 golems
    - game over - all tiles are played
    - game over - all first player's golems are placed
    - game over - all second player's golems are placed
    - game over - all third player's golems are placed
    - mulligan
  */

  // Test 1 - Simple spell on first tile
  setupMaterial1(setup: RivalitySetup) {
    this.texts(
      "Basic spell",
      "Move the first tile to the left of the Well of Mana",
      "1 golem + 1 wizard on active tile. 3 golems on Well of Mana."
    )

    this.prepareBoard_2players(setup, [],
      Tile.Fortress_22_13B_31,
      Tile.StoneCircle_31_12,
      Tile.StoneCircle_11_31,
      Tile.StoneCircle_22_22,
      undefined, undefined,
      undefined, undefined
    )
  }
  start1(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 2 - Simple spell with rotation
  setupMaterial2(setup: RivalitySetup) {
    this.texts(
      "Basic spell with rotation",
      "Turn tiles right then move the second tile to the bottom of the Well of Mana",
      "1 golem + 1 wizard on active tile. 3 golems on Well of Mana."
    )

    this.prepareBoard_2players(setup, [],
      Tile.Fortress_22_13B_31,
      Tile.StoneCircle_31_12,
      Tile.StoneCircle_11_31,
      Tile.StoneCircle_22_22,
      undefined, undefined,
      undefined, undefined
    )
  }
  start2(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 3 - Two active spells
  setupMaterial3(setup: RivalitySetup) {
    this.texts(
      "Two active spells",
      "Turn tiles left then move the first tile to the top right corner of the Well of Mana",
      "1 golem + 1 wizard on active tile. 2 golems on top left tile. 3 golems on bottom right tile."
    )

    const squares=[
      new Square(-2, -1, Tile.StoneCircle_x_41, Orientation.North, 1, 0, 0),
      new Square(-1, -1, Tile.StoneCircle_31_11, Orientation.North, 1, 0, 0),
      new Square( 0, -1, Tile.StoneCircle_11_31, Orientation.North, 0, 1, 0),

      new Square( 0,  0, Tile.WellOfMana, Orientation.North, 1, 3, 0),
      new Square( 1,  0, Tile.StoneCircle_31_12, Orientation.North, 1, 0, 0),

      new Square( 0,  1, Tile.StoneCircle_12_31, Orientation.North, 0, 1, 0),
      new Square( 1,  1, Tile.StoneCircle_11_32, Orientation.North, 1, 0, 0)
    ]

    this.prepareBoard_2players(setup, squares,
      Tile.Fortress_22_13B_31,
      Tile.Cottage_23B_32_x,
      Tile.Cottage_23B_31_x,
      Tile.StoneCircle_32_11,
      -2, -1,
       0,  1
    )
  }
  start3(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 4 - Three active spells
  setupMaterial4(setup: RivalitySetup) {
    this.texts(
      "Three active spells",
      "Turn tiles left then move the first tile to the top right corner of the Well of Mana",
      "1 golem + 1 wizard on active tile. 2 golems on top left tile. 3 golems on bottom right tile. 3+1 golems on top right tile."
    )

    const squares=[
      new Square( 0, -2, Tile.StoneCircle_32_11, Orientation.North, 1, 0, 0),
      new Square( 1, -2, Tile.StoneCircle_22_22, Orientation.North, 0, 1, 0),

      new Square(-2, -1, Tile.StoneCircle_x_41, Orientation.North, 1, 0, 0),
      new Square(-1, -1, Tile.StoneCircle_31_11, Orientation.North, 1, 0, 0),
      new Square( 0, -1, Tile.StoneCircle_11_31, Orientation.North, 0, 1, 0),

      new Square( 0,  0, Tile.WellOfMana, Orientation.North, 1, 3, 0),
      new Square( 1,  0, Tile.StoneCircle_31_12, Orientation.North, 1, 0, 0),

      new Square( 0,  1, Tile.StoneCircle_12_31, Orientation.North, 0, 1, 0),
      new Square( 1,  1, Tile.StoneCircle_11_32, Orientation.North, 1, 0, 0)
    ]

    this.prepareBoard_2players(setup, squares,
      Tile.Fortress_22_13B_31,
      Tile.Cottage_23B_32_x,
      Tile.Cottage_23B_31_x,
      Tile.Cottage_31_23B_x,
      -2, -1,
       0,  1
    )
  }
  start4(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }
}

export const tests = new RivalityTests()
