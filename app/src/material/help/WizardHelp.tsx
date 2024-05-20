/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { usePlayerId, usePlayerName } from '@gamepark/react-game'
import { Wizard } from '@gamepark/rivality/material/Wizard'

export const WizardHelp = (props: MaterialHelpProps) => {
  const playerId = usePlayerId()

  let owner=1
  if (props.item.id==Wizard.Wizard1)
    owner=1
  else if (props.item.id==Wizard.Wizard2)
    owner=2
  else if (props.item.id==Wizard.Wizard3)
    owner=3

  const ownerName = usePlayerName(owner)

  let txt=""
  if (owner===playerId){
    txt="Your wizard"
  } else {
    txt=ownerName+"'s wizard"
  }

  return <>
      <h2>Wizard</h2>
      {txt}
    </>
  }
