/** @jsxImportSource @emotion/react */
import { HandLocator, ItemContext, /* LocationDescription, MaterialContext*/ } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { PlayerHandDescription } from './description/PlayerHandDescription'

export class PlayerHandLocator extends HandLocator {
  locationDescription = new PlayerHandDescription()

  isClockwise() {
    return false
  }

  getCoordinates(location: Location, context: ItemContext) {
    const baseCoordinates=this.locationDescription.getCoordinates(location, context)
    let deltaX=this.locationDescription.width/2
    let x=0
    if (location.player===1){
      x=baseCoordinates.x+deltaX
    } else {
      x=baseCoordinates.x-deltaX
    }
    return { x:x, y:baseCoordinates.y, z: 1 }
  }

  getRadius(_item: MaterialItem, _context: ItemContext): number {
    return 125
  }

  getBaseAngle(item: MaterialItem, _context: ItemContext): number {
    let res=3
    if (item.location.player!==1){
      res+=180
    }
    return res
  }

  getItemIndex(item: MaterialItem, _context: ItemContext): number {
      return item.location.x!
  }
}

export const playerHandLocator = new PlayerHandLocator()
