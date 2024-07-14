/** @jsxImportSource @emotion/react */
import { ItemLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { golemDescription, spaceBetweenGolems } from '../material/GolemDescription'
import { Corner, tableDesign } from './position/TableDesign'

export class PlayerWizardStartLocator extends ItemLocator {
  getPosition(item: MaterialItem, context: ItemContext) {
    const player=item.location.player
    if (player===undefined)
      return {x:0, y:0, z:0}
    const corner=tableDesign.playerCorner(player, context)
    const baseCoords=tableDesign.playerGolemStackCoordinates(item.location, context)
    switch (corner){
      case Corner.TopLeft:
      case Corner.BottomLeft:
        return {
          x:baseCoords.x+6*(golemDescription.width+spaceBetweenGolems),
          y:baseCoords.y,
          z:0
        }
      case Corner.TopRight:
      case Corner.BottomRight:
        return {
          x:baseCoords.x-6*(golemDescription.width+spaceBetweenGolems),
          y:baseCoords.y,
          z:0
        }
    }
    console.log("*** ERROR - Unsupported corner")
    return {x:0, y:0, z:0}
  }

  getRotateZ(item: MaterialItem, context: ItemContext): number {
    return tableDesign.rotateZforPlayer(item.location.player, context)
  }
}

export const playerWizardStartLocator = new PlayerWizardStartLocator()
