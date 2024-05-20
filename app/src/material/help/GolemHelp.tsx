/** @jsxImportSource @emotion/react */
//import { css } from '@emotion/react'
import { MaterialHelpProps } from '@gamepark/react-game'
import { usePlayerId, usePlayerName } from '@gamepark/react-game'
import { Golem } from '@gamepark/rivality/material/Golem'

export const GolemHelp = (props: MaterialHelpProps) => {
  const playerId = usePlayerId()

  let owner=1
  if (props.item.id==Golem.Golem1)
    owner=1
  else if (props.item.id==Golem.Golem2)
    owner=2
  else if (props.item.id==Golem.Golem3)
    owner=3

  const ownerName = usePlayerName(owner)

  let txt=""
  if (owner===playerId){
    txt="Your golem"
  } else {
    txt=ownerName+"'s golem"
  }

  return <>
      <h2>Golem</h2>
      {txt}
    </>
  }
