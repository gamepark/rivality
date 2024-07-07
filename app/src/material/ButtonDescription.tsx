/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button } from '@gamepark/rivality/material/Button'
import { ItemContext, TokenDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialItem } from '@gamepark/rules-api'
import { Memory } from '@gamepark/rivality/rules/Memory'
import { RuleId } from '@gamepark/rivality/rules/RuleId'
//import Cancel from '../images/icon/cancel.png'
//import RemoveGolem1 from '../images/icon/no_golem1.png'
//import RemoveGolem2 from '../images/icon/no_golem2.png'
//import RemoveGolem3 from '../images/icon/no_golem3.png'
//import Rotator from '../images/icon/rotator.png'
import Validate from '../images/icon/validate.png'

export class ButtonDescription extends TokenDescription  {
  width=3
  height=3
  borderRadius = 1.5
  images = {
//    [Button.Rotator]: Rotator,
//    [Button.Validate]: Validate,
//    [Button.Cancel]: Cancel,
    [Button.ChooseSpellNorth]: Validate,
    [Button.ChooseSpellEast]: Validate,
    [Button.ChooseSpellSouth]: Validate,
    [Button.ChooseSpellWest]: Validate,
//    [Button.RemoveGolem1]: RemoveGolem1,
//    [Button.RemoveGolem2]: RemoveGolem2,
//    [Button.RemoveGolem3]: RemoveGolem3
  }

  getItemExtraCss(item: MaterialItem, context: ItemContext){
    const me=context.player
    if (me!==undefined &&
        context.rules.isTurnToPlay(me)){
          const currentRule:RuleId|undefined=context.rules.game.rule?.id
          if (currentRule!==undefined){
            // TODO - Rely on rules to know if a move is possible or not

            if (
              // Display the buttons next to player's hand on tile selection step
              (item.location.type===LocationType.PlayerButton &&
               currentRule===RuleId.ChooseTile) ||

              (item.location.type===LocationType.Board &&
                (
                  // Display the buttons on board at spell orientation selection step
                  (
                    currentRule===RuleId.AskSpellOrientation &&
                    item.id===Button.ChooseSpellNorth &&
                    context.rules.remind(Memory.AppliedSpellNorth)!==true
                  ) ||
                  (
                    currentRule===RuleId.AskSpellOrientation &&
                    item.id===Button.ChooseSpellEast &&
                    context.rules.remind(Memory.AppliedSpellEast)!==true
                  ) ||
                  (
                    currentRule===RuleId.AskSpellOrientation &&
                    item.id===Button.ChooseSpellSouth &&
                    context.rules.remind(Memory.AppliedSpellSouth)!==true
                  ) ||
                  (
                    currentRule===RuleId.AskSpellOrientation &&
                    item.id===Button.ChooseSpellWest &&
                    context.rules.remind(Memory.AppliedSpellWest)!==true
                  ) ||

                  // Display the buttons on board at golem selection step
                  (
                    currentRule===RuleId.AskGolemRemoval &&
                    (
                      item.id===Button.RemoveGolem1 ||
                      item.id===Button.RemoveGolem2 ||
                      item.id===Button.RemoveGolem3
                    )
                  )
                )
              )
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
