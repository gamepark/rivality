/** @jsxImportSource @emotion/react */
import { HandLocator, ItemContext, /* LocationDescription, MaterialContext*/ } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { Orientation } from '@gamepark/rivality/Orientation'
import { PlayerHandDescription } from './description/PlayerHandDescription'

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
    let res=3
    const nbPlayers=context.rules.game.players.length
    if (nbPlayers===2){
      if (item.location.player===1){
        res=0
      }
      if (item.location.player===2){
        res=180
      }
    } else if (nbPlayers===3){
      if (item.location.player===1){
        res=0
      }
      if (item.location.player===2){
        res=90
      }
      if (item.location.player===3){
        res=180
      }
    }
    return res
  }

  getItemIndex(item: MaterialItem, _context: ItemContext): number {
    return item.location.x!-1
  }

  getRotateZ(item: MaterialItem, context: ItemContext): number {
    const nbPlayers=context.rules.game.players.length

    // Tiles in opponents'hand are not rotated
    if (item.location.player !== context.player){
      if (nbPlayers===2){
        if (item.location.player===1)
          return 0
        if (item.location.player===2)
          return 180
      } else if (nbPlayers===3){
        if (item.location.player===1)
          return 0
        if (item.location.player===2)
          return 90
        if (item.location.player===3)
          return 180
      }
      return 0
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
