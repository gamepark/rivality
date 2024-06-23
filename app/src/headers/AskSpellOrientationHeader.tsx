/** @jsxImportSource @emotion/react */
import { CustomMoveType } from '@gamepark/rivality/rules/CustomMoveType'
import { RivalityRules } from '@gamepark/rivality/RivalityRules'
import { PlayMoveButton, useLegalMove, usePlayerName, usePlayerId, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const AskSpellOrientationHeader = () => {
  const north = useLegalMove(isCustomMoveType(CustomMoveType.North))
  const east  = useLegalMove(isCustomMoveType(CustomMoveType.East))
  const south = useLegalMove(isCustomMoveType(CustomMoveType.South))
  const west  = useLegalMove(isCustomMoveType(CustomMoveType.West))

  const { t } = useTranslation()
  const playerId = usePlayerId()
  const activePlayer = useRules<RivalityRules>()?.game.rule?.player
  const player = usePlayerName(activePlayer)

  if (playerId !== undefined && activePlayer === playerId) {
    return <>
      <Trans defaults="header.choose.spell.orientation.you"></Trans>&nbsp;
      <PlayMoveButton move={north}>&#8593;</PlayMoveButton>
      &nbsp;
      <PlayMoveButton move={east}>&#8594;</PlayMoveButton>
      &nbsp;
      <PlayMoveButton move={south}>&#8595;</PlayMoveButton>
      &nbsp;
      <PlayMoveButton move={west}>&#8592;</PlayMoveButton>
    </>
  } else {
    return <>{t('header.choose.spell.orientation.player', { player })}</>
  }
}
