/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { boardLocator } from '../BoardLocator'
import { PlayerColor } from '@gamepark/rivality/PlayerColor'

export class TileScoreDescription extends LocationDescription {
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
    const baseCoords=boardLocator.locationDescription.getCoordinates(location, context)
    return {
      x:baseCoords.x,
      y:baseCoords.y,
      z:5
    }
  }
}

const ScoreDisplay = ({ location }: { location: Location }) => {
  const score=location.id.score
  const player=location.id.player
  let color='white'
  switch (player){
    case PlayerColor.Purple:
      color='#bc0089'
      break
    case PlayerColor.Orange:
      color='#bc5600'
      break
    case PlayerColor.Green:
      color='#18600f'
      break
  }
  return <span css={scoreStyle(color)}>{score}</span>
}

const scoreStyle = (color:string) => css`
  font-size: 4em;
  color: ${color};
  font-weight: bold;
  text-shadow:
    -5px 0 black, 0 5px black, 5px 0 black, 0 -5px black,
    -10px 0 white, 0 10px white, 10px 0 white, 0 -10px white;
`
