/** @jsxImportSource @emotion/react */
import { Golem } from '@gamepark/rivality/material/Golem'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { PlayerId } from '@gamepark/rivality/PlayerId'
import { TokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import Golem1 from '../images/Golem1.png'
import Golem2 from '../images/Golem2.png'
import Golem3 from '../images/Golem3.png'

export class GolemDescription extends TokenDescription  {
  width = 1.5
  ratio = 150 / 150
  images = {
    [Golem.Golem1]: Golem1,
    [Golem.Golem2]: Golem2,
    [Golem.Golem3]: Golem3
  }

  getRotateZ(_item: MaterialItem<PlayerId, LocationType>): number {
    return 180
  }

//  help = GemHelp
}

export const golemDescription = new GolemDescription()
