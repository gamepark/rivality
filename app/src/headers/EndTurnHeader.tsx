/** @jsxImportSource @emotion/react */
import { RivalityRules } from '@gamepark/rivality/RivalityRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const EndTurnHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const activePlayer = useRules<RivalityRules>()?.game.rule?.player
  const player = usePlayerName(activePlayer)

  if (playerId !== undefined && activePlayer === playerId) {
    return <>{t('header.end.turn.you')}</>
  } else {
    return <>{t('header.end.turn.player', { player })}</>
  }
}
