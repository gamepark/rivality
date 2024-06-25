import { MaterialGameAnimations } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { isMoveItemType } from '@gamepark/rules-api'

export const rivalityAnimations = new MaterialGameAnimations()

rivalityAnimations.when().move(move => isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.Board).mine().none()