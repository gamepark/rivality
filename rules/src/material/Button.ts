import { isEnumValue } from '@gamepark/rules-api'

export enum Button {
  Rotator  = 1,
  Validate = 2,
  Cancel   = 3,
  ChooseSpellNorth = 4,
  ChooseSpellEast  = 5,
  ChooseSpellSouth = 6,
  ChooseSpellWest  = 7,
  RemoveGolem1 = 8,
  RemoveGolem2 = 9,
  RemoveGolem3 = 10
}

export const buttons = Object.values(Button).filter(isEnumValue)
