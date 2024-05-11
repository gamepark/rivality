/** @jsxImportSource @emotion/react */
import { LocationContext } from '@gamepark/react-game'
import { MaterialRules, Location } from '@gamepark/rules-api'
export class TableDesign {
  nbPlayers(rules: MaterialRules){
    return rules.players.length
  }

  getTableSize(players:number){
    switch (players) {
      case 1:
        return { xMin: -56, xMax: 12, yMin: -34, yMax: 17 }
      case 2:
        return { xMin: -30, xMax: 30, yMin: -30, yMax: 30 }
      case 3:
        return { xMin: -55, xMax: 57, yMin: -37, yMax: 37 }
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

  boardCoordinates(_location: Location, _context: LocationContext){
    return {x:4, y:3, z:0}
  }

  playerDeckCoordinates(location: Location, context: LocationContext){
    const locationPlayer = location.player
    const { rules } = context
    let nbPlayers=this.nbPlayers(rules)

    let x=0
    let y=0
    if (nbPlayers===2){
        if (locationPlayer===1){
          x=-20
          y=25
        } else if (locationPlayer===2){
          x=-20
          y=-25
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

    let x=0
    let y=0
    if (nbPlayers===2){
        if (locationPlayer===1){
          x=0
          y=25
        } else if (locationPlayer===2){
          x=0
          y=-25
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

    let x=0
    let y=0
    if (nbPlayers===2){
        if (locationPlayer===1){
          x=20
          y=25
        } else if (locationPlayer===2){
          x=20
          y=-25
        }
    } else {
      console.log("*** ERROR - Unsupported nb of players")
    }
    return {x:x, y:y, z:0}
  }
}

export const tableDesign = new TableDesign()
