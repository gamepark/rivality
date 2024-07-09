/** @jsxImportSource @emotion/react */
import { MaterialHelpProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const GolemHelp = ({ item }: MaterialHelpProps) => {
  const playerId = usePlayerId()
  const { t } = useTranslation()

  const ownerName = usePlayerName(item.id)

  if (item.id === playerId) {
    return <>
      <h2>{t('help.golem')}</h2>
      {t('help.golem.you')}
    </>
  } else {
    return <>
      <h2>{t('help.golem')}</h2>
      {t('help.golem.player', { player: ownerName })}
    </>
  }
}
