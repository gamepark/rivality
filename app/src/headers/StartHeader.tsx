/** @jsxImportSource @emotion/react */
import { CustomMoveType } from '@gamepark/rivality/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'

export const StartHeader = () => {
  const keep = useLegalMove(isCustomMoveType(CustomMoveType.KeepHand))
  const change = useLegalMove(isCustomMoveType(CustomMoveType.NewHand))

  return <>
  Mulligan - Je veux
  &nbsp;
  <PlayMoveButton move={keep}>garder ma main</PlayMoveButton>
  &nbsp;
  ou
  &nbsp;
  <PlayMoveButton move={change}>changer ma main</PlayMoveButton>
  </>
}
