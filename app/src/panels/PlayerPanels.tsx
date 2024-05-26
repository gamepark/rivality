/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayerColor } from '@gamepark/rivality/PlayerColor'
import { PlayerPanel, usePlayers, useRules } from '@gamepark/react-game'
import { RivalityRules } from '@gamepark/rivality/RivalityRules'
import { FC } from 'react'
import { createPortal } from 'react-dom'

export const PlayerPanels: FC<any> = () => {
  const players = usePlayers({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) =>
        <PlayerPanel key={player.id} playerId={player.id} color={playerColorCode[player.id]} css={panelPosition(index)}>
          <Score player={player.id}/>
        </PlayerPanel>
      )}
    </>,
    root
  )
}

const Score: FC<any> = (props) => {
  const { player } = props
  const rules = useRules<RivalityRules>()!

  if (!rules?.isOver()) return <></>
  const score=rules.getScore(player)

  return <div><span css={vpText(score)}>{score}</span></div>
}

const panelPosition = (index: number) => css`
  position: absolute;
  right: 1em;
  top: ${8.5 + index * 16}em;
  width: 28em;
  height: 14em;
`

const vpText = (score = 0) => css`
  font-size: ${score < 100 ? 3 : 2.4}em;
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
  font-weight: bold;
`

export const playerColorCode: Record<PlayerColor, string> = {
  [PlayerColor.Red]: 'red',
  [PlayerColor.Blue]: 'blue',
  [PlayerColor.Green]: 'green',
  [PlayerColor.Yellow]: 'yellow'
}
