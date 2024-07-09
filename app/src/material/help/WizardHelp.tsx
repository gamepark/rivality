/** @jsxImportSource @emotion/react */
import { MaterialHelpProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const WizardHelp = ({item}: MaterialHelpProps) => {
  const playerId = usePlayerId()
  const { t } = useTranslation()

  const ownerName = usePlayerName(item.id)

  if (item.id===playerId){
    return <>
      <h2>{t('help.wizard')}</h2>
      {t('help.wizard.you')}
    </>
  } else {
    return <>
      <h2>{t('help.wizard')}</h2>
      {t('help.wizard.player', {player: ownerName})}
    </>
  }
}
