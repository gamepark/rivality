/** @jsxImportSource @emotion/react */
import { CustomMoveType } from '@gamepark/rivality/rules/CustomMoveType'
import { RivalityRules } from '@gamepark/rivality/RivalityRules'
import { PlayMoveButton, useLegalMove, usePlayerName, usePlayerId, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const AskGolemRemovalHeader = () => {
  const p1 = useLegalMove(isCustomMoveType(CustomMoveType.Player1))
  const p2 = useLegalMove(isCustomMoveType(CustomMoveType.Player2))
  const p3 = useLegalMove(isCustomMoveType(CustomMoveType.Player3))

  const name1=usePlayerName(1)
  const name2=usePlayerName(2)
  const name3=usePlayerName(3)

  const { t } = useTranslation()
  const playerId = usePlayerId()
  const activePlayer = useRules<RivalityRules>()?.game.rule?.player
  const player = usePlayerName(activePlayer)

  if (playerId !== undefined && activePlayer === playerId) {
    return <><Trans defaults="header.ask.golem.removal.you"></Trans>:
    <PlayMoveButton move={p1}>{name1}</PlayMoveButton>
    <PlayMoveButton move={p2}>{name2}</PlayMoveButton>
    <PlayMoveButton move={p3}>{name3}</PlayMoveButton>
    </>
  } else {
    return <>{t('header.ask.golem.removal.player', { player })}</>
  }

}
