/** @jsxImportSource @emotion/react */
import { LocationContext } from '@gamepark/react-game'
import { MaterialRules, Location } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { tileDescription, spaceBetweenTiles } from '../../material/TileDescription'

const spaceBetweenBoardAndHand=2
const spaceBetweenHandAndBoard=2
const tableThresholdXMin=-32
const tableThresholdXMax=32
const tableThresholdYMin=0
const tableThresholdYMax=0
const playerLeftThresholdXMin=-25

class TableDimensions {
  xMin:number=0
  xMax:number=0
  yMin:number=0
  yMax:number=0
}

export enum Corner {
  TopLeft        = 1,
  TopRight       = 2,
  BottomLeft     = 3,
  BottomRight    = 4
}

export class TableDesign {
  nbPlayers(rules: MaterialRules){
    return rules.players.length
  }

  playerCorner(player:number, _position:number, nbPlayers:number){
    if (nbPlayers===2){
      if (player===1)
        return Corner.BottomRight
      return Corner.TopRight
    } else if (nbPlayers===3){
      if (player===1)
        return Corner.BottomRight
      if (player===2)
        return Corner.TopLeft
      return Corner.TopRight
    }
    console.log("*** ERROR - Unsupported nb players")
    return Corner.TopRight
  }

  getBoardDimensions(rules:MaterialRules){
    let boardXMin=0
    let boardXMax=0
    let boardYMin=0
    let boardYMax=0

    rules
      .material(MaterialType.Tile)
      .location(LocationType.Board)
      .getItems()
      .forEach(item => {
        if (item.location.x!<boardXMin) boardXMin=item.location.x!
        if (item.location.x!>boardXMax) boardXMax=item.location.x!
        if (item.location.y!<boardYMin) boardYMin=item.location.y!
        if (item.location.y!>boardYMax) boardYMax=item.location.y!
      })

    return {boardXMin, boardXMax, boardYMin, boardYMax}
  }

  getBoardSize(rules:MaterialRules) : TableDimensions {
    let width=60
    let height=60

    const nbSurroundingSquares=2
    let boardDim=this.getBoardDimensions(rules)
    width=(boardDim.boardXMax-boardDim.boardXMin+1+nbSurroundingSquares)*(tileDescription.width+spaceBetweenTiles)-spaceBetweenTiles
    height=(boardDim.boardYMax-boardDim.boardYMin+1+nbSurroundingSquares)*(tileDescription.height+spaceBetweenTiles)-spaceBetweenTiles

    // The mana tile at (0,0) must never move
    let xMin=-((1-boardDim.boardXMin)*(tileDescription.width+spaceBetweenTiles)+(tileDescription.width/2))
    let yMin=-((1-boardDim.boardYMin)*(tileDescription.height+spaceBetweenTiles)+(tileDescription.height/2))
    let xMax=xMin+width
    let yMax=yMin+height

    return {xMin, xMax, yMin, yMax}
  }

  getBoardCenter(_rules:MaterialRules){
    return { x:0, y:0 }
  }

  getTableSize(players:number, rules:MaterialRules) : TableDimensions {
    switch (players) {
      case 1:
        return { xMin: -56, xMax: 12, yMin: -34, yMax: 17 }
      case 2: {
        // Minimal dimensions to ensure we see all tiles and golems
        const boardSize=this.getBoardSize(rules)
        const extraX=2*(tileDescription.width+spaceBetweenBoardAndHand+spaceBetweenHandAndBoard)
        const extraY=2*(tileDescription.height+spaceBetweenBoardAndHand+spaceBetweenHandAndBoard)

        let xMin=boardSize.xMin-extraX/2
        let xMax=boardSize.xMax+extraX/2
        let yMin=boardSize.yMin-extraY/2
        let yMax=boardSize.yMax+extraY/2

        if (xMin>tableThresholdXMin) xMin=tableThresholdXMin
        if (xMax<tableThresholdXMax) xMax=tableThresholdXMax
        if (yMin>tableThresholdYMin) yMin=tableThresholdYMin
        if (yMax<tableThresholdYMax) yMax=tableThresholdYMax

        return { xMin, xMax, yMin, yMax }
      }
      case 3: {
        // Same dimensions as 2 player mode with extra space on the left
        const twoPlayersDimensions=this.getTableSize(2, rules)
        return {
          xMin:twoPlayersDimensions.xMin-10,
          xMax:twoPlayersDimensions.xMax,
          yMin:twoPlayersDimensions.yMin,
          yMax:twoPlayersDimensions.yMax
        }
      }
      case 4:
        return { xMin: -49, xMax: 54, yMin: -42, yMax: 42 }
      case 5:
        return { xMin: -55, xMax: 57, yMin: -37, yMax: 37 }
      case 6:
        return { xMin: -55, xMax: 57, yMin: -37, yMax: 37 }
    }

    // Error
    console.log("*** Unsupported table configuration")
    return { xMin: -55, xMax: 57, yMin: -35, yMax: 17 }
  }

  boardCoordinates(_location: Location, context: LocationContext){
    const { rules } = context
    const centerCoord=this.getBoardCenter(rules)
    return {x:centerCoord.x, y:centerCoord.y, z:0}
  }

  playerDeckCoordinates(location: Location, context: LocationContext){
    const locationPlayer = location.player
    const { rules } = context
    let nbPlayers=this.nbPlayers(rules)

    let handCoords=this.playerHandCoordinates(location, context)

    let x=0
    let y=handCoords.y
    if (nbPlayers===2){
      if (locationPlayer===1){
        x=-12
      } else if (locationPlayer===2){
        x=12
      }
    } else if (nbPlayers===3){
      if (locationPlayer===1){
        x=-12
      } else if (locationPlayer===2){
        x=handCoords.x
        y=-12
      } else if (locationPlayer===3){
        x=12
      }
    } else {
      console.log("*** ERROR - Unsupported nb of players")
    }
    return {x:x, y:y, z:0}
  }

  playerHandCoordinates(location: Location, context: LocationContext){
    const locationPlayer = location.player
    const { rules } = context
    let nbPlayers=this.nbPlayers(rules)

    let boardSize=this.getBoardSize(rules)

    let x=-tileDescription.width/2-spaceBetweenTiles
    let y=0
    if (nbPlayers===2){
        if (locationPlayer===1){
          x=0
          y=boardSize.yMax+tileDescription.height/2+spaceBetweenBoardAndHand
        } else if (locationPlayer===2){
          x=0
          y=boardSize.yMin-tileDescription.height/2-spaceBetweenBoardAndHand
        }
    } else if (nbPlayers===3){
      x=0
      if (locationPlayer===1){
        y=boardSize.yMax+tileDescription.height/2+spaceBetweenBoardAndHand
      } else if (locationPlayer===2){
//        x=boardSize.xMin+tileDescription.height/2+spaceBetweenBoardAndHand
        x=boardSize.xMin-tileDescription.height/2-spaceBetweenBoardAndHand
        if (x>playerLeftThresholdXMin)
          x=playerLeftThresholdXMin
        y=0
      } else if (locationPlayer===3){
//        x=-x
        y=boardSize.yMin-tileDescription.height/2-spaceBetweenBoardAndHand
      }
    } else {
      console.log("*** ERROR - Unsupported nb of players")
    }
    return {x:x, y:y, z:0}
  }

  playerGolemStackCoordinates(location: Location, context: LocationContext){
    const locationPlayer = location.player
    const { rules } = context
    let nbPlayers=this.nbPlayers(rules)

    let handCoords=this.playerHandCoordinates(location, context)

    let x=0
    let y=handCoords.y
    if (nbPlayers===2){
        if (locationPlayer===1){
          x=20
        } else if (locationPlayer===2){
          x=-20
        }
    } else if (nbPlayers===3){
      if (locationPlayer===1){
        x=14
      } else if (locationPlayer===2){
        x=handCoords.x
        y=17 // TODO
      } else if (locationPlayer===3){
        x=-14
      }
    } else {
      console.log("*** ERROR - Unsupported nb of players")
    }
    return {x:x, y:y, z:0}
  }
}

export const tableDesign = new TableDesign()
