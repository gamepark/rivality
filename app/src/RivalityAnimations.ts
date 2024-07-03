import { MaterialGameAnimations } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { isMoveItemType } from '@gamepark/rules-api'

export const rivalityAnimations = new MaterialGameAnimations()

rivalityAnimations.when().move(move => isMoveItemType(MaterialType.Tile)(move)).mine().duration(0.2)