import { isEnumValue } from '@gamepark/rules-api'

export enum PlayerColor {
  Purple = 1,
  Orange = 2,
  Green = 3
}

export const playerColors = Object.values(PlayerColor).filter(isEnumValue)
