/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Picture, PlayMoveButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { PlayerColor } from '@gamepark/rivality/PlayerColor'
import { RivalityRules } from '@gamepark/rivality/RivalityRules'
import { CustomMoveType } from '@gamepark/rivality/rules/CustomMoveType'
import { CustomMove, isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import removeGolem1Icon from '../images/icon/no_golem1b.png'
import removeGolem2Icon from '../images/icon/no_golem2b.png'
import removeGolem3Icon from '../images/icon/no_golem3b.png'

export const AskGolemRemovalHeader = () => {
  const choosePlayerMoves = useLegalMoves<CustomMove>(isCustomMoveType(CustomMoveType.ChoosePlayer))

  const { t } = useTranslation()
  const playerId = usePlayerId()
  const activePlayer = useRules<RivalityRules>()?.game.rule?.player
  const player = usePlayerName(activePlayer)

  if (playerId !== undefined && activePlayer === playerId) {
    return <><Trans defaults="header.ask.golem.removal.you"></Trans>&nbsp;
    {choosePlayerMoves.map(move =>
      <PlayMoveButton move={move}>
        <Picture css={iconCss} src={playerGolemRemoveIcon[move.data]}/>
      </PlayMoveButton>
    )}
    </>
  } else {
    return <>{t('header.ask.golem.removal.player', { player })}</>
  }
}

const playerGolemRemoveIcon: Record<PlayerColor, string> = {
  [PlayerColor.Purple]: removeGolem1Icon,
  [PlayerColor.Orange]: removeGolem2Icon,
  [PlayerColor.Green]: removeGolem3Icon
}

const iconCss=css`
  vertical-align: top;
  max-height: 1em;
`
