/** @jsxImportSource @emotion/react */
import { TokenDescription } from '@gamepark/react-game'
import { PlayerColor } from '@gamepark/rivality/PlayerColor'
import Wizard1 from '../images/Wizard1.png'
import Wizard2 from '../images/Wizard2.png'
import Wizard3 from '../images/Wizard3.png'
import { WizardHelp } from './help/WizardHelp'

export class WizardDescription extends TokenDescription  {
  width = 2
  ratio = 150 / 150
  help = WizardHelp
  images = {
    [PlayerColor.Purple]: Wizard1,
    [PlayerColor.Orange]: Wizard2,
    [PlayerColor.Green]: Wizard3
  }
}

export const wizardDescription = new WizardDescription()
