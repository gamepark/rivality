/** @jsxImportSource @emotion/react */
import { GridLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { BoardSpace } from '@gamepark/rivality/material/BoardSpace'
import { Wizard } from '@gamepark/rivality/material/Wizard'
import { BoardDescription } from './description/BoardDescription'
import { tileDescription, spaceBetweenTiles } from '../material/TileDescription'

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
      deltaX=0
      deltaY=0
      deltaZ=1
    } else if (item.location.id===BoardSpace.Wizard){
      deltaX=0
      if (item.id===Wizard.Wizard1)
        deltaY=1.5
      else if (item.id===Wizard.Wizard2)
        deltaY=-1.5
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
    if (item.id===Wizard.Wizard1)
      return 0
    if (item.id===Wizard.Wizard2)
      return 180
    return 90
  }
}

export const boardLocator = new BoardLocator()
