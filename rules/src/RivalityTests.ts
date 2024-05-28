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

enum TileControl {
  ControlledByOpponent=1,
  ControlledByPlayer=2,
  FiveOpponentGolems=3
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
      case 25:
        this.setupMaterial25(setup)
        break
      case 26:
        this.setupMaterial26(setup)
        break
      case 27:
        this.setupMaterial27(setup)
        break
      case 28:
        this.setupMaterial28(setup)
        break
      case 29:
        this.setupMaterial29(setup)
        break
      case 30:
        this.setupMaterial30(setup)
        break
      case 31:
        this.setupMaterial31(setup)
        break
      case 32:
        this.setupMaterial32(setup)
        break
      case 33:
        this.setupMaterial33(setup)
        break
      case 34:
        this.setupMaterial34(setup)
        break
      case 35:
        this.setupMaterial35(setup)
        break
      case 36:
        this.setupMaterial36(setup)
        break
      case 37:
        this.setupMaterial37(setup)
        break
      case 38:
        this.setupMaterial38(setup)
        break
      case 39:
        this.setupMaterial39(setup)
        break
      case 40:
        this.setupMaterial40(setup)
        break
      case 41:
        this.setupMaterial41(setup)
        break
      case 42:
        this.setupMaterial42(setup)
        break
      case 43:
        this.setupMaterial43(setup)
        break
      case 44:
        this.setupMaterial44(setup)
        break
      case 45:
        this.setupMaterial45(setup)
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
      case 25:
        this.start25(setup)
        break
      case 26:
        this.start26(setup)
        break
      case 27:
        this.start27(setup)
        break
      case 28:
        this.start28(setup)
        break
      case 29:
        this.start29(setup)
        break
      case 30:
        this.start30(setup)
        break
      case 31:
        this.start31(setup)
        break
      case 32:
        this.start32(setup)
        break
      case 33:
        this.start33(setup)
        break
      case 34:
        this.start34(setup)
        break
      case 35:
        this.start35(setup)
        break
      case 36:
        this.start36(setup)
        break
      case 37:
        this.start37(setup)
        break
      case 38:
        this.start38(setup)
        break
      case 39:
        this.start39(setup)
        break
      case 40:
        this.start40(setup)
        break
      case 41:
        this.start41(setup)
        break
      case 42:
        this.start42(setup)
        break
      case 43:
        this.start43(setup)
        break
      case 44:
        this.start44(setup)
        break
      case 45:
        this.start45(setup)
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
    - 1 golem vs 0 shield+5 golems
    - 2 golems vs 0 shield+5 golems
    - 3 golems vs 0 shield+5 golems
    - 4 golems vs 0 shield+5 golems
    - 1 golem vs 1 shield+5 golems
    - 2 golems vs 1 shield+5 golems
    - 3 golems vs 1 shield+5 golems
    - 4 golems vs 1 shield+5 golems
    - 1 golem vs 2 shields+5 golems
    - 2 golems vs 2 shields+5 golems
    - 3 golems vs 2 shields+5 golems
    - 4 golems vs 2 shields+5 golems
    - 4 golems vs wizard
    - 1 golem with broken shields vs 1 shield
    - 1 golem with broken shields vs 2 shields
    - 1 golem with broken shields vs 2 shields+5 golems
    - 2 golems with broken shields vs 1 shield
    - 2 golems with broken shields vs 2 shields
    - 2 golems with broken shields vs 2 shields+5 golems
    - 1 golem with broken shields vs wizard
    - 2 golems with broken shields vs wizard

    - Discard opponent golems if more than 5 golems - automated
    - Discard opponent golems if more than 5 golems - question about the golem to be removed
    - Discard player golems if more than 5 player's golems
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
    tileControl: TileControl
    ){
      let title=""+spellNbGolems+" golem"
      if (spellNbGolems>1)
        title+="s"
      title+=" vs "+nbShields+" shield"
      if (nbShields>1)
        title+="s"

      if (tileControl==TileControl.ControlledByOpponent){
        title+=" - tile controlled by opponent"
      } else if (tileControl==TileControl.ControlledByPlayer){
        title+=" - tile controlled by player"
      } else if (tileControl==TileControl.FiveOpponentGolems){
        title+=" - tile with 5 opponent golems"
      }

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
      if (tileControl==TileControl.ControlledByPlayer){
        nbGolems1=2
        nbGolems2=1
      } else if (tileControl==TileControl.ControlledByOpponent){
        nbGolems1=0
        nbGolems2=2
      } else if (tileControl==TileControl.FiveOpponentGolems){
        nbGolems1=0
        nbGolems2=5
      }

      const squares=[
        new Square( 1,  0, targetTile, Orientation.North, nbGolems1, nbGolems2, 0)
      ]

      this.prepareBoard_2players(setup, squares,
        firstHandTile,
        Tile.Fortress_22_13B_31,
        Tile.Fortress_23B_22_22,
        Tile.Fortress_31_22_13B,
        -1,  1,
        -1, -1
      )
  }

  // Test 5 - 1 golem vs 1 shield
  setupMaterial5(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 1, 1, 0, TileControl.ControlledByOpponent)
  }
  start5(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 6 - 2 golems vs 1 shield
  setupMaterial6(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 2, 1, 1, TileControl.ControlledByOpponent)
  }
  start6(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 7 - 3 golems vs 1 shield
  setupMaterial7(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 3, 1, 2, TileControl.ControlledByOpponent)
  }
  start7(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 8 - 4 golems vs 1 shield
  setupMaterial8(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 4, 1, 3, TileControl.ControlledByOpponent)
  }
  start8(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 9 - 1 golem vs 2 shields
  setupMaterial9(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 1, 2, 0, TileControl.ControlledByOpponent)
  }
  start9(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 10 - 2 golems vs 2 shields
  setupMaterial10(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 2, 2, 0, TileControl.ControlledByOpponent)
  }
  start10(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 11 - 3 golems vs 2 shields
  setupMaterial11(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 3, 2, 1, TileControl.ControlledByOpponent)
  }
  start11(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 12 - 4 golems vs 2 shields
  setupMaterial12(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 4, 2, 2, TileControl.ControlledByOpponent)
  }
  start12(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 13 - 1 golem vs 1 shield but controlled by player
  setupMaterial13(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 1, 1, 1, TileControl.ControlledByPlayer)
  }
  start13(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 14 - 2 golems vs 1 shield but controlled by player
  setupMaterial14(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 2, 1, 2, TileControl.ControlledByPlayer)
  }
  start14(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 15 - 3 golems vs 1 shield but controlled by player
  setupMaterial15(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 3, 1, 3, TileControl.ControlledByPlayer)
  }
  start15(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 16 - 4 golems vs 1 shield but controlled by player
  setupMaterial16(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 4, 1, 4, TileControl.ControlledByPlayer)
  }
  start16(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 17 - 1 golem vs 2 shields but controlled by player
  setupMaterial17(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 1, 2, 1, TileControl.ControlledByPlayer)
  }
  start17(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 18 - 2 golems vs 2 shields but controlled by player
  setupMaterial18(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 2, 2, 2, TileControl.ControlledByPlayer)
  }
  start18(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 19 - 3 golems vs 2 shields but controlled by player
  setupMaterial19(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 3, 2, 3, TileControl.ControlledByPlayer)
  }
  start19(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 20 - 4 golems vs 2 shields but controlled by player
  setupMaterial20(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 4, 2, 4, TileControl.ControlledByPlayer)
  }
  start20(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 21 - 1 golem vs 0 shield
  setupMaterial21(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 1, 0, 1, TileControl.ControlledByOpponent)
  }
  start21(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 22 - 2 golems vs 0 shield
  setupMaterial22(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 2, 0, 2, TileControl.ControlledByOpponent)
  }
  start22(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 23 - 3 golems vs 0 shield
  setupMaterial23(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 3, 0, 3, TileControl.ControlledByOpponent)
  }
  start23(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 24 - 4 golems vs 0 shield
  setupMaterial24(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 4, 0, 4, TileControl.ControlledByOpponent)
  }
  start24(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 25 - 1 golem vs 0 shield+5 golems
  setupMaterial25(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 1, 0, 0, TileControl.FiveOpponentGolems)
  }
  start25(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 26 - 2 golems vs 0 shield+5 golems
  setupMaterial26(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 2, 0, 1, TileControl.FiveOpponentGolems)
  }
  start26(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 27 - 3 golems vs 0 shield+5 golems
  setupMaterial27(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 3, 0, 2, TileControl.FiveOpponentGolems)
  }
  start27(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 28 - 4 golems vs 0 shield+5 golems
  setupMaterial28(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 4, 0, 3, TileControl.FiveOpponentGolems)
  }
  start28(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 29 - 1 golem vs 1 shield+5 golems
  setupMaterial29(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 1, 1, 0, TileControl.FiveOpponentGolems)
  }
  start29(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 30 - 2 golems vs 1 shield+5 golems
  setupMaterial30(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 2, 1, 0, TileControl.FiveOpponentGolems)
  }
  start30(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 31 - 3 golems vs 1 shield+5 golems
  setupMaterial31(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 3, 1, 1, TileControl.FiveOpponentGolems)
  }
  start31(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 32 - 4 golems vs 1 shield+5 golems
  setupMaterial32(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 4, 1, 2, TileControl.FiveOpponentGolems)
  }
  start32(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 33 - 1 golem vs 2 shields+5 golems
  setupMaterial33(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 1, 2, 0, TileControl.FiveOpponentGolems)
  }
  start33(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 34 - 2 golems vs 2 shields+5 golems
  setupMaterial34(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 2, 2, 0, TileControl.FiveOpponentGolems)
  }
  start34(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 35 - 3 golems vs 2 shields+5 golems
  setupMaterial35(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 3, 2, 0, TileControl.FiveOpponentGolems)
  }
  start35(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 36 - 4 golems vs 2 shields+5 golems
  setupMaterial36(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 4, 2, 1, TileControl.FiveOpponentGolems)
  }
  start36(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 37 - 4 golems vs wizard
  setupMaterial37(setup: RivalitySetup) {
    this.texts(
      "4 golems vs wizard",
      "Move the first tile below the tile at the right of the Well of Mana",
      "No extra golem"
    )

    const squares=[
      new Square( 1,  0, Tile.StoneCircle_22_22, Orientation.North, 0, 1, 0)
    ]

    this.prepareBoard_2players(setup, squares,
      Tile.StoneCircle_x_41,
      Tile.Fortress_22_13B_31,
      Tile.Fortress_23B_22_22,
      Tile.Fortress_31_22_13B,
      -1,  1,
       1,  0
    )
  }
  start37(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  setupMaterialGolemsWithBrokenShieldsVsShields(
    setup: RivalitySetup,
    spellNbGolems: number,
    nbShields: number,
    expectedNbGolems: number,
    nbOpponentGolems: number,
    withWizard: boolean
    ){
      let title=""+spellNbGolems+" golem"
      if (spellNbGolems>1)
        title+="s"
      title+=" with broken shields vs "+nbShields+" shield"
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
        "Move the first tile below the tile at the bottom of the board",
        expected
      )

      let targetTile=Tile.StoneCircle_22_22
      if (nbShields==1){
        targetTile=Tile.Cottage_23B_32_x
      } else if (nbShields==2){
        targetTile=Tile.Fortress_22_22_23B
      }

      let firstHandTile=Tile.Fortress_22_13B_31
      if (spellNbGolems==2){
        firstHandTile=Tile.Cottage_22_23B_11
      }

      const squares=[
        new Square( 1,  0, targetTile, Orientation.North, 0, nbOpponentGolems, 0),
        new Square( 1,  1, Tile.StoneCircle_x_41, Orientation.North, 1, 0, 0),
        new Square( 1,  2, Tile.StoneCircle_31_11, Orientation.North, 0, 1, 0),
      ]

      let wizard2X=-1
      let wizard2Y=-1
      if (withWizard){
        wizard2X=1
        wizard2Y=0
      }

      this.prepareBoard_2players(setup, squares,
        firstHandTile,
        Tile.Cottage_32_23B_x,
        Tile.Cottage_23B_31_x,
        Tile.Cottage_11_23B_22,
        -1,  1,
        wizard2X, wizard2Y
      )
  }

  // Test 38 - 1 golem with broken shields vs 1 shield
  setupMaterial38(setup: RivalitySetup) {
    this.setupMaterialGolemsWithBrokenShieldsVsShields(setup, 1, 1, 1, 1, false)
  }
  start38(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 39 - 1 golem with broken shields vs 2 shields
  setupMaterial39(setup: RivalitySetup) {
    this.setupMaterialGolemsWithBrokenShieldsVsShields(setup, 1, 2, 1, 1, false)
  }
  start39(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 40 - 1 golem with broken shields vs 2 shields+5 golems
  setupMaterial40(setup: RivalitySetup) {
    this.setupMaterialGolemsWithBrokenShieldsVsShields(setup, 1, 2, 1, 5, false)
  }
  start40(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 41 - 2 golems with broken shields vs 1 shield
  setupMaterial41(setup: RivalitySetup) {
    this.setupMaterialGolemsWithBrokenShieldsVsShields(setup, 2, 1, 2, 1, false)
  }
  start41(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 42 - 2 golems with broken shields vs 2 shields
  setupMaterial42(setup: RivalitySetup) {
    this.setupMaterialGolemsWithBrokenShieldsVsShields(setup, 2, 2, 2, 1, false)
  }
  start42(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 43 - 2 golems with broken shields vs 2 shields+5 golems
  setupMaterial43(setup: RivalitySetup) {
    this.setupMaterialGolemsWithBrokenShieldsVsShields(setup, 2, 2, 2, 5, false)
  }
  start43(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 44 - 1 golem with broken shields vs wizard+2 shields+5 golems
  setupMaterial44(setup: RivalitySetup) {
    this.setupMaterialGolemsWithBrokenShieldsVsShields(setup, 1, 2, 0, 5, true)
  }
  start44(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 45 - 2 golems with broken shields vs wizard+2 shields+5 golems
  setupMaterial45(setup: RivalitySetup) {
    this.setupMaterialGolemsWithBrokenShieldsVsShields(setup, 2, 2, 0, 5, true)
  }
  start45(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }
}

export const tests = new RivalityTests()
