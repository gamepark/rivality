/** @jsxImportSource @emotion/react */
import { GridLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { BoardSpace } from '@gamepark/rivality/material/BoardSpace'
import { Orientation } from '@gamepark/rivality/Orientation'
import { BoardDescription } from './description/BoardDescription'
import { tileDescription, spaceBetweenTiles } from '../material/TileDescription'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'

export class BoardLocator extends GridLocator {
  itemsPerLine = 4
  itemsGap = { x: tileDescription.width + spaceBetweenTiles }
  linesGap = { y: tileDescription.height + spaceBetweenTiles }

  locationDescription = new BoardDescription()

  getPositionDeltaTile(){
    // The tile is centered
    return {x:0, y:0, z:0}
  }

  getPositionDeltaGolem(item: MaterialItem, context: ItemContext){
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
    return {
      x:-radius*Math.cos(2*Math.PI/nbGolemsOnCard*indexOnCard+(Math.PI/2)),
      y:-radius*Math.sin(2*Math.PI/nbGolemsOnCard*indexOnCard+(Math.PI/2)),
      z:1
    }
  }

  getPositionDeltaWizard(){
    return {x:0, y:0, z:1}
  }

  getPosition(item: MaterialItem, context: ItemContext) {
    let baseCoordinates=this.locationDescription.getCoordinates(item.location, context)
    let delta={x:0, y:0, z:0}

    switch (item.location.id){
      case BoardSpace.Tile:
        delta=this.getPositionDeltaTile()
        break
      case BoardSpace.Golem:
        delta=this.getPositionDeltaGolem(item, context)
        break
      case BoardSpace.Wizard:
        delta=this.getPositionDeltaWizard()
        break
    }

    return {
      x:baseCoordinates.x+delta.x,
      y:baseCoordinates.y+delta.y,
      z:baseCoordinates.z+delta.z
    }
  }

  getRotateZ(item: MaterialItem, _context: ItemContext): number {
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
    }
    if (item.location.id===BoardSpace.Golem){
      return 0
    }

    // Default: no rotation
    return 0
  }
}

export const boardLocator = new BoardLocator()
