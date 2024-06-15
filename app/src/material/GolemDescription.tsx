/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Golem } from '@gamepark/rivality/material/Golem'
import { ItemContext, TokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { GolemHelp } from './help/GolemHelp'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
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

  getItemExtraCss(item: MaterialItem, context: ItemContext){
    const nbGolemsOnLocation=context.rules
      .material(MaterialType.Golem)
      .location(LocationType.Board)
      .filter(golem =>
        golem.id===item.id &&
        golem.location.x===item.location.x &&
        golem.location.y===item.location.y )
      .length

    if (nbGolemsOnLocation==5)
      return haloCss
    return emptyCss
  }
}

const emptyCss=css``
const haloCss=css`
  filter: drop-shadow(0 -0.5em 0.25em rgb(255, 255, 255));
`

export const golemDescription = new GolemDescription()
export const spaceBetweenGolems = 0.5
