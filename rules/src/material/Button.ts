import { isEnumValue } from '@gamepark/rules-api'

export enum Button {
  Rotator  = 1,
  Validate = 2,
  Cancel   = 3
}

export const buttons = Object.values(Button).filter(isEnumValue)
