import { MaterialGameAnimations } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { isMoveItemType, isMoveItemTypeAtOnce } from '@gamepark/rules-api'

export const rivalityAnimations = new MaterialGameAnimations()

rivalityAnimations.when()
  .move(move => isMoveItemType(MaterialType.Tile)(move))
  .mine()
  .duration(0.2)

rivalityAnimations.when()
  .move((move) => isMoveItemType(MaterialType.Golem)(move))
  .duration(0.6)

rivalityAnimations.when()
  .move((move) => isMoveItemTypeAtOnce(MaterialType.Golem)(move))
  .duration(0.6)

rivalityAnimations.when()
  .move((move) => isMoveItemType(MaterialType.Wizard)(move))
  .duration(0.6)
