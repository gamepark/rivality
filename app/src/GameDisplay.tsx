/** @jsxImportSource @emotion/react */
//import { css } from '@emotion/react'
import { GameTable, GameTableNavigation, usePlayers } from '@gamepark/react-game'
import { FC } from 'react'
import { PlayerPanels } from './panels/PlayerPanels'
import { tableDesign } from './locators/position/TableDesign'

type GameDisplayProps = {
  players: number
}

export const GameDisplay: FC<GameDisplayProps> = () => {
  const players = usePlayers()
  if (!players.length) return null;
  const tableSize = tableDesign.getTableSize(players.length)
  return <>
    <GameTable { ...tableSize }
               verticalCenter
               //css={css`background-color: rgba(255, 255, 255, 0.4)`}
               margin={{ top: 7, left: 0, right: 30, bottom: 0 }}>
      <GameTableNavigation/>
      <PlayerPanels/>
    </GameTable>
  </>
}
