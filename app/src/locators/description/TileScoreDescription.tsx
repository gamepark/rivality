/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationDescription, MaterialContext, Picture } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { boardLocator } from '../BoardLocator'
import { PlayerColor } from '@gamepark/rivality/PlayerColor'
import NoGolem1Icon from '../../images/icon/no_golem1b.png'
import NoGolem2Icon from '../../images/icon/no_golem2b.png'
import NoGolem3Icon from '../../images/icon/no_golem3b.png'
import Golem1Icon from '../../images/Golem1.png'
import Golem2Icon from '../../images/Golem2.png'
import Golem3Icon from '../../images/Golem3.png'

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
  const nbGolems=location.id.golems
  const player=location.id.player
  let color='white'
  let golem=Golem1Icon
  let noGolem=NoGolem1Icon
  switch (player){
    case PlayerColor.Purple:
      color='#bc0089'
      golem=Golem1Icon
      noGolem=NoGolem1Icon
      break
    case PlayerColor.Orange:
      color='#bc5600'
      golem=Golem2Icon
      noGolem=NoGolem2Icon
      break
    case PlayerColor.Green:
      color='#18600f'
      golem=Golem3Icon
      noGolem=NoGolem3Icon
      break
  }
  if (score===undefined && nbGolems!==undefined){
    switch (nbGolems){
      case 0:
        return <><Picture css={golemStyle2} src={noGolem}/></>
      case 1:
        return <><Picture css={golemStyle} src={golem}/></>
      case 2:
        return <>
          <Picture css={golemStyle} src={golem}/>&nbsp;
          <Picture css={golemStyle} src={golem}/>
        </>
      case 3:
        return <>
          <Picture css={golemStyle} src={golem}/>&nbsp;
          <Picture css={golemStyle} src={golem}/>&nbsp;
          <Picture css={golemStyle} src={golem}/>
        </>
    }
    console.log("*** ERROR - Unsupported nb of golems")
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

const golemStyle = css`
  width: 2em;
  height: 2em;
`

const golemStyle2 = css`
  width: 3em;
  height: 3em;
`
