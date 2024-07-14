/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { tableDesign } from '../position/TableDesign'
import { tileDescription } from '../../material/TileDescription'

export class PlayerDeckQuantityDescription extends LocationDescription {
  height = 0.8
  width = 1

  alwaysVisible=true

  extraCss = css`
    touch-action: none;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  `

  content = ScoreDisplay

  displayInParentItemHelp = true

  getCoordinates(location: Location, context: MaterialContext) {
    const baseCoords=tableDesign.playerDeckCoordinates(location, context)
    return {
      x:baseCoords.x+(tileDescription.width/2)-1,
      y:baseCoords.y-(tileDescription.height/2)+1,
      z:5
    }
  }
}

const ScoreDisplay = ({ location }: { location: Location }) => {
  if (location.id<=0)
    return <></>
  return <span css={scoreStyle}>{location.id}</span>
}

const scoreStyle = css`
  font-size: 1em;
  color: white;
  font-weight: bold;
`
