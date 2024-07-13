/** @jsxImportSource @emotion/react */
import { HandLocator, ItemContext, /* LocationDescription, MaterialContext*/ } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { Orientation } from '@gamepark/rivality/Orientation'
import { PlayerHandDescription } from './description/PlayerHandDescription'
import { tableDesign } from './position/TableDesign'

export class PlayerHandLocator extends HandLocator {
  locationDescription = new PlayerHandDescription()

  isClockwise() {
    return false
  }

  getCoordinates(location: Location, context: ItemContext) {
    const baseCoordinates=this.locationDescription.getCoordinates(location, context)
    return { x:baseCoordinates.x, y:baseCoordinates.y, z: 1 }
  }

  getRadius(_item: MaterialItem, _context: ItemContext): number {
    return 125
  }

  getBaseAngle(item: MaterialItem, context: ItemContext): number {
    return tableDesign.rotateZforPlayer(item.location.player, context)
  }

  getRotateZ(item: MaterialItem, context: ItemContext): number {
    // Tiles in opponents'hand are not rotated
    if (item.location.player !== context.player){
      return tableDesign.rotateZforPlayer(item.location.player, context)
    }

    // Tiles in active player's hand are rotated
    if (item.location.rotation===Orientation.North)
      return 0
    if (item.location.rotation===Orientation.East)
      return 90
    if (item.location.rotation===Orientation.South)
      return 180
    if (item.location.rotation===Orientation.West)
      //return -90
      return 270

    // Default: no rotation
    return 0
  }
}

export const playerHandLocator = new PlayerHandLocator()
