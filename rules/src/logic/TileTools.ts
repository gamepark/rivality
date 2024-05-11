//import { LocationType } from '../material/LocationType'
//import { MaterialType } from '../material/MaterialType'
import { Tile } from '../material/Tile'

export class Spell {
  nbGolems:number
  distance:number

  constructor(nbGolems:number, distance:number){
    this.nbGolems=nbGolems
    this.distance=distance
  }
}

export class TileTools {
  nbProtectionShields(tile:Tile){
    if ((tile==Tile.WellOfMana) ||
        (tile==Tile.StoneCircle_x_41) ||
        (tile==Tile.StoneCircle_31_11) ||
        (tile==Tile.StoneCircle_11_31) ||
        (tile==Tile.StoneCircle_12_31) ||
        (tile==Tile.StoneCircle_31_12) ||
        (tile==Tile.StoneCircle_11_32) ||
        (tile==Tile.StoneCircle_32_11) ||
        (tile==Tile.StoneCircle_22_22)
      ) return 0
    if ((tile==Tile.Cottage_12_21_23B) ||
        (tile==Tile.Cottage_23B_12_21) ||
        (tile==Tile.Cottage_22_23B_11) ||
        (tile==Tile.Cottage_31_23B_x) ||
        (tile==Tile.Cottage_11_23B_22) ||
        (tile==Tile.Cottage_23B_31_x) ||
        (tile==Tile.Cottage_32_23B_x) ||
        (tile==Tile.Cottage_23B_32_x)
      ) return 1
    if ((tile==Tile.Fortress_21_23B_22) ||
        (tile==Tile.Fortress_22_13B_31) ||
        (tile==Tile.Fortress_23B_22_22) ||
        (tile==Tile.Fortress_31_22_13B) ||
        (tile==Tile.Fortress_22_23B_21) ||
        (tile==Tile.Fortress_22_22_23B)
    ) return 2
    console.log("*** ERROR - Unsupported tile")
    return 0
  }

  // -1 means one card for each deck
  // 0 means card out of deck (well of mana)
  // 1 means 1st deck
  // 2 means 2nd deck
  tileDeck(tile:Tile){
    if ((tile==Tile.StoneCircle_22_22) ||
        (tile==Tile.StoneCircle_x_41)
      ) return -1
    if (tile==Tile.WellOfMana)
      return 0

    // Non-star deck
    if (
        (tile==Tile.StoneCircle_32_11) ||
        (tile==Tile.StoneCircle_31_12) ||
        (tile==Tile.StoneCircle_31_11) ||
        (tile==Tile.Cottage_11_23B_22) ||
        (tile==Tile.Cottage_23B_31_x) ||
        (tile==Tile.Cottage_23B_32_x) ||
        (tile==Tile.Cottage_23B_12_21) ||
        (tile==Tile.Fortress_22_22_23B) ||
        (tile==Tile.Fortress_31_22_13B) ||
        (tile==Tile.Fortress_21_23B_22)
      ) return 1

    // Star deck
    if (
        (tile==Tile.StoneCircle_11_32) ||
        (tile==Tile.StoneCircle_12_31) ||
        (tile==Tile.StoneCircle_11_31) ||
        (tile==Tile.Cottage_32_23B_x) ||
        (tile==Tile.Cottage_12_21_23B) ||
        (tile==Tile.Cottage_22_23B_11) ||
        (tile==Tile.Cottage_31_23B_x) ||
        (tile==Tile.Fortress_22_13B_31) ||
        (tile==Tile.Fortress_23B_22_22) ||
        (tile==Tile.Fortress_22_23B_21)
      ) return 2

    console.log("*** ERROR - Unsupported tile")
    return 0
  }

  isFortress(tile:Tile){
    if ((tile==Tile.Fortress_22_22_23B) ||
        (tile==Tile.Fortress_31_22_13B) ||
        (tile==Tile.Fortress_21_23B_22) ||
        (tile==Tile.Fortress_22_13B_31) ||
        (tile==Tile.Fortress_23B_22_22) ||
        (tile==Tile.Fortress_22_23B_21)
      ) return true
    if ((tile==Tile.StoneCircle_22_22) ||
        (tile==Tile.StoneCircle_x_41) ||
        (tile==Tile.WellOfMana) ||
        (tile==Tile.StoneCircle_32_11) ||
        (tile==Tile.StoneCircle_31_12) ||
        (tile==Tile.StoneCircle_31_11) ||
        (tile==Tile.Cottage_11_23B_22) ||
        (tile==Tile.Cottage_23B_31_x) ||
        (tile==Tile.Cottage_23B_32_x) ||
        (tile==Tile.Cottage_23B_12_21) ||
        (tile==Tile.StoneCircle_11_32) ||
        (tile==Tile.StoneCircle_12_31) ||
        (tile==Tile.StoneCircle_11_31) ||
        (tile==Tile.Cottage_32_23B_x) ||
        (tile==Tile.Cottage_12_21_23B) ||
        (tile==Tile.Cottage_22_23B_11) ||
        (tile==Tile.Cottage_31_23B_x)
      ) return false

    console.log("*** ERROR - Unsupported tile")
    return false
  }
}

export const tileTools = new TileTools()
