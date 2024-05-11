import { isEnumValue } from "@gamepark/rules-api"

export enum BoardSpace {
  Tile   = 1,
  Golem  = 2,
  Wizard = 3
}

export const boardSpaces = Object.values(BoardSpace).filter(isEnumValue)
