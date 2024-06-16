/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CustomMoveType } from '@gamepark/rivality/rules/CustomMoveType'
import { RivalityRules } from '@gamepark/rivality/RivalityRules'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'

export const ValidateTileHeader = () => {
  const cancel = useLegalMove(isCustomMoveType(CustomMoveType.Cancel))
  const validate = useLegalMove(isCustomMoveType(CustomMoveType.Validate))
  const rotate = useLegalMove(isCustomMoveType(CustomMoveType.RotateClockwise))

  const { t } = useTranslation()
  const playerId = usePlayerId()
  const activePlayer = useRules<RivalityRules>()?.game.rule?.player
  const player = usePlayerName(activePlayer)

  if (playerId !== undefined && activePlayer === playerId) {
    return <>
      <PlayMoveButton move={rotate}><div css={rotateCharCss}>&#10550;</div></PlayMoveButton>
      &nbsp;
      <PlayMoveButton move={cancel}>{t('header.cancel')}</PlayMoveButton>
      &nbsp;
      <PlayMoveButton move={validate}>{t('header.validate')}</PlayMoveButton>
    </>
  } else {
    return <>{player} valide son choix</>
  }
}

const rotateCharCss=css`
  transform: rotate(-90deg);
  transform-origin: 5 5;
`
