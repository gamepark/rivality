import { isEnumValue } from '@gamepark/rules-api'

export enum Wizard {
  Wizard1  = 1, // Purple
  Wizard2  = 2, // Salmon
  Wizard3  = 3  // Green
}

export const wizards = Object.values(Wizard).filter(isEnumValue)
