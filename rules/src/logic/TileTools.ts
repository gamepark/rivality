import { MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { Direction } from './Direction'
import { Orientation } from '../Orientation'
import { Tile } from '../material/Tile'

class CoordSet {
  coords:XYCoordinates[]=[]

  contains(x:number, y:number){
    for (let i=0; i<this.coords.length; i++){
      if (this.coords[i].x===x && this.coords[i].y===y)
        return true;
    }
    return false
  }

  add(x:number, y:number){
    if (this.contains(x,y))
      return
    this.coords.push({x:x, y:y})
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
    if (
        (tile==Tile.StoneCircle_22_22) ||
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

  isCottage(tile:Tile){
    if (
        (tile==Tile.Cottage_11_23B_22) ||
        (tile==Tile.Cottage_23B_31_x) ||
        (tile==Tile.Cottage_23B_32_x) ||
        (tile==Tile.Cottage_23B_12_21) ||
        (tile==Tile.Cottage_32_23B_x) ||
        (tile==Tile.Cottage_12_21_23B) ||
        (tile==Tile.Cottage_22_23B_11) ||
        (tile==Tile.Cottage_31_23B_x)
      ) return true
    if (
        (tile==Tile.Fortress_22_22_23B) ||
        (tile==Tile.Fortress_31_22_13B) ||
        (tile==Tile.Fortress_21_23B_22) ||
        (tile==Tile.Fortress_22_13B_31) ||
        (tile==Tile.Fortress_23B_22_22) ||
        (tile==Tile.Fortress_22_23B_21) ||
        (tile==Tile.StoneCircle_22_22) ||
        (tile==Tile.StoneCircle_x_41) ||
        (tile==Tile.WellOfMana) ||
        (tile==Tile.StoneCircle_32_11) ||
        (tile==Tile.StoneCircle_31_12) ||
        (tile==Tile.StoneCircle_31_11) ||
        (tile==Tile.StoneCircle_11_32) ||
        (tile==Tile.StoneCircle_12_31) ||
        (tile==Tile.StoneCircle_11_31)
      ) return false

    console.log("*** ERROR - Unsupported tile")
    return false
  }

  isFortress(tile:Tile){
    if (
        (tile==Tile.Fortress_22_22_23B) ||
        (tile==Tile.Fortress_31_22_13B) ||
        (tile==Tile.Fortress_21_23B_22) ||
        (tile==Tile.Fortress_22_13B_31) ||
        (tile==Tile.Fortress_23B_22_22) ||
        (tile==Tile.Fortress_22_23B_21)
      ) return true
    if (
        (tile==Tile.StoneCircle_22_22) ||
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

  possibleTileLocations(boardTiles:MaterialItem[]):XYCoordinates[]{
    let candidates=new CoordSet()
    let occupied=new CoordSet()

    for (let i=0; i<boardTiles.length; i++){
      let coord=boardTiles[i].location
      let coordX=coord.x!
      let coordY=coord.y!
      occupied.add(coordX, coordY)
      candidates.add(coordX-1, coordY)
      candidates.add(coordX,   coordY-1)
      candidates.add(coordX+1, coordY)
      candidates.add(coordX,   coordY+1)
    }

    let res:XYCoordinates[]=[]
    for (let i=0; i<candidates.coords.length; i++){
      let coord:XYCoordinates=candidates.coords[i]
      if (!occupied.contains(coord.x, coord.y))
        res.push(coord)
    }
    return res
  }

  tileSideFromOrientations(spellOrientation:Orientation, tileOrientation:Orientation):Direction {
    switch (tileOrientation){
      case Orientation.North:
        switch (spellOrientation){
          case Orientation.North: return Direction.Top
          case Orientation.East:  return Direction.Right
          case Orientation.South: return Direction.Bottom
          case Orientation.West:  return Direction.Left
        }
        break
      case Orientation.East:
        switch (spellOrientation){
          case Orientation.North: return Direction.Left
          case Orientation.East:  return Direction.Top
          case Orientation.South: return Direction.Right
          case Orientation.West:  return Direction.Bottom
        }
        break
      case Orientation.South:
        switch (spellOrientation){
          case Orientation.North: return Direction.Bottom
          case Orientation.East:  return Direction.Left
          case Orientation.South: return Direction.Top
          case Orientation.West:  return Direction.Right
        }
        break
      case Orientation.West:
        switch (spellOrientation){
          case Orientation.North: return Direction.Right
          case Orientation.East:  return Direction.Bottom
          case Orientation.South: return Direction.Left
          case Orientation.West:  return Direction.Top
        }
        break
    }
  }
}

export const tileTools = new TileTools()
