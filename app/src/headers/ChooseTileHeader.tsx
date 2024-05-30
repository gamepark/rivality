/** @jsxImportSource @emotion/react */
import { CustomMoveType } from '@gamepark/rivality/rules/CustomMoveType'
import { RivalityRules } from '@gamepark/rivality/RivalityRules'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'

export const ChooseTileHeader = () => {
  const left = useLegalMove(isCustomMoveType(CustomMoveType.Left))
  const top = useLegalMove(isCustomMoveType(CustomMoveType.Top))
  const right = useLegalMove(isCustomMoveType(CustomMoveType.Right))
  const bottom = useLegalMove(isCustomMoveType(CustomMoveType.Bottom))

//  const { t } = useTranslation()
  const playerId = usePlayerId()
  const activePlayer = useRules<RivalityRules>()?.game.rule?.player
  const player = usePlayerName(activePlayer)

  if (playerId !== undefined && activePlayer === playerId) {
    return <>Placez une tuile dans le Champ de Bataille ou Orientez la &nbsp;
      <PlayMoveButton move={left}>&#x21a4;</PlayMoveButton>
      <PlayMoveButton move={top}>&#x21a5;</PlayMoveButton>
      <PlayMoveButton move={right}>&#x21a6;</PlayMoveButton>
      <PlayMoveButton move={bottom}>&#x21a7;</PlayMoveButton>
    </>
  } else {
    return <>{ player } doit placer une tuile dans le Champ de Bataille</>
//    return <>{t('header.acquire-legend.player', { player })}</>
  }
}
