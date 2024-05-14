/** @jsxImportSource @emotion/react */
import { CustomMoveType } from '@gamepark/rivality/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove, /* usePlayerId, usePlayerName, useRules*/ } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'

export const ChooseTileHeader = () => {
  const left = useLegalMove(isCustomMoveType(CustomMoveType.Left))
  const top = useLegalMove(isCustomMoveType(CustomMoveType.Top))
  const right = useLegalMove(isCustomMoveType(CustomMoveType.Right))
  const bottom = useLegalMove(isCustomMoveType(CustomMoveType.Bottom))

  return <>Placez une tuile sur le plateau ou Orientez la &nbsp;
    <PlayMoveButton move={left}>&#x21a4;</PlayMoveButton>
    <PlayMoveButton move={top}>&#x21a5;</PlayMoveButton>
    <PlayMoveButton move={right}>&#x21a6;</PlayMoveButton>
    <PlayMoveButton move={bottom}>&#x21a7;</PlayMoveButton>
  </>
}
