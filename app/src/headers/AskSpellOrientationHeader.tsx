/** @jsxImportSource @emotion/react */
import { PlayMoveButton, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Orientation, orientations } from '@gamepark/rivality/Orientation'
import { RivalityRules } from '@gamepark/rivality/RivalityRules'
import { CustomMoveType } from '@gamepark/rivality/rules/CustomMoveType'
import { MoveKind } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const AskSpellOrientationHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const activePlayer = useRules<RivalityRules>()?.game.rule?.player
  const player = usePlayerName(activePlayer)

  if (playerId !== undefined && activePlayer === playerId) {
    return <>
      <Trans defaults="header.choose.spell.orientation.you"></Trans>
      {orientations.map(orientation => <>
        &nbsp;
        <PlayMoveButton
          move={{ kind: MoveKind.CustomMove, type: CustomMoveType.ChooseOrientation, data: orientation }}>{orientationChar[orientation]}</PlayMoveButton>
      </>)}
    </>
  } else {
    return <>{t('header.choose.spell.orientation.player', { player })}</>
  }
}

const orientationChar: Record<Orientation, string> = {
  [Orientation.North]: '↑',
  [Orientation.East]: '→',
  [Orientation.South]: '↓',
  [Orientation.West]: '←'
}
