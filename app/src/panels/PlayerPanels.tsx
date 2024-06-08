/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayerId } from '@gamepark/rivality/PlayerId'
import { getRelativePlayerIndex, /* PlayerPanel, /*usePlayers,*/ useMaterialContext /*, useRules*/ } from '@gamepark/react-game'
import { FC } from 'react'
import { createPortal } from 'react-dom'
import { Corner, tableDesign } from '../locators/position/TableDesign'
import { RivalityPlayerPanel } from './RivalityPlayerPanel'

export const PlayerPanels: FC<{players:number[]}> = ({players}) => {
  const context=useMaterialContext()
  const nbPlayers=players.length
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player) => {
        const relativeIndex = getRelativePlayerIndex(context, player)
        const corner=tableDesign.playerCorner(player, relativeIndex, nbPlayers)
        return <RivalityPlayerPanel key={player} playerId={player} css={panelPosition(corner)}/>
      }
      )}
    </>,
    root
  )
}

const panelPosition = (corner: Corner) => {
  if (corner===Corner.BottomLeft)
    return css`
    position: absolute;
    left: 1em;
    bottom: 2em;
    width: 28em;
    height: 9em;
    `
  if (corner===Corner.TopLeft)
    return css`
    position: absolute;
    left: 1em;
    top: 9em;
    width: 28em;
    height: 9em;
    `
  if (corner===Corner.TopRight)
    return css`
    position: absolute;
    right: 1em;
    top: 9em;
    width: 28em;
    height: 9em;
    `
  // BottomRight
  return css`
  position: absolute;
  right: 1em;
  bottom: 2em;
  width: 28em;
  height: 9em;
  `
}

export const playerColorCode: Record<PlayerId, string> = {
  1: 'blue',
  2: 'green',
  3: 'yellow',
  4: 'red'
}
