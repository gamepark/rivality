/** @jsxImportSource @emotion/react */
import { CustomMoveType } from '@gamepark/rivality/rules/CustomMoveType'
import { RivalityRules } from '@gamepark/rivality/RivalityRules'
import { PlayMoveButton, useLegalMove, usePlayerName, usePlayerId, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
//import { Trans, useTranslation } from 'react-i18next'

export const AskSpellOrientationHeader = () => {
  const north = useLegalMove(isCustomMoveType(CustomMoveType.North))
  const east  = useLegalMove(isCustomMoveType(CustomMoveType.East))
  const south = useLegalMove(isCustomMoveType(CustomMoveType.South))
  const west  = useLegalMove(isCustomMoveType(CustomMoveType.West))

//  const { t } = useTranslation()
  const playerId = usePlayerId()
  const activePlayer = useRules<RivalityRules>()?.game.rule?.player
  const player = usePlayerName(activePlayer)

  if (playerId !== undefined && activePlayer === playerId) {
    return <>
      Choisissez la direction du sort à appliquer
      <PlayMoveButton move={north}>&#8593;</PlayMoveButton>
      <PlayMoveButton move={east}>&#8594;</PlayMoveButton>
      <PlayMoveButton move={south}>&#8595;</PlayMoveButton>
      <PlayMoveButton move={west}>&#8592;</PlayMoveButton>
    </>

/*
    return <><Trans defaults="header.ask.golem.removal.you"></Trans>:
    <PlayMoveButton move={p1}>{name1}</PlayMoveButton>
    <PlayMoveButton move={p2}>{name2}</PlayMoveButton>
    <PlayMoveButton move={p3}>{name3}</PlayMoveButton>
    </>
*/
  } else {
    return <>Orientation du sort demandé au joueur {player}</>
//    return <>{t('header.ask.golem.removal.player', { player })}</>
  }
}
