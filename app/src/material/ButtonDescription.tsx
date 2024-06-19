/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button } from '@gamepark/rivality/material/Button'
import { ItemContext, TokenDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialItem } from '@gamepark/rules-api'
import { RuleId } from '@gamepark/rivality/rules/RuleId'
import Rotator from '../images/icon/rotator.png'
import Validate from '../images/icon/validate.png'
import Cancel from '../images/icon/cancel.png'

export class ButtonDescription extends TokenDescription  {
  width=3
  height=3
  borderRadius = 1.5
  images = {
    [Button.Rotator]: Rotator,
    [Button.Validate]: Validate,
    [Button.Cancel]: Cancel
  }

  getItemExtraCss(item: MaterialItem, context: ItemContext){
    const me=context.player
    if (me!==undefined &&
        context.rules.isTurnToPlay(me)){
          const currentRule:RuleId|undefined=context.rules.game.rule?.id
          if (currentRule!==undefined){
            if (
              // Display the rotator button next to player's hand on tile selection step
              (item.location.type===LocationType.Board &&
               currentRule===RuleId.ValidateTile) ||

              // Display the rotator button on board at validation step
              (item.location.type===LocationType.PlayerButton &&
               currentRule===RuleId.ChooseTile)
            ){
              return showCss
            }
          }
    }
    return hiddenCss
  }
}

const showCss=css``
const hiddenCss=css`visibility: hidden;`

export const buttonDescription = new ButtonDescription()
