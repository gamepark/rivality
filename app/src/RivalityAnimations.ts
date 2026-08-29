import { and, isMyMove, MaterialGameAnimations } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { isMoveItemType, isMoveItemTypeAtOnce } from '@gamepark/rules-api'

export const rivalityAnimations = new MaterialGameAnimations()

rivalityAnimations
  .configure(and(move => isMoveItemType(MaterialType.Tile)(move), isMyMove()))
  .duration(200)

rivalityAnimations
  .configure((move) => isMoveItemType(MaterialType.Golem)(move))
  .duration(600)

rivalityAnimations
  .configure((move) => isMoveItemTypeAtOnce(MaterialType.Golem)(move))
  .duration(600)

rivalityAnimations
  .configure((move) => isMoveItemType(MaterialType.Wizard)(move))
  .duration(600)
