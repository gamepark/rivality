/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { useTranslation } from 'react-i18next'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RivalityRules } from '@gamepark/rivality/RivalityRules'
import { PlayerId } from '@gamepark/rivality/PlayerId'
import { Avatar, PlayerTimer, SpeechBubbleDirection, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { FC, HTMLAttributes } from 'react'
import Player1 from '../images/Panel_pink.png'
import Player2 from '../images/Panel_orange.png'
import Player3 from '../images/Panel_green.png'

import Day from '../images/time/day.png'
import Night from '../images/time/night.png'

import { Memory } from '@gamepark/rivality/rules/Memory'

type RivalityPlayerPanelProps = {
  playerId: PlayerId
} & HTMLAttributes<HTMLDivElement>

export const RivalityPlayerPanel: FC<RivalityPlayerPanelProps> = (props) => {
  const { playerId, ...rest } = props
  const { t } = useTranslation()
  const rules = useRules<RivalityRules>()!
  let playerName = usePlayerName(playerId)
  const turnToPlay = rules.isTurnToPlay(playerId)

  // Tweak names for the tutorial
  const me = usePlayerId()
  const itsMe = me && playerId === me
  const isTutorial = !rules || rules.game.tutorialStep !== undefined
  if (isTutorial && !itsMe){
    playerName=t('tuto.opponent')
  }

  return (
    <>
      <div css={[panelPlayerStyle, panelStyle(playerId)]} {...rest}>
        <div css={turnToPlay ? day : night}></div>
        <Avatar css={avatarStyle} playerId={playerId} speechBubbleProps={{ direction: SpeechBubbleDirection.BOTTOM_LEFT }}/>
        <h2 css={[nameStyle, data]}>{playerName}</h2>
        <Timer {...props} />
        <Score {...props} />
      </div>

    </>
  )
}

const Timer: FC<RivalityPlayerPanelProps> = (props) => {
  const { playerId } = props
  const rules = useRules<RivalityRules>()!

  if (rules?.isOver()) return null

  return <PlayerTimer customStyle={[(playing) => !playing && css`color: lightgray !important;`]} playerId={playerId} css={[timerStyle, data]}/>
}

const Score: FC<RivalityPlayerPanelProps> = (props => {
  const { playerId } = props
  const rules = useRules<RivalityRules>()!

  const realTimeScore:boolean=rules.remind(Memory.RealTimeScore)
  const gameIsOver=rules?.isOver()
  if (!realTimeScore && !gameIsOver) return <></>
  const score=rules.computeScore(playerId)
  let scoreTxt=String(score)
  let scoreWithExtraValue=false
  if (!gameIsOver){
    const wizardTileScore=rules.computeWizardTileScore(playerId)
    if (wizardTileScore>0){
      scoreWithExtraValue=true
      scoreTxt+="\u00A0(+"+wizardTileScore+")"
    }
  }
  const placedCardCss=scoreWithExtraValue ? placedCard2 : placedCard1

  return (
    <span css={[placedCardMain, placedCardCss, data]}>
      <FontAwesomeIcon icon={faStar} css={scoreStyle} fill="#28B8CE"/>
      &nbsp;<span>{scoreTxt}</span>
    </span>
  )
})

const placedCardMain = css`
  position: absolute;
  width: 3.5em;
  font-size: 2.5em;
  bottom: 0.2em;
  left: initial;
  right: 0.25em;
  display: flex;
  height: 1.35em;

  > span {
    text-align: right;
    width: 1.7em;
  }
`

const placedCard1 = css`
  width: 3.5em;
`
const placedCard2 = css`
  width: 5em;
`

const scoreStyle = css`
  color: #28B8CE
`

const panelPlayerStyle = css`
  color: black;
  border-radius: 3em 1.5em 1.5em 1.5em;
  box-shadow: 0 0 0.5em black, 0 0 0.5em black;
`

const avatarStyle = css`
  position: absolute;
  top: -0.1em;
  left: 0;
  border-radius: 100%;
  height: 6em;
  width: 6em;
  color: black;
  z-index: 1;
`
const nameStyle = css`
  position: absolute;
  top: 0.3em;
  left: initial;
  right: 0.3em;
  max-width: 7.3em;
  font-size: 2.4em;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const PlayerBackground = [
  Player1,
  Player2,
  Player3,
]

const ImageDelta = [
  "-5em -4em",
  "-7em -9.5em",
  "-7em -6em"
]

const panelStyle = (playerId: PlayerId) => css`
  cursor: pointer;

  background: rgba(0, 0, 0, 0.8) url(${PlayerBackground[playerId - 1]}) no-repeat ${ImageDelta[playerId - 1]};
  background-size: 150% auto;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    left: 0;
    border-radius: 1em;
    //background-color: rgba(255, 255, 255, 0.3);
  }
`

const data = css`
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 0.1em 0.3em;
  border-radius: 0.4em;
  z-index: 2;
`

const day = css`
  position: absolute;
  top: -1em;
  left: -0.85em;
  height: 7.9em;
  width: 8.4em;
  background-size: contain;
  background-image: url(${Day});
  background-repeat: no-repeat;
`

const night = css`
  position: absolute;
  top: -1em;
  left: -0.85em;
  height: 7.9em;
  width: 8.4em;
  background-size: contain;
  background-image: url(${Night});
  background-repeat: no-repeat;
}
`

const timerStyle = css`
  position: absolute;
  bottom: 0.2em;
  left: initial;
  right: 5.5em;
  font-size: 2.5em;
`
