import { PlayerColor } from '../PlayerColor'

export class PlayerTools {
  opponentsOf(player:PlayerColor, nbPlayers:number) : PlayerColor[] {
    if (nbPlayers==2){
      if (player==1) return [2]
      if (player==2) return [1]
      console.log("*** ERROR - Unsupported player id")
      return [1]
    } else if (nbPlayers==3){
      if (player==1) return [2, 3]
      if (player==2) return [1, 3]
      if (player==3) return [1, 2]
      console.log("*** ERROR - Unsupported player id")
      return [1, 2]
    }
    console.log("*** ERROR - Unsupported nb of players")
    return []
  }
}

export const playerTools = new PlayerTools()
