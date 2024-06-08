/** @jsxImportSource @emotion/react */
import { MaterialHelpProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { Golem } from '@gamepark/rivality/material/Golem'

export const GolemHelp = (props: MaterialHelpProps) => {
  const playerId = usePlayerId()
  const { t } = useTranslation()

  let owner=1
  if (props.item.id===Golem.Golem1)
    owner=1
  else if (props.item.id===Golem.Golem2)
    owner=2
  else if (props.item.id===Golem.Golem3)
    owner=3

  const ownerName = usePlayerName(owner)

  if (owner===playerId){
    return <>
      <h2>{t('Golem')}</h2>
      {t('help.golem.you')}
    </>
  } else {
    return <>
      <h2>{t('Golem')}</h2>
      {t('help.golem.player', {player: ownerName})}
    </>
  }
}
