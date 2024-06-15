/** @jsxImportSource @emotion/react */
import { GridLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { BoardSpace } from '@gamepark/rivality/material/BoardSpace'
//import { Golem } from '@gamepark/rivality/material/Golem'
import { Orientation } from '@gamepark/rivality/Orientation'
import { Wizard } from '@gamepark/rivality/material/Wizard'
import { BoardDescription } from './description/BoardDescription'
import { tileDescription, spaceBetweenTiles } from '../material/TileDescription'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'

export class BoardLocator extends GridLocator {
  itemsPerLine = 4
  itemsGap = { x: tileDescription.width + spaceBetweenTiles }
  linesGap = { y: tileDescription.height + spaceBetweenTiles }

  locationDescription = new BoardDescription()

  getPosition(item: MaterialItem, context: ItemContext) {
    let baseCoordinates=this.locationDescription.getCoordinates(item.location, context)
    let deltaX=0
    let deltaY=0
    let deltaZ=0
    if (item.location.id===BoardSpace.Tile){
      // The tile is centered
    } else if (item.location.id===BoardSpace.Golem){
      let indexOnCard=context.rules
        .material(MaterialType.Golem)
        .location(LocationType.Board)
        .filter(a => a.location.x===item.location.x && a.location.y===item.location.y && a.location.z!<=item.location.z!)
        .length

      let nbGolemsOnCard=context.rules
        .material(MaterialType.Golem)
        .location(LocationType.Board)
        .filter(a => a.location.x===item.location.x && a.location.y===item.location.y)
        .length

      let radius=2
      deltaX=-radius*Math.cos(2*Math.PI/nbGolemsOnCard*indexOnCard+(Math.PI/2))
      deltaY=-radius*Math.sin(2*Math.PI/nbGolemsOnCard*indexOnCard+(Math.PI/2))
      deltaZ=1
    } else if (item.location.id===BoardSpace.Wizard){
      deltaX=0
      if (item.id===Wizard.Wizard1)
//        deltaY=1.5
        deltaY=0
      else if (item.id===Wizard.Wizard2)
//        deltaY=-1.5
        deltaY=0
      else
        deltaY=0
      deltaZ=1
    }

    return {
      x:baseCoordinates.x+deltaX,
      y:baseCoordinates.y+deltaY,
      z:baseCoordinates.z+deltaZ
    }
  }

  getRotateZ(item: MaterialItem, _context: ItemContext): number {
//    const nbPlayers=context.rules.game.players.length
    if (item.location.id===BoardSpace.Tile){
      if (item.location.rotation===Orientation.North)
        return 0
      if (item.location.rotation===Orientation.East)
        return 90
      if (item.location.rotation===Orientation.South)
        return 180
      if (item.location.rotation===Orientation.West)
        return 270
    }
    if (item.location.id===BoardSpace.Wizard){
      return 0
/*
      if (nbPlayers===2){
        if (item.id===Wizard.Wizard1)
          return 0
        if (item.id===Wizard.Wizard2)
          return 180
      } else if (nbPlayers===3){
        if (item.id===Wizard.Wizard1)
          return 0
        if (item.id===Wizard.Wizard2)
          return 90
        if (item.id===Wizard.Wizard3)
          return 180
      } else {
        console.log("*** Unsupported nb of players")
      }
      return 90
*/
    }
    if (item.location.id===BoardSpace.Golem){
      return 0
/*
      if (nbPlayers===2){
        if (item.id===Golem.Golem1)
          return 0
        if (item.id===Golem.Golem2)
          return 180
      } else if (nbPlayers===3){
        if (item.id===Golem.Golem1)
          return 0
        if (item.id===Golem.Golem2)
          return 90
        if (item.id===Golem.Golem3)
          return 180
      } else {
        console.log("*** Unsupported nb of players")
      }
      return 90
*/
    }

    // Default: no rotation
    return 0
  }
}

export const boardLocator = new BoardLocator()
