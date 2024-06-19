/** @jsxImportSource @emotion/react */
import { LocationContext } from '@gamepark/react-game'
import { MaterialRules, Location } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { tileDescription, spaceBetweenTiles } from '../../material/TileDescription'

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

    // Ensure a minimum table size
    if (boardXMax-boardXMin<4){
      if (boardXMin<=-2){
        boardXMax=boardXMin+4
      } else if (boardXMax>=2){
        boardXMin=boardXMax-4
      } else {
        boardXMin=-2
        boardXMax=2
      }
    }

    if (boardYMax-boardYMin<4){
      if (boardYMin<=-2){
        boardYMax=boardYMin+4
      } else if (boardYMax>=2){
        boardYMin=boardYMax-4
      } else {
        boardYMin=-2
        boardYMax=2
      }
    }

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
//        const extraX=2*(tileDescription.width+spaceBetweenBoardAndHand+spaceBetweenHandAndBoard)
//        const extraY=2*(tileDescription.height+spaceBetweenBoardAndHand+spaceBetweenHandAndBoard)
        const extraX=5
        const extraY=5

        const golemStackWidth=22

        let xMin=boardSize.xMin-extraX/2
        let xMax=boardSize.xMax+extraX/2+golemStackWidth
        let yMin=boardSize.yMin-extraY/2
        let yMax=boardSize.yMax+extraY/2

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
    const locationPlayer = location.player!
    const { rules } = context
    let nbPlayers=this.nbPlayers(rules)

    let handCoords=this.playerHandCoordinates(location, context)
    const fakePosition=0
    const corner=this.playerCorner(locationPlayer, fakePosition, nbPlayers)

    let x=0
    let y=0
    switch (corner){
      case Corner.BottomRight:
        x=handCoords.x-14
        y=handCoords.y+7.5
        break
      case Corner.TopRight:
        x=handCoords.x-14
        y=handCoords.y-7.5
        break
      case Corner.TopLeft:
        x=handCoords.x+10
        y=handCoords.y-10.5
        break
    }
    return {x:x, y:y, z:0}
  }

  playerHandCoordinates(location: Location, context: LocationContext){
    const locationPlayer = location.player!
    return this.playerHandCoordinatesForPlayer(locationPlayer, context)
  }

  playerHandCoordinatesForPlayer(player: number, context: LocationContext){
    const { rules } = context
    let nbPlayers=this.nbPlayers(rules)

    const fakePosition=0
    const corner=this.playerCorner(player, fakePosition, nbPlayers)

    let tableSize=this.getTableSize(nbPlayers, rules)

    let x=0
    let y=0
    switch (corner){
      case Corner.BottomRight:
        x=tableSize.xMax-10
        y=tableSize.yMax-12
        break
      case Corner.TopRight:
        x=tableSize.xMax-10
        y=tableSize.yMin+12
        break
      case Corner.TopLeft:
        x=tableSize.xMin+5
        y=tableSize.yMin+15.5
        break
    }
    return {x:x, y:y, z:0}
  }

  playerGolemStackCoordinates(location: Location, context: LocationContext){
    const locationPlayer = location.player!
    const { rules } = context
    let nbPlayers=this.nbPlayers(rules)

    let handCoords=this.playerHandCoordinates(location, context)

    const fakePosition=0
    const corner=this.playerCorner(locationPlayer, fakePosition, nbPlayers)

    let x=0
    let y=0
    switch (corner){
      case Corner.BottomRight:
        x=handCoords.x
        if (nbPlayers===2){
          y=handCoords.y-7
        } else {
          y=handCoords.y-9
        }
        break
      case Corner.TopRight:
        x=handCoords.x
        if (nbPlayers===2){
          y=handCoords.y+7
        } else {
          y=handCoords.y+9
        }
        break
      case Corner.TopLeft:
        x=handCoords.x
        y=handCoords.y+14
        break
    }
    return {x:x, y:y, z:0}
  }

  playerButtonCoordinates(_location: Location, context: LocationContext){
    const { rules } = context
    let nbPlayers=this.nbPlayers(rules)

    const me=context.player
    const player=me!==undefined ? me : 1
    let handCoords=this.playerHandCoordinatesForPlayer(player, context)

    if (nbPlayers===3 && me===2){
      return {
        x:handCoords.x+(tileDescription.height/2),
        y:handCoords.y-(tileDescription.width),
        z:handCoords.z+2
      }
    }
    return {
      x:handCoords.x+(tileDescription.width),
      y:handCoords.y-(tileDescription.height/2),
      z:handCoords.z+2
    }
  }
}

export const tableDesign = new TableDesign()
