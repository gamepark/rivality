import { MaterialItem, PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import { GolemCount, golemTools } from '../logic/GolemTools'
import { Spell, tileSpells } from '../logic/TileSpells'
import { tileTools } from '../logic/TileTools'
import { wizardTools } from '../logic/WizardTools'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Tile } from '../material/Tile'
import { Orientation } from '../Orientation'

export abstract class SpellRule extends PlayerTurnRule {
  getActiveTileCoordinates(): XYCoordinates {
    const playerWizard=wizardTools.playerWizard(this.getActivePlayer())
    const wizardItem=this
      .material(MaterialType.Wizard)
      .location(LocationType.Board)
      .filter(item => item.id==playerWizard)
      .getItem()
    return {
      x:wizardItem!.location.x!,
      y:wizardItem!.location.y!
    }
  }

  getActiveTile(): MaterialItem|undefined {
    const coords=this.getActiveTileCoordinates()
    return this
      .material(MaterialType.Tile)
      .location(LocationType.Board)
      .filter(item => item.location.x==coords.x && item.location.y==coords.y)
      .getItem()
  }

  getSpell(tile:MaterialItem, spellOrientation:Orientation): Spell {
    const tileId:Tile=tile.id
    const tileOrientation:Orientation=tile.location.rotation

    return tileSpells.spell(
      tileId,
      tileTools.tileSideFromOrientations(spellOrientation, tileOrientation)
    )
  }

  getTargetTileCoordinates(tileCoordinates:XYCoordinates, spellOrientation:Orientation, spell:Spell): XYCoordinates {
    // Find the target tile of the spell
    let coefX=0
    let coefY=0
    switch (spellOrientation){
      case Orientation.North:
        coefY=-1
        break
      case Orientation.East:
        coefX=1
        break
      case Orientation.South:
        coefY=1
        break
      case Orientation.West:
        coefX=-1
        break
    }

    return {
      x:tileCoordinates.x+coefX*spell.distance,
      y:tileCoordinates.y+coefY*spell.distance
    }
  }

  getTile(tileCoordinates: XYCoordinates): MaterialItem|undefined {
    return this
      .material(MaterialType.Tile)
      .location(LocationType.Board)
      .filter(item => item.location.x==tileCoordinates.x && item.location.y==tileCoordinates.y)
      .getItem()
  }

  hasTileWizard(tileCoordinates: XYCoordinates): boolean {
    return this
      .material(MaterialType.Wizard)
      .location(LocationType.Board)
      .filter(item => item.location.x==tileCoordinates.x && item.location.y==tileCoordinates.y)
      .length > 0
  }

  getGolemCountAtCoords(coords:XYCoordinates): GolemCount {
    const golemsOnTarget=this
      .material(MaterialType.Golem)
      .location(LocationType.Board)
      .filter(item => item.location.x==coords.x && item.location.y==coords.y)

    return golemTools.golemCount(golemsOnTarget, this.getActivePlayer())
  }
}
