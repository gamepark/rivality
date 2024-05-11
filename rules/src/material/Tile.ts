import { isEnumValue } from '@gamepark/rules-api'

export enum Tile {
  WellOfMana = 1,
  StoneCircle_x_41,
  StoneCircle_31_11,
  StoneCircle_11_31,
  StoneCircle_12_31,
  StoneCircle_31_12,
  StoneCircle_11_32,
  StoneCircle_32_11,
  StoneCircle_22_22,
  Cottage_12_21_23B,
  Cottage_23B_12_21,
  Cottage_22_23B_11,
  Cottage_31_23B_x,
  Cottage_11_23B_22,
  Cottage_23B_31_x,
  Cottage_32_23B_x,
  Cottage_23B_32_x,
  Fortress_21_23B_22,
  Fortress_22_13B_31,
  Fortress_23B_22_22,
  Fortress_31_22_13B,
  Fortress_22_23B_21,
  Fortress_22_22_23B
}

export const tiles = Object.values(Tile).filter(isEnumValue)
