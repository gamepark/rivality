/** @jsxImportSource @emotion/react */
import { Golem } from '@gamepark/rivality/material/Golem'
import { TokenDescription } from '@gamepark/react-game'
import { GolemHelp } from './help/GolemHelp'
import Golem1 from '../images/Golem1.png'
import Golem2 from '../images/Golem2.png'
import Golem3 from '../images/Golem3.png'

export class GolemDescription extends TokenDescription  {
  width=1.5
  height=1.5
  help = GolemHelp
  images = {
    [Golem.Golem1]: Golem1,
    [Golem.Golem2]: Golem2,
    [Golem.Golem3]: Golem3
  }
}

export const golemDescription = new GolemDescription()
export const spaceBetweenGolems = 0.5
