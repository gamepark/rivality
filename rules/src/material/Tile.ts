import { isEnumValue } from '@gamepark/rules-api'

export enum Tile {
  WellOfMana         =  1,
  StoneCircle_x_41   =  2,
  StoneCircle_x_41_star =  3,
  StoneCircle_31_11  =  4,
  StoneCircle_11_31  =  5,
  StoneCircle_12_31  =  6,
  StoneCircle_31_12  =  7,
  StoneCircle_11_32  =  8,
  StoneCircle_32_11  =  9,
  StoneCircle_21_22  = 10,
  StoneCircle_22_21  = 11,
  Cottage_12_21_23B  = 12,
  Cottage_23B_12_21  = 13,
  Cottage_22_23B_11  = 14,
  Cottage_31_23B_x   = 15,
  Cottage_11_23B_22  = 16,
  Cottage_23B_31_x   = 17,
  Cottage_32_23B_x   = 18,
  Cottage_23B_32_x   = 19,
  Fortress_21_23B_22 = 20,
  Fortress_22_13B_31 = 21,
  Fortress_23B_22_22 = 22,
  Fortress_31_22_13B = 23,
  Fortress_22_23B_21 = 24,
  Fortress_22_22_23B = 25
}

export const tiles = Object.values(Tile).filter(isEnumValue)
