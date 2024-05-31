/** @jsxImportSource @emotion/react */
import { CustomMoveType } from '@gamepark/rivality/rules/CustomMoveType'
import { RivalityRules } from '@gamepark/rivality/RivalityRules'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'

export const ChooseTileHeader = () => {
  const left = useLegalMove(isCustomMoveType(CustomMoveType.Left))
  const top = useLegalMove(isCustomMoveType(CustomMoveType.Top))
  const right = useLegalMove(isCustomMoveType(CustomMoveType.Right))
  const bottom = useLegalMove(isCustomMoveType(CustomMoveType.Bottom))

  const { t } = useTranslation()
  const playerId = usePlayerId()
  const activePlayer = useRules<RivalityRules>()?.game.rule?.player
  const player = usePlayerName(activePlayer)

  if (playerId !== undefined && activePlayer === playerId) {
    return <>{t('header.choose.tile.you')} &nbsp;
      <PlayMoveButton move={left}>&#x21a4;</PlayMoveButton>
      <PlayMoveButton move={top}>&#x21a5;</PlayMoveButton>
      <PlayMoveButton move={right}>&#x21a6;</PlayMoveButton>
      <PlayMoveButton move={bottom}>&#x21a7;</PlayMoveButton>
    </>
  } else {
    return <>{t('header.choose.tile.player', { player })}</>
  }
}
