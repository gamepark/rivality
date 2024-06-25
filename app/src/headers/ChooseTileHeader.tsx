/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { RivalityRules } from '@gamepark/rivality/RivalityRules'
import { useTranslation } from 'react-i18next'

export const ChooseTileHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const activePlayer = useRules<RivalityRules>()?.game.rule?.player
  const player = usePlayerName(activePlayer)

  if (playerId !== undefined && activePlayer === playerId) {
    return <>{t('header.choose.tile.you')}</>
  } else {
    return <>{t('header.choose.tile.player', { player })}</>
  }
}
