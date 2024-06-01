import { RivalitySetup } from './RivalitySetup'
import { BoardSpace } from './material/BoardSpace'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Orientation } from './Orientation'
import { RuleId } from './rules/RuleId'
import { Tile } from './material/Tile'
import { Wizard } from './material/Wizard'

/**
 * To test specific positions
 *
 * game.new({'test':1})
 */

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

export class RivalityTests {
  setupMaterial(setup: RivalitySetup, testId:number, nbPlayers:number) {
    console.log("Test "+testId)

    // All tests require 2 players
    let expectedNbPlayers=2

    // Except few tests that require 3 players
    if (
        (testId>=46 && testId<=78)
        || (testId>=81 && testId<=85)
      ){
      expectedNbPlayers=3
    }

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
      case 46:
        this.setupMaterial46(setup)
        break
      case 47:
        this.setupMaterial47(setup)
        break
      case 48:
        this.setupMaterial48(setup)
        break
      case 49:
        this.setupMaterial49(setup)
        break
      case 50:
        this.setupMaterial50(setup)
        break
      case 51:
        this.setupMaterial51(setup)
        break
      case 52:
        this.setupMaterial52(setup)
        break
      case 53:
        this.setupMaterial53(setup)
        break
      case 54:
        this.setupMaterial54(setup)
        break
      case 55:
        this.setupMaterial55(setup)
        break
      case 56:
        this.setupMaterial56(setup)
        break
      case 57:
        this.setupMaterial57(setup)
        break
      case 58:
        this.setupMaterial58(setup)
        break
      case 59:
        this.setupMaterial59(setup)
        break
      case 60:
        this.setupMaterial60(setup)
        break
      case 61:
        this.setupMaterial61(setup)
        break
      case 62:
        this.setupMaterial62(setup)
        break
      case 63:
        this.setupMaterial63(setup)
        break
      case 64:
        this.setupMaterial64(setup)
        break
      case 65:
        this.setupMaterial65(setup)
        break
      case 66:
        this.setupMaterial66(setup)
        break
      case 67:
        this.setupMaterial67(setup)
        break
      case 68:
        this.setupMaterial68(setup)
        break
      case 69:
        this.setupMaterial69(setup)
        break
      case 70:
        this.setupMaterial70(setup)
        break
      case 71:
        this.setupMaterial71(setup)
        break
      case 72:
        this.setupMaterial72(setup)
        break
      case 73:
        this.setupMaterial73(setup)
        break
      case 74:
        this.setupMaterial74(setup)
        break
      case 75:
        this.setupMaterial75(setup)
        break
      case 76:
        this.setupMaterial76(setup)
        break
      case 77:
        this.setupMaterial77(setup)
        break
      case 78:
        this.setupMaterial78(setup)
        break
      case 79:
        this.setupMaterial79(setup)
        break
      case 80:
        this.setupMaterial80(setup)
        break
      case 81:
        this.setupMaterial81(setup)
        break
      case 82:
        this.setupMaterial82(setup)
        break
      case 83:
        this.setupMaterial83(setup)
        break
      case 84:
        this.setupMaterial84(setup)
        break
      case 85:
        this.setupMaterial85(setup)
        break

      default:
        console.log("*** Unknown test")
    }
  }

  start(setup: RivalitySetup, testId:number) {
    switch (testId){
      case 76:
        this.start76(setup)
        break
      case 77:
        this.start77(setup)
        break
      case 78:
        this.start78(setup)
        break
      case 79:
        this.start79(setup)
        break
      case 80:
        this.start80(setup)
        break

      default:
        setup.startPlayerTurn(RuleId.ChooseTile, 1)
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
    wizard2Y:number|undefined
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

  prepareBoard_3players(
    setup:RivalitySetup,
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
    return this.prepareBoard_inner(
      setup,
      3,
      squares,
      player1Tile1, player1Tile2,
      player2Tile1, player2Tile2,
      player3Tile1, player3Tile2,
      wizard1X, wizard1Y,
      wizard2X, wizard2Y,
      wizard3X, wizard3Y
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

    // Move the Well of Mana to the center of the board
    setup
      .material(MaterialType.Tile)
      .filter(item => item.id==Tile.WellOfMana)
      .moveItems({
        type: LocationType.Board,
        id: BoardSpace.Tile,
        x: 0,
        y: 0
      })

    // Balance remaining tiles in player decks

    // 1. Move all tiles to player 1's deck
    for (let p=2; p<=3; p++){
      setup
        .material(MaterialType.Tile)
        .location(LocationType.PlayerDeck)
        .player(p)
        .moveItems({
          type: LocationType.PlayerDeck,
          player: 1
        })
    }

    const tileDeck=setup
      .material(MaterialType.Tile)
      .location(LocationType.PlayerDeck)
      .deck()
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
    - Discard opponent golems if more than 5 golems - automated (done through various other tests)
    - Discard opponent golems if more than 5 golems - question about the golem to be removed
    - Discard player golems if more than 5 player's golems
    - game over - all first player's golems are placed
    - game over - all second player's golems are placed
    - game over - all third player's golems are placed
    - game over - all tiles are played (easily tested with game.monkeyOpponents())

    - No shield for contested tile
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

  // Test 6 - 2 golems vs 1 shield
  setupMaterial6(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 2, 1, 1, TileControl.ControlledByOpponent)
  }

  // Test 7 - 3 golems vs 1 shield
  setupMaterial7(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 3, 1, 2, TileControl.ControlledByOpponent)
  }

  // Test 8 - 4 golems vs 1 shield
  setupMaterial8(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 4, 1, 3, TileControl.ControlledByOpponent)
  }

  // Test 9 - 1 golem vs 2 shields
  setupMaterial9(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 1, 2, 0, TileControl.ControlledByOpponent)
  }

  // Test 10 - 2 golems vs 2 shields
  setupMaterial10(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 2, 2, 0, TileControl.ControlledByOpponent)
  }

  // Test 11 - 3 golems vs 2 shields
  setupMaterial11(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 3, 2, 1, TileControl.ControlledByOpponent)
  }

  // Test 12 - 4 golems vs 2 shields
  setupMaterial12(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 4, 2, 2, TileControl.ControlledByOpponent)
  }

  // Test 13 - 1 golem vs 1 shield but controlled by player
  setupMaterial13(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 1, 1, 1, TileControl.ControlledByPlayer)
  }

  // Test 14 - 2 golems vs 1 shield but controlled by player
  setupMaterial14(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 2, 1, 2, TileControl.ControlledByPlayer)
  }

  // Test 15 - 3 golems vs 1 shield but controlled by player
  setupMaterial15(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 3, 1, 3, TileControl.ControlledByPlayer)
  }

  // Test 16 - 4 golems vs 1 shield but controlled by player
  setupMaterial16(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 4, 1, 4, TileControl.ControlledByPlayer)
  }

  // Test 17 - 1 golem vs 2 shields but controlled by player
  setupMaterial17(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 1, 2, 1, TileControl.ControlledByPlayer)
  }

  // Test 18 - 2 golems vs 2 shields but controlled by player
  setupMaterial18(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 2, 2, 2, TileControl.ControlledByPlayer)
  }

  // Test 19 - 3 golems vs 2 shields but controlled by player
  setupMaterial19(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 3, 2, 3, TileControl.ControlledByPlayer)
  }

  // Test 20 - 4 golems vs 2 shields but controlled by player
  setupMaterial20(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 4, 2, 4, TileControl.ControlledByPlayer)
  }

  // Test 21 - 1 golem vs 0 shield
  setupMaterial21(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 1, 0, 1, TileControl.ControlledByOpponent)
  }

  // Test 22 - 2 golems vs 0 shield
  setupMaterial22(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 2, 0, 2, TileControl.ControlledByOpponent)
  }

  // Test 23 - 3 golems vs 0 shield
  setupMaterial23(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 3, 0, 3, TileControl.ControlledByOpponent)
  }

  // Test 24 - 4 golems vs 0 shield
  setupMaterial24(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 4, 0, 4, TileControl.ControlledByOpponent)
  }

  // Test 25 - 1 golem vs 0 shield+5 golems
  setupMaterial25(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 1, 0, 0, TileControl.FiveOpponentGolems)
  }

  // Test 26 - 2 golems vs 0 shield+5 golems
  setupMaterial26(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 2, 0, 1, TileControl.FiveOpponentGolems)
  }

  // Test 27 - 3 golems vs 0 shield+5 golems
  setupMaterial27(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 3, 0, 2, TileControl.FiveOpponentGolems)
  }

  // Test 28 - 4 golems vs 0 shield+5 golems
  setupMaterial28(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 4, 0, 3, TileControl.FiveOpponentGolems)
  }

  // Test 29 - 1 golem vs 1 shield+5 golems
  setupMaterial29(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 1, 1, 0, TileControl.FiveOpponentGolems)
  }

  // Test 30 - 2 golems vs 1 shield+5 golems
  setupMaterial30(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 2, 1, 0, TileControl.FiveOpponentGolems)
  }

  // Test 31 - 3 golems vs 1 shield+5 golems
  setupMaterial31(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 3, 1, 1, TileControl.FiveOpponentGolems)
  }

  // Test 32 - 4 golems vs 1 shield+5 golems
  setupMaterial32(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 4, 1, 2, TileControl.FiveOpponentGolems)
  }

  // Test 33 - 1 golem vs 2 shields+5 golems
  setupMaterial33(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 1, 2, 0, TileControl.FiveOpponentGolems)
  }

  // Test 34 - 2 golems vs 2 shields+5 golems
  setupMaterial34(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 2, 2, 0, TileControl.FiveOpponentGolems)
  }

  // Test 35 - 3 golems vs 2 shields+5 golems
  setupMaterial35(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 3, 2, 0, TileControl.FiveOpponentGolems)
  }

  // Test 36 - 4 golems vs 2 shields+5 golems
  setupMaterial36(setup: RivalitySetup) {
    this.setupMaterialGolemsVsShields(setup, 4, 2, 1, TileControl.FiveOpponentGolems)
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

  // Test 39 - 1 golem with broken shields vs 2 shields
  setupMaterial39(setup: RivalitySetup) {
    this.setupMaterialGolemsWithBrokenShieldsVsShields(setup, 1, 2, 1, 1, false)
  }

  // Test 40 - 1 golem with broken shields vs 2 shields+5 golems
  setupMaterial40(setup: RivalitySetup) {
    this.setupMaterialGolemsWithBrokenShieldsVsShields(setup, 1, 2, 1, 5, false)
  }

  // Test 41 - 2 golems with broken shields vs 1 shield
  setupMaterial41(setup: RivalitySetup) {
    this.setupMaterialGolemsWithBrokenShieldsVsShields(setup, 2, 1, 2, 1, false)
  }

  // Test 42 - 2 golems with broken shields vs 2 shields
  setupMaterial42(setup: RivalitySetup) {
    this.setupMaterialGolemsWithBrokenShieldsVsShields(setup, 2, 2, 2, 1, false)
  }

  // Test 43 - 2 golems with broken shields vs 2 shields+5 golems
  setupMaterial43(setup: RivalitySetup) {
    this.setupMaterialGolemsWithBrokenShieldsVsShields(setup, 2, 2, 2, 5, false)
  }

  // Test 44 - 1 golem with broken shields vs wizard+2 shields+5 golems
  setupMaterial44(setup: RivalitySetup) {
    this.setupMaterialGolemsWithBrokenShieldsVsShields(setup, 1, 2, 0, 5, true)
  }

  // Test 45 - 2 golems with broken shields vs wizard+2 shields+5 golems
  setupMaterial45(setup: RivalitySetup) {
    this.setupMaterialGolemsWithBrokenShieldsVsShields(setup, 2, 2, 0, 5, true)
  }

  setupMaterialMoreThan5Golems(
    setup: RivalitySetup,
    spellNbGolems: number,
    nbGolems2: number,
    nbGolems3: number,
    expectedAskPlayer: boolean
    ){
      let title="golems "+nbGolems2+"+"+nbGolems3
      let expected="Equalize nb golems up to 5 max"
      if (expectedAskPlayer){
        expected="Ask which golem must be removed"
      }

      this.texts(
        title,
        "Move the first tile below the tile at the right of the Well of Mana",
        expected
      )

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

      const squares=[
        new Square( 1,  0, Tile.StoneCircle_11_32, Orientation.North, 0, nbGolems2, nbGolems3)
      ]

      this.prepareBoard_3players(setup, squares,
        firstHandTile,
        Tile.Fortress_22_13B_31,
        Tile.Fortress_23B_22_22,
        Tile.Fortress_31_22_13B,
        Tile.Cottage_32_23B_x,
        Tile.Cottage_23B_32_x,
        -1,  1,
        -1, -1,
         1, -1
      )
  }

  // Test 46-75 - Discard opponent golems if more than 5 golems - question about the golem to be removed
  // +1 golem vs 4+1
  setupMaterial46(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 1, 4, 1, false)
  }

  // +1 golem vs 3+2
  setupMaterial47(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 1, 3, 2, false)
  }

  // +1 golem vs 2+3
  setupMaterial48(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 1, 2, 3, false)
  }

  // +1 golem vs 1+4
  setupMaterial49(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 1, 1, 4, false)
  }

  // +2 golems vs 4+1
  setupMaterial50(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 2, 4, 1, false)
  }

  // +2 golems vs 3+2
  setupMaterial51(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 2, 3, 2, true)
  }

  // +2 golems vs 2+3
  setupMaterial52(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 2, 2, 3, true)
  }

  // +2 golems vs 1+4
  setupMaterial53(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 2, 1, 4, false)
  }

  // +2 golems vs 3+1
  setupMaterial54(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 2, 3, 1, false)
  }

  // +2 golems vs 2+2
  setupMaterial55(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 2, 2, 2, false)
  }

  // +2 golems vs 1+3
  setupMaterial56(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 2, 1, 3, false)
  }

  // +3 golems vs 4+1
  setupMaterial57(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 3, 4, 1, false)
  }

  // +3 golems vs 3+2
  setupMaterial58(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 3, 3, 2, false)
  }

  // +3 golems vs 2+3
  setupMaterial59(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 3, 2, 3, false)
  }

  // +3 golems vs 1+4
  setupMaterial60(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 3, 1, 4, false)
  }

  // +3 golems vs 3+1
  setupMaterial61(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 3, 3, 1, false)
  }

  // +3 golems vs 2+2
  setupMaterial62(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 3, 2, 2, false)
  }

  // +3 golems vs 1+3
  setupMaterial63(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 3, 1, 3, false)
  }

  // +3 golems vs 2+1
  setupMaterial64(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 3, 2, 1, false)
  }

  // +3 golems vs 1+2
  setupMaterial65(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 3, 1, 2, false)
  }

  // +4 golems vs 4+1
  setupMaterial66(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 4, 4, 1, false)
  }

  // +4 golems vs 3+2
  setupMaterial67(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 4, 3, 2, true)
  }

  // +4 golems vs 2+3
  setupMaterial68(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 4, 2, 3, true)
  }

  // +4 golems vs 1+4
  setupMaterial69(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 4, 1, 4, true)
  }

  // +4 golems vs 3+1
  setupMaterial70(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 4, 3, 1, true)
  }

  // +4 golems vs 2+2
  setupMaterial71(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 4, 2, 2, true)
  }

  // +4 golems vs 1+3
  setupMaterial72(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 4, 1, 3, true)
  }

  // +4 golems vs 2+1
  setupMaterial73(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 4, 2, 1, true)
  }

  // +4 golems vs 1+2
  setupMaterial74(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 4, 1, 2, true)
  }

  // +4 golems vs 1+1
  setupMaterial75(setup: RivalitySetup) {
    this.setupMaterialMoreThan5Golems(setup, 4, 1, 1, true)
  }

  setupMaterialLastGolem(setup: RivalitySetup, player:number){
    let nbGolems1=0
    let nbGolems2=0
    let nbGolems3=0
    if (player==1) nbGolems1=3
    if (player==2) nbGolems2=3
    if (player==3) nbGolems3=3

    const squares=[
      new Square( 1,  0, Tile.Cottage_12_21_23B, Orientation.North, nbGolems1, nbGolems2, nbGolems3),
      new Square( 1,  1, Tile.Cottage_23B_12_21, Orientation.North, nbGolems1, nbGolems2, nbGolems3),
      new Square( 1,  2, Tile.Cottage_22_23B_11, Orientation.North, nbGolems1, nbGolems2, nbGolems3),
      new Square( 2,  0, Tile.Cottage_31_23B_x, Orientation.North, nbGolems1, nbGolems2, nbGolems3),
      new Square( 2,  1, Tile.Cottage_11_23B_22, Orientation.North, nbGolems1, nbGolems2, nbGolems3),
      new Square( 2,  2, Tile.Cottage_23B_31_x, Orientation.North, nbGolems1, nbGolems2, nbGolems3),
    ]

    this.prepareBoard_3players(setup, squares,
      Tile.StoneCircle_x_41,
      Tile.StoneCircle_31_11,
      Tile.StoneCircle_11_31,
      Tile.StoneCircle_12_31,
      Tile.StoneCircle_31_12,
      Tile.StoneCircle_11_32,
      -1,  1,
      -1,  0,
      -1, -1
    )
  }

  // Test 76 - All first player's golems are placed
  setupMaterial76(setup: RivalitySetup) {
    this.texts(
      "All first player's golems are placed",
      "Use your last golems",
      "Game over after using your last golem"
    )
    this.setupMaterialLastGolem(setup, 1)
  }
  start76(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 1)
  }

  // Test 77 - All second player's golems are placed
  setupMaterial77(setup: RivalitySetup) {
    this.texts(
      "All second player's golems are placed",
      "Use your last golems",
      "Game over after using your last golem"
    )
    this.setupMaterialLastGolem(setup, 2)
  }
  start77(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 2)
  }

  // Test 78 - All third player's golems are placed
  setupMaterial78(setup: RivalitySetup) {
    this.texts(
      "All third player's golems are placed",
      "Use your last golems",
      "Game over after using your last golem"
    )
    this.setupMaterialLastGolem(setup, 3)
  }
  start78(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.ChooseTile, 3)
  }

  // Test 79 - No mulligan
  setupMaterial79(setup: RivalitySetup) {
    this.texts(
      "No mulligan",
      "Nothing to do",
      "The game must ask to place a tile"
    )
    this.prepareBoard_2players(setup, [],
      Tile.StoneCircle_x_41,
      Tile.Cottage_12_21_23B,
      Tile.Fortress_22_13B_31,
      Tile.Cottage_23B_31_x,
      -1,  1,
      -1, -1
    )
  }
  start79(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.Start, 1)
  }

  // Test 80 - Mulligan
  setupMaterial80(setup: RivalitySetup) {
    this.texts(
      "Mulligan",
      "Test both options",
      "The game must ask to keep the tiles or to discard them"
    )
    this.prepareBoard_2players(setup, [],
      Tile.StoneCircle_22_22,
      Tile.Fortress_23B_22_22,
      Tile.Fortress_22_13B_31,
      Tile.Cottage_23B_31_x,
      -1,  1,
      -1, -1
    )
  }
  start80(setup: RivalitySetup) {
    setup.startPlayerTurn(RuleId.Start, 1)
  }

  setupMaterial_tieBreak(setup: RivalitySetup,
    player1StoneCircle:boolean,
    player1Cottage:boolean,
    player2StoneCircle:boolean,
    player2Cottage:boolean,
    player3StoneCircle:boolean,
    player3Cottage:boolean,
    playerWithMajorityOnWellOfMana:number
    ) {
    // Note: few golems may be removed to reduce the player's score by 3 points
    //       in case the well of mana is controlled
    this.prepareBoard_3players(setup, [
      new Square( 1,  0, Tile.StoneCircle_31_11, Orientation.North,
        player1StoneCircle ? 1 : 0, 0, 0),
      new Square( 2,  0, Tile.StoneCircle_11_31, Orientation.North,
        (player1StoneCircle && playerWithMajorityOnWellOfMana!=1) ? 1 : 0, 0, 0),
      new Square( 3,  0, Tile.StoneCircle_12_31, Orientation.North,
        0, player2StoneCircle ? 1 : 0, 0),
      new Square( 4,  0, Tile.StoneCircle_31_12, Orientation.North,
        0, (player2StoneCircle && playerWithMajorityOnWellOfMana!=2) ? 1 : 0, 0),
      new Square( 0,  1, Tile.StoneCircle_11_32, Orientation.North,
        0, 0, player3StoneCircle ? 1 : 0),
      new Square( 1,  1, Tile.StoneCircle_32_11, Orientation.North,
        0, 0, (player3StoneCircle && playerWithMajorityOnWellOfMana!=3) ? 1 : 0),
      new Square( 2,  1, Tile.Cottage_12_21_23B, Orientation.North,
        player1Cottage ? 1 : 0, 0, 0),
      new Square( 3,  1, Tile.Cottage_23B_12_21, Orientation.North,
        (player1Cottage && playerWithMajorityOnWellOfMana!=1) ? 1 : 0, 0, 0),
      new Square( 4,  1, Tile.Cottage_22_23B_11, Orientation.North,
        0, player2Cottage ? 1 : 0, 0),
      new Square( 0,  2, Tile.Cottage_31_23B_x, Orientation.North,
        0, (player2Cottage && playerWithMajorityOnWellOfMana!=2) ? 1 : 0, 0),
      new Square( 1,  2, Tile.Cottage_11_23B_22, Orientation.North,
        0, 0, player3Cottage ? 1 : 0),
      new Square( 2,  2, Tile.Cottage_23B_31_x, Orientation.North,
        0, 0, (player3Cottage && playerWithMajorityOnWellOfMana!=3) ? 1 : 0),
      new Square( 3,  2, Tile.Cottage_32_23B_x, Orientation.North, 0, 0, 0),
      new Square( 4,  2, Tile.Cottage_23B_32_x, Orientation.North, 0, 0, 0),
      new Square( 0,  3, Tile.Fortress_21_23B_22, Orientation.North, 0, 0, 0),
      new Square( 1,  3, Tile.Fortress_22_13B_31, Orientation.North, 0, 0, 0),
      new Square( 2,  3, Tile.Fortress_23B_22_22, Orientation.North, 0, 0, 0),
      new Square( 3,  3, Tile.Fortress_31_22_13B, Orientation.North, 0, 0, 0),
      new Square( 4,  3, Tile.Fortress_22_23B_21, Orientation.North, 0, 0, 0),
      new Square( 0,  4, Tile.Fortress_22_22_23B, Orientation.North, 0, 0, 0),
    ],
      undefined, undefined,
      undefined, undefined,
      undefined, undefined,
      -1,  1,
      -1, -1,
      -1,  0
    )
    // Remaining: 2 tiles Fortress_22_22_23B + 2 tiles StoneCircle_x_41
    const stoneCircleDeck1=setup.material(MaterialType.Tile)
      .filter(item => item.id===Tile.StoneCircle_22_22)
      .deck()
    const stoneCircleDeck2=setup.material(MaterialType.Tile)
      .filter(item => item.id===Tile.StoneCircle_x_41)
      .deck()

    stoneCircleDeck1.deal({
        type: LocationType.Board,
        id: BoardSpace.Tile,
        x: 1,
        y: 4,
        rotation: Orientation.North
      }, 1)
    stoneCircleDeck1.deal({
        type: LocationType.Board,
        id: BoardSpace.Tile,
        x: 2,
        y: 4,
        rotation: Orientation.North
      }, 1)
    stoneCircleDeck2.deal({
        type: LocationType.Board,
        id: BoardSpace.Tile,
        x: 3,
        y: 4,
        rotation: Orientation.North
      }, 1)
    stoneCircleDeck2.deal({
        type:LocationType.PlayerHand,
        player:1,
        x:1,
        rotation: Orientation.South
      }, 1)

    if (playerWithMajorityOnWellOfMana!=0){
      setup
        .material(MaterialType.Golem)
        .location(LocationType.PlayerGolemStack)
        .player(playerWithMajorityOnWellOfMana)
        .limit(1)
        .moveItems({
          type: LocationType.Board,
          id: BoardSpace.Golem,
          x: 0,
          y: 0,
        })
    }
  }

  setupMaterial81(setup: RivalitySetup) {
    this.texts(
      "Tie break",
      "Move the tile to the bottom right corner",
      "Tie - All players have a score of 0"
    )
    this.setupMaterial_tieBreak(setup,
      false, false,
      false, false,
      false, false,
      0
    )
  }

  setupMaterial82(setup: RivalitySetup) {
    this.texts(
      "Tie break",
      "Move the tile to the bottom right corner",
      "Player 1 and 2 wins (tie) with 6 points. Player 3 has 2 points."
    )
    this.setupMaterial_tieBreak(setup,
      true, true,
      true, true,
      true, false,
      0
    )
  }

  setupMaterial83(setup: RivalitySetup) {
    this.texts(
      "Tie break",
      "Move the tile to the bottom right corner",
      "Player 1 wins with 6 points. Player 2 has 6 points. Player 3 has 2 points."
    )
    this.setupMaterial_tieBreak(setup,
      true, true,
      true, true,
      true, false,
      1
    )
  }

  setupMaterial84(setup: RivalitySetup) {
    this.texts(
      "Tie break",
      "Move the tile to the bottom right corner",
      "Player 1 has 6 points. Player 2 wins with 6 points. Player 3 has 2 points."
    )
    this.setupMaterial_tieBreak(setup,
      true, true,
      true, true,
      true, false,
      2
    )
  }

  setupMaterial85(setup: RivalitySetup) {
    this.texts(
      "Tie break",
      "Move the tile to the bottom right corner",
      "Player 1 has 6 points. Player 2 has 6 points. Player 3 wins with 2 points."
    )
    this.setupMaterial_tieBreak(setup,
      true, true,
      true, true,
      true, false,
      3
    )
  }

  // TODO - Pass tests 82 to 85
}

export const tests = new RivalityTests()
