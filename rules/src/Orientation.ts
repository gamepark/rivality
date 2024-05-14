import { isEnumValue } from '@gamepark/rules-api'

export enum Orientation {
  North = 1,
  East  = 2,
  South = 3,
  West  = 4
}

export const orientations = Object.values(Orientation).filter(isEnumValue)
