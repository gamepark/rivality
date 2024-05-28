/** @jsxImportSource @emotion/react */
import { CustomMoveType } from '@gamepark/rivality/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove, usePlayerName, /* usePlayerId, useRules*/ } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'

export const AskGolemRemovalHeader = () => {
  const p1 = useLegalMove(isCustomMoveType(CustomMoveType.Player1))
  const p2 = useLegalMove(isCustomMoveType(CustomMoveType.Player2))
  const p3 = useLegalMove(isCustomMoveType(CustomMoveType.Player3))

  const name1=usePlayerName(1)
  const name2=usePlayerName(2)
  const name3=usePlayerName(3)

  return <>Choisissez à qui retirer un golem:
  <PlayMoveButton move={p1}>{name1}</PlayMoveButton>
  <PlayMoveButton move={p2}>{name2}</PlayMoveButton>
  <PlayMoveButton move={p3}>{name3}</PlayMoveButton>
  </>
}
