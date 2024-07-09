import { Material } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Tile } from '../material/Tile'
import { PlayerColor } from '../PlayerColor'
import { tileTools } from './TileTools'

export class Score {
  playerScore(
    playerId:PlayerColor,
    tiles:Material<number, MaterialType, LocationType>,
    golems:Material<number, MaterialType, LocationType>,
    wizards:Material<number, MaterialType, LocationType>):number {
    let res = 0

    let wellController=this.playerControllingWellOfMana(golems)

    // Loop on tiles
    tiles.location(LocationType.Board).getItems().forEach(item => {
      let tile:Tile=item.id
      let x=item.location.x!
      let y=item.location.y!

      // No points for tiles with a wizard
      let hasWizards=wizards.filter(item => item.location.x==x && item.location.y==y).length > 0
      if (hasWizards)
        return

      if (this.playerControllingTile(golems, x, y, wellController)===playerId){
        // The tile is controlled by the current player
        res+=tileTools.tileScore(tile)
      }
    })
    return res
  }

  playerControllingWellOfMana(golems:Material<number, MaterialType, LocationType>):PlayerColor | undefined {
    return this.playerControllingTile(golems, 0, 0, undefined)
  }

  playerControllingTile(
    golems:Material<number, MaterialType, LocationType>,
    x:number,
    y:number,
    wellController:PlayerColor|undefined):PlayerColor | undefined {
    let nbGolems1=golems.filter(item => item.id==PlayerColor.Purple && item.location.x==x && item.location.y==y).length
    let nbGolems2=golems.filter(item => item.id==PlayerColor.Orange && item.location.x==x && item.location.y==y).length
    let nbGolems3=golems.filter(item => item.id==PlayerColor.Green && item.location.x==x && item.location.y==y).length

    // For tests: there must be at least one golem to control the tile
    if (nbGolems1+nbGolems2+nbGolems3 <= 0)
      return undefined

    if ((nbGolems1 > nbGolems2) && (nbGolems1 > nbGolems3))
      return 1
    if ((nbGolems2 > nbGolems1) && (nbGolems2 > nbGolems3))
      return 2
    if ((nbGolems3 > nbGolems1) && (nbGolems3 > nbGolems2))
      return 3

    if (wellController!==undefined){
      if ((wellController==1) && (nbGolems1 >= nbGolems2) && (nbGolems1 >= nbGolems3))
        return 1
      if ((wellController==2) && (nbGolems2 >= nbGolems1) && (nbGolems2 >= nbGolems3))
        return 2
      if ((wellController==3) && (nbGolems3 >= nbGolems1) && (nbGolems3 >= nbGolems2))
        return 3
    }

    return undefined
  }
}

export const score = new Score()
