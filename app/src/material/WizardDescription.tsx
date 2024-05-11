/** @jsxImportSource @emotion/react */
import { Wizard } from '@gamepark/rivality/material/Wizard'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { PlayerId } from '@gamepark/rivality/PlayerId'
import { TokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import Wizard1 from '../images/Wizard1.png'
import Wizard2 from '../images/Wizard2.png'
import Wizard3 from '../images/Wizard3.png'

export class WizardDescription extends TokenDescription  {
  width = 1.5
  ratio = 150 / 150
  images = {
    [Wizard.Wizard1]: Wizard1,
    [Wizard.Wizard2]: Wizard2,
    [Wizard.Wizard3]: Wizard3
  }

  getRotateZ(_item: MaterialItem<PlayerId, LocationType>): number {
    return 0
  }

//  help = GemHelp
}

export const wizardDescription = new WizardDescription()
