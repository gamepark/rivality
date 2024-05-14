//import { LocationType } from '../material/LocationType'
//import { MaterialType } from '../material/MaterialType'
//import { MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { Golem } from '../material/Golem'

export class GolemTools {
  playerWizard(player:PlayerId): Golem {
    if (player==1)
      return Golem.Golem1
    if (player==2)
      return Golem.Golem2
    if (player==3)
      return Golem.Golem3
    console.log("*** ERROR - Invalid player for golem")
    return Golem.Golem1
  }
}

export const golemTools = new GolemTools()
