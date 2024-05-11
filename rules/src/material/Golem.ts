import { isEnumValue } from '@gamepark/rules-api'

export enum Golem {
  Golem1  = 1, // Purple
  Golem2  = 2, // Salmon
  Golem3  = 3  // Green
}

export const golems = Object.values(Golem).filter(isEnumValue)
