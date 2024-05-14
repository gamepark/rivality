import { Direction } from './Direction'
import { Tile } from '../material/Tile'

export class Spell {
  nbGolems:number
  distance:number
  breakShields:boolean

  constructor(nbGolems:number, distance:number, breakShields:boolean){
    this.nbGolems=nbGolems
    this.distance=distance
    this.breakShields=breakShields
  }
}

export class TileSpells {
  spell(tile:Tile, direction:Direction){
    switch (tile){
      case Tile.WellOfMana:
        return noSpell
      case Tile.StoneCircle_x_41:
        if (direction==Direction.Top)  return new Spell(4,1,false)
        return noSpell
      case Tile.StoneCircle_31_11:
        if (direction==Direction.Left) return new Spell(3,1,false)
        if (direction==Direction.Top)  return new Spell(1,1,false)
        return noSpell
      case Tile.StoneCircle_11_31:
        if (direction==Direction.Left) return new Spell(1,1,false)
        if (direction==Direction.Top)  return new Spell(3,1,false)
        return noSpell
      case Tile.StoneCircle_12_31:
        if (direction==Direction.Left) return new Spell(1,2,false)
        if (direction==Direction.Top)  return new Spell(3,1,false)
        return noSpell
      case Tile.StoneCircle_31_12:
        if (direction==Direction.Left) return new Spell(3,1,false)
        if (direction==Direction.Top)  return new Spell(1,2,false)
        return noSpell
      case Tile.StoneCircle_11_32:
        if (direction==Direction.Left) return new Spell(1,1,false)
        if (direction==Direction.Top)  return new Spell(3,2,false)
        return noSpell
      case Tile.StoneCircle_32_11:
        if (direction==Direction.Left) return new Spell(3,2,false)
        if (direction==Direction.Top)  return new Spell(1,1,false)
        return noSpell
      case Tile.StoneCircle_22_22:
        if (direction==Direction.Left) return new Spell(2,2,false)
        if (direction==Direction.Top)  return new Spell(2,2,false)
        return noSpell
      case Tile.Cottage_12_21_23B:
        if (direction==Direction.Left) return new Spell(1,2,false)
        if (direction==Direction.Top)  return new Spell(2,1,false)
        if (direction==Direction.Right)  return new Spell(2,3,true)
        return noSpell
      case Tile.Cottage_23B_12_21:
        if (direction==Direction.Left) return new Spell(2,3,true)
        if (direction==Direction.Top)  return new Spell(1,2,false)
        if (direction==Direction.Right)  return new Spell(2,1,false)
        return noSpell
      case Tile.Cottage_22_23B_11:
        if (direction==Direction.Left) return new Spell(2,2,false)
        if (direction==Direction.Top)  return new Spell(2,3,true)
        if (direction==Direction.Right)  return new Spell(1,1,false)
        return noSpell
      case Tile.Cottage_31_23B_x:
        if (direction==Direction.Left) return new Spell(3,1,false)
        if (direction==Direction.Top)  return new Spell(2,3,true)
        return noSpell
      case Tile.Cottage_11_23B_22:
        if (direction==Direction.Left) return new Spell(1,1,false)
        if (direction==Direction.Top)  return new Spell(2,3,true)
        if (direction==Direction.Right)  return new Spell(2,2,false)
        return noSpell
      case Tile.Cottage_23B_31_x:
        if (direction==Direction.Left) return new Spell(2,3,true)
        if (direction==Direction.Top)  return new Spell(3,1,false)
        return noSpell
      case Tile.Cottage_32_23B_x:
        if (direction==Direction.Left) return new Spell(3,2,false)
        if (direction==Direction.Top)  return new Spell(2,3,true)
        return noSpell
      case Tile.Cottage_23B_32_x:
        if (direction==Direction.Left) return new Spell(2,3,true)
        if (direction==Direction.Top)  return new Spell(3,2,false)
        return noSpell
      case Tile.Fortress_21_23B_22:
        if (direction==Direction.Left) return new Spell(2,1,false)
        if (direction==Direction.Top)  return new Spell(2,3,true)
        if (direction==Direction.Right)  return new Spell(2,2,false)
        return noSpell
      case Tile.Fortress_22_13B_31:
        if (direction==Direction.Left) return new Spell(2,2,false)
        if (direction==Direction.Top)  return new Spell(1,3,true)
        if (direction==Direction.Right)  return new Spell(3,1,false)
        return noSpell
      case Tile.Fortress_23B_22_22:
        if (direction==Direction.Left) return new Spell(2,3,true)
        if (direction==Direction.Top)  return new Spell(2,2,false)
        if (direction==Direction.Right)  return new Spell(2,2,false)
        return noSpell
      case Tile.Fortress_31_22_13B:
        if (direction==Direction.Left) return new Spell(3,1,false)
        if (direction==Direction.Top)  return new Spell(2,2,false)
        if (direction==Direction.Right)  return new Spell(1,3,true)
        return noSpell
      case Tile.Fortress_22_23B_21:
        if (direction==Direction.Left) return new Spell(2,2,false)
        if (direction==Direction.Top)  return new Spell(2,3,true)
        if (direction==Direction.Right)  return new Spell(2,1,false)
        return noSpell
      case Tile.Fortress_22_22_23B:
        if (direction==Direction.Left) return new Spell(2,2,false)
        if (direction==Direction.Top)  return new Spell(2,2,false)
        if (direction==Direction.Right)  return new Spell(2,3,true)
        return noSpell
    }
  console.log("*** ERROR - Unsupported tile spell")
  return noSpell
  }
}

export const tileSpells = new TileSpells()
export const noSpell = new Spell(0, 0, false)
