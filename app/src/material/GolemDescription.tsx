/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ItemContext, TokenDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { PlayerColor } from '@gamepark/rivality/PlayerColor'
import { MaterialItem } from '@gamepark/rules-api'
import Golem1 from '../images/Golem1.png'
import Golem2 from '../images/Golem2.png'
import Golem3 from '../images/Golem3.png'
import { GolemHelp } from './help/GolemHelp'

export class GolemDescription extends TokenDescription  {
  width=1.5
  height=1.5
  help = GolemHelp
  images = {
    [PlayerColor.Purple]: Golem1,
    [PlayerColor.Orange]: Golem2,
    [PlayerColor.Green]: Golem3
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

    if (nbGolemsOnLocation===5)
      return haloCss
    return emptyCss
  }
}

const emptyCss=css``

const haloCss=css`
  > div {
    filter: drop-shadow(0 -0.5em 0.25em white);
  }
`

export const golemDescription = new GolemDescription()
export const spaceBetweenGolems = 0.5
