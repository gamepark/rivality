//import { LocationType } from '../material/LocationType'
//import { MaterialType } from '../material/MaterialType'
//import { MaterialItem, XYCoordinates } from '@gamepark/rules-api'
//import { Tile } from '../material/Tile'
import { Wizard } from '../material/Wizard'
import { PlayerId } from '../PlayerId'

export class WizardTools {
  playerWizard(player:PlayerId): Wizard {
    if (player==1)
      return Wizard.Wizard1
    if (player==2)
      return Wizard.Wizard2
    if (player==3)
      return Wizard.Wizard3
    console.log("*** ERROR - Invalid player for wizard")
    return Wizard.Wizard1
  }
}

export const wizardTools = new WizardTools()
