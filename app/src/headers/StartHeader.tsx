/** @jsxImportSource @emotion/react */
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/rivality/rules/CustomMoveType'
import { RivalityRules } from '@gamepark/rivality/RivalityRules'
import { useTranslation } from 'react-i18next'

export const StartHeader = () => {
  const keep = useLegalMove(isCustomMoveType(CustomMoveType.KeepHand))
  const change = useLegalMove(isCustomMoveType(CustomMoveType.NewHand))

  const { t } = useTranslation()
  const playerId = usePlayerId()
  const activePlayer = useRules<RivalityRules>()?.game.rule?.player
  const player = usePlayerName(activePlayer)

  if (playerId !== undefined && activePlayer === playerId) {
    return <>
      {t('header.start.1')}
      &nbsp;
      <PlayMoveButton move={keep}>{t('header.start.2')}</PlayMoveButton>
      &nbsp;
      {t('header.start.3')}
      &nbsp;
      <PlayMoveButton move={change}>{t('header.start.4')}</PlayMoveButton>
    </>
  } else {
    return <>{t('header.start.player', { player })}</>
  }
}
