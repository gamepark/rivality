/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Memory } from '@gamepark/rivality/rules/Memory'
import { RivalityRules } from '@gamepark/rivality/RivalityRules'
import { useTranslation } from 'react-i18next'

export const ChooseTileHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules=useRules<RivalityRules>()
  const activePlayer = rules?.game.rule?.player
  const player = usePlayerName(activePlayer)
  const selectedTile=(rules?.remind(Memory.TilePreview) !== undefined)

  if (playerId !== undefined && activePlayer === playerId) {
    if (selectedTile)
      return <>{t('header.choose.tile.you.orient')}</>
    return <>{t('header.choose.tile.you.place')}</>
  } else {
    return <>{t('header.choose.tile.player', { player })}</>
  }
}
