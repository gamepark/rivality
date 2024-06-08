/** @jsxImportSource @emotion/react */
import { MaterialHelpProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { Wizard } from '@gamepark/rivality/material/Wizard'

export const WizardHelp = (props: MaterialHelpProps) => {
  const playerId = usePlayerId()
  const { t } = useTranslation()

  let owner=1
  if (props.item.id===Wizard.Wizard1)
    owner=1
  else if (props.item.id===Wizard.Wizard2)
    owner=2
  else if (props.item.id===Wizard.Wizard3)
    owner=3

  const ownerName = usePlayerName(owner)

  if (owner===playerId){
    return <>
      <h2>{t('Wizard')}</h2>
      {t('help.wizard.you')}
    </>
  } else {
    return <>
      <h2>{t('Wizard')}</h2>
      {t('help.wizard.player', {player: ownerName})}
    </>
  }
}
