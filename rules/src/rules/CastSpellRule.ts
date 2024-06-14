import { isMoveItemTypeAtOnce, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { BoardSpace } from '../material/BoardSpace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Tile } from '../material/Tile'
import { golemTools } from '../logic/GolemTools'
import { wizardTools } from '../logic/WizardTools'
import { Spell, tileSpells } from '../logic/TileSpells'
import { tileTools } from '../logic/TileTools'
import { Orientation } from '../Orientation'
import { Memory } from './Memory'
import { RuleId } from '../rules/RuleId'
import { SpellRule } from './SpellRule'

export class CastSpellRule extends SpellRule {
  onRuleStart(): MaterialMove[] {
    // Default orientation is not set
    let spellOrientation=this.remind(Memory.SpellOrientation)
    if (spellOrientation===undefined){
      spellOrientation=Orientation.North
      this.memorize(Memory.SpellOrientation, spellOrientation)
    }

    // Apply spell effects
    return this.castEffectsOrGoToNextOrientation(spellOrientation)
  }

  castEffectsOrGoToNextOrientation(spellOrientation:Orientation):MaterialMove[] {
    let moves=this.castEffects(spellOrientation)
    if (moves.length>0)
      return moves

    return [this.spellAction(this.nextOrientation())]
  }

  castEffects(spellOrientation:Orientation):MaterialMove[] {
    this.memorize(Memory.SpellOrientation, spellOrientation)

    // Get the active tile coordinates
    const playerWizard=wizardTools.playerWizard(this.getActivePlayer())
    const wizardItem=this
      .material(MaterialType.Wizard)
      .location(LocationType.Board)
      .filter(item => item.id==playerWizard)
      .getItem()
    const tileX=wizardItem!.location.x!
    const tileY=wizardItem!.location.y!

    // Get the active tile
    const tile=this
      .material(MaterialType.Tile)
      .location(LocationType.Board)
      .filter(item => item.location.x==tileX && item.location.y==tileY)
      .getItem()

    const tileId:Tile=tile!.id
    const tileOrientation:Orientation=tile!.location.rotation

    // Get the active spell
    const spell:Spell=tileSpells.spell(
      tileId,
      tileTools.tileSideFromOrientations(spellOrientation, tileOrientation)
    )

    // Apply the spell if there's one
    if (spell.nbGolems<=0)
      return []
    return this.applySpell(spellOrientation, spell, tileX, tileY)
  }

  // Precondition: the spell is not empty
  applySpell(spellOrientation:Orientation, spell:Spell, tileX:number, tileY:number):MaterialMove[]{
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

    const targetX=tileX+coefX*spell.distance
    const targetY=tileY+coefY*spell.distance

//    console.log("initial tile: ("+tileX+","+tileY+")")
//    console.log("target: ("+targetX+","+targetY+")")

    const targetTile=this
      .material(MaterialType.Tile)
      .location(LocationType.Board)
      .filter(item => item.location.x==targetX && item.location.y==targetY)
      .getItem()
    if (targetTile === undefined){
      // No tile on the board
      return []
    }

    // Found target tile
    return this.applySpellOnTile(spell, targetX, targetY, targetTile.id)
  }

  // Preconditions:
  // - The spell is not empty
  // - The target tile is on the board
  applySpellOnTile(spell:Spell, targetX:number, targetY:number, targetTile:Tile):MaterialMove[] {
    // Is there a wizard on the tile
    const targetHasWizard=this
      .material(MaterialType.Wizard)
      .location(LocationType.Board)
      .filter(item => item.location.x==targetX && item.location.y==targetY)
      .length > 0
    if (targetHasWizard){
      // A wizard is protecting the tile
      return []
    }
    return this.applySpellOnWizardFreeTile(spell, targetX, targetY, targetTile)
  }

  // Preconditions:
  // - The spell is not empty
  // - The target tile is on the board
  // - There is no wizard on the target tile
  applySpellOnWizardFreeTile(spell:Spell, targetX:number, targetY:number, targetTile:Tile){
    this.memorize(Memory.SpellTileX, targetX)
    this.memorize(Memory.SpellTileY, targetY)

    const golemsOnTarget=this
      .material(MaterialType.Golem)
      .location(LocationType.Board)
      .filter(item => item.location.x==targetX && item.location.y==targetY)

    const golemCount = golemTools.golemCount(golemsOnTarget, this.getActivePlayer())

    // Manage shields
    let nbActiveShields=0
    if (golemCount.isTileControlledByOpponent && !spell.breakShields){
      if (tileTools.isCottage(targetTile))
        nbActiveShields=1
      else if (tileTools.isFortress(targetTile))
        nbActiveShields=2
      if (golemCount.hasFiveGolemsOfASingleOpponent)
        nbActiveShields=nbActiveShields+1
    }

    let nbAddedGolems=spell.nbGolems-nbActiveShields
    if (nbAddedGolems<=0){
      // All added golems are instantly destroyed => nothing to do
      return []
    }

    let nbAvailableGolems=this
      .material(MaterialType.Golem)
      .location(LocationType.PlayerGolemStack)
      .player(this.getActivePlayer())
      .length
    if (nbAvailableGolems==0){
      // No available golem
      return []
    }

    if (nbAvailableGolems<nbAddedGolems){
      nbAddedGolems=nbAvailableGolems
    }

    // Golem addition moves
    let moves:MaterialMove[]=[]
    moves.push(this.
      material(MaterialType.Golem)
      .location(LocationType.PlayerGolemStack)
      .player(this.getActivePlayer())
      .sort(item => -item.location.x!)
      .limit(nbAddedGolems)
      .moveItemsAtOnce(
        {
          type: LocationType.Board,
          id: BoardSpace.Golem,
          x: targetX,
          y: targetY
        }
      )
    )

    return moves
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemTypeAtOnce(MaterialType.Golem)(move)){
      return [this.rules()
        .startPlayerTurn(RuleId.RemoveGolem, this.getActivePlayer())]
    }
    return []
  }
}
