/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button } from '@gamepark/rivality/material/Button'
import { ItemContext, TokenDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialItem } from '@gamepark/rules-api'
import { Memory } from '@gamepark/rivality/rules/Memory'
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
    [Button.Cancel]: Cancel,
    [Button.ChooseSpellNorth]: Validate,
    [Button.ChooseSpellEast]: Validate,
    [Button.ChooseSpellSouth]: Validate,
    [Button.ChooseSpellWest]: Validate
  }

  getItemExtraCss(item: MaterialItem, context: ItemContext){
    const me=context.player
    if (me!==undefined &&
        context.rules.isTurnToPlay(me)){
          const currentRule:RuleId|undefined=context.rules.game.rule?.id
          if (currentRule!==undefined){
            // TODO - Rely on rules to know if a move is possible or not

            if (
              // Display the buttons on board at validation step
              (item.location.type===LocationType.Board &&
               currentRule===RuleId.ValidateTile) ||

              // Display the buttons next to player's hand on tile selection step
              (item.location.type===LocationType.PlayerButton &&
               currentRule===RuleId.ChooseTile) ||

              // Display the buttons on board at spell orientation selection step
              (item.location.type===LocationType.Board &&
               currentRule===RuleId.AskSpellOrientation &&
               item.id==Button.ChooseSpellNorth &&
               context.rules.remind(Memory.AppliedSpellNorth)!==true) ||

              (item.location.type===LocationType.Board &&
               currentRule===RuleId.AskSpellOrientation &&
               item.id==Button.ChooseSpellEast &&
               context.rules.remind(Memory.AppliedSpellEast)!==true) ||

              (item.location.type===LocationType.Board &&
               currentRule===RuleId.AskSpellOrientation &&
               item.id==Button.ChooseSpellSouth &&
               context.rules.remind(Memory.AppliedSpellSouth)!==true) ||

              (item.location.type===LocationType.Board &&
               currentRule===RuleId.AskSpellOrientation &&
               item.id==Button.ChooseSpellWest &&
               context.rules.remind(Memory.AppliedSpellWest)!==true)
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
