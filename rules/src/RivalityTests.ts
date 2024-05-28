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
      case 5:
        this.setupMaterial5(setup)
        break
      case 6:
        this.setupMaterial6(setup)
        break
      case 7:
        this.setupMaterial7(setup)
        break
      case 8:
        this.setupMaterial8(setup)
        break
      case 9:
        this.setupMaterial9(setup)
        break
      case 10:
        this.setupMaterial10(setup)
        break
      case 11:
        this.setupMaterial11(setup)
        break
      case 12:
        this.setupMaterial12(setup)
        break
      case 13:
        this.setupMaterial13(setup)
        break
      case 14:
        this.setupMaterial14(setup)
        break
      case 15:
        this.setupMaterial15(setup)
        break
      case 16:
        this.setupMaterial16(setup)
        break
      case 17:
        this.setupMaterial17(setup)
        break
      case 18:
        this.setupMaterial18(setup)
        break
      case 19:
        this.setupMaterial19(setup)
        break
      case 20:
        this.setupMaterial20(setup)
        break
      case 21:
        this.setupMaterial21(setup)
        break
      case 22:
        this.setupMaterial22(setup)
        break
      case 23:
        this.setupMaterial23(setup)
        break
      case 24:
        this.setupMaterial24(setup)
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
      case 5:
        this.start5(setup)
        break
      case 6:
        this.start6(setup)
        break
      case 7:
        this.start7(setup)
        break
      case 8:
        this.start8(setup)
        break
      case 9:
        this.start9(setup)
        break
      case 10:
        this.start10(setup)
        break
      case 11:
        this.start11(setup)
        break
      case 12:
        this.start12(setup)
        break
      case 13:
        this.start13(setup)
        break
      case 14:
        this.start14(setup)
        break
      case 15:
        this.start15(setup)
        break
      case 16:
        this.start16(setup)
        break
      case 17:
        this.start17(setup)
        break
      case 18:
        this.start18(setup)
        break
      case 19:
        this.start19(setup)
        break
      case 20:
        this.start20(setup)
        break
      case 21:
        this.start21(setup)
        break
      case 22:
        this.start22(setup)
        break
      case 23:
        this.start23(setup)
        break
      case 24:
        this.start24(setup)
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
    - 1 golem vs 0 shield
    - 2 golems vs 0 shield
    - 3 golems vs 0 shield
    - 4 golems vs 0 shield
    
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

  setupMaterialGolemsVsShields(
    setup: RivalitySetup,
    spellNbGolems: number,
    nbShields: number,
    expectedNbGolems: number,
    tileControlledByPlayer: boolean
    ){
      let title=""+spellNbGolems+" golem"
      if (spellNbGolems>1)
        title+="s"
      title+=" vs "+nbShields+" shield"
      if (nbShields>1)
        title+="s"

      let expected=""
      if (expectedNbGolems>0){
        expected=expectedNbGolems+" extra golem"
        if (expectedNbGolems>1)
          expected+="s"
        expected+=" (5 golems max)"
      } else {
        expected="No extra golem"
      }

      this.texts(
        title,
        "Move the first tile below the tile at the right of the Well of Mana",
        expected
      )

      let targetTile=Tile.StoneCircle_22_22
      if (nbShields==1){
        targetTile=Tile.Cottage_23B_32_x
      } else if (nbShields==2){
        targetTile=Tile.Fortress_22_22_23B
      }

      let firstHandTile=Tile.StoneCircle_x_41
      if (spellNbGolems==1){
        firstHandTile=Tile.StoneCircle_31_11
      } else if (spellNbGolems==2){
        firstHandTile=Tile.Cottage_12_21_23B
      } else if (spellNbGolems==3){
        firstHandTile=Tile.StoneCircle_11_31
      } else if (spellNbGolems==4){
        firstHandTile=Tile.StoneCircle_x_41
      }

      let nbGolems1=0
      let nbGolems2=0
      if (tileControlledByPlayer){
        nbGolems1=2
        nbGolems2=1
      } else {
        nbGolems1=0
        nbGolems2=2
      }

      const squares=[
        new Square( 1,  0, targetTile, Orientation.North, nbGolems1, nbGolems2, 0)
      ]

      this.prepareBoard_2players(setup, squares,
        firstHandTile,
        Tile.Fortress_22_13B_31,
        Tile.Fortress_23B_22_22,
        Tile.Fortress_31_22_13B,
        -1, -1,
        -1,  1
      )
  }

  // Test 5 - 1 golem vs 1 shield
  setupMaterial5(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 1, 1, 0, false)
  }
  start5(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 6 - 2 golems vs 1 shield
  setupMaterial6(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 2, 1, 1, false)
  }
  start6(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 7 - 3 golems vs 1 shield
  setupMaterial7(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 3, 1, 2, false)
  }
  start7(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 8 - 4 golems vs 1 shield
  setupMaterial8(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 4, 1, 3, false)
  }
  start8(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 9 - 1 golem vs 2 shields
  setupMaterial9(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 1, 2, 0, false)
  }
  start9(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 10 - 2 golems vs 2 shields
  setupMaterial10(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 2, 2, 0, false)
  }
  start10(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 11 - 3 golems vs 2 shields
  setupMaterial11(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 3, 2, 1, false)
  }
  start11(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 12 - 4 golems vs 2 shields
  setupMaterial12(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 4, 2, 2, false)
  }
  start12(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 13 - 1 golem vs 1 shield but controlled by player
  setupMaterial13(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 1, 1, 1, true)
  }
  start13(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 14 - 2 golems vs 1 shield but controlled by player
  setupMaterial14(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 2, 1, 2, true)
  }
  start14(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 15 - 3 golems vs 1 shield but controlled by player
  setupMaterial15(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 3, 1, 3, true)
  }
  start15(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 16 - 4 golems vs 1 shield but controlled by player
  setupMaterial16(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 4, 1, 4, true)
  }
  start16(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 17 - 1 golem vs 2 shields but controlled by player
  setupMaterial17(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 1, 2, 1, true)
  }
  start17(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 18 - 2 golems vs 2 shields but controlled by player
  setupMaterial18(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 2, 2, 2, true)
  }
  start18(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 19 - 3 golems vs 2 shields but controlled by player
  setupMaterial19(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 3, 2, 3, true)
  }
  start19(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 20 - 4 golems vs 2 shields but controlled by player
  setupMaterial20(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 4, 2, 4, true)
  }
  start20(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 21 - 1 golem vs 0 shield
  setupMaterial21(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 1, 0, 1, false)
  }
  start21(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 22 - 2 golems vs 0 shield
  setupMaterial22(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 2, 0, 2, false)
  }
  start22(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 23 - 3 golems vs 0 shield
  setupMaterial23(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 3, 0, 3, false)
  }
  start23(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 24 - 4 golems vs 0 shield
  setupMaterial24(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 4, 0, 4, false)
  }
  start24(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }
}

export const tests = new RivalityTests()
