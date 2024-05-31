/** @jsxImportSource @emotion/react */
import { CustomMoveType } from '@gamepark/rivality/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'

export const StartHeader = () => {
  const keep = useLegalMove(isCustomMoveType(CustomMoveType.KeepHand))
  const change = useLegalMove(isCustomMoveType(CustomMoveType.NewHand))

  const { t } = useTranslation()
  return <>
    {t('header.start.1')}
    &nbsp;
    <PlayMoveButton move={keep}>{t('header.start.2')}</PlayMoveButton>
    &nbsp;
    {t('header.start.3')}
    &nbsp;
    <PlayMoveButton move={change}>{t('header.start.4')}</PlayMoveButton>
  </>
}
