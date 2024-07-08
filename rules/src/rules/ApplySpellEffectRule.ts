import { isMoveItemTypeAtOnce, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { BoardSpace } from '../material/BoardSpace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Tile } from '../material/Tile'
import { Spell } from '../logic/TileSpells'
import { tileTools } from '../logic/TileTools'
import { Orientation } from '../Orientation'
import { Memory } from './Memory'
import { RuleId } from './RuleId'
import { SpellRule } from './SpellRule'

/*
 * This rule applies the effect of a spell in a given orientation
 * then goes back to the rule to select the next spell orientation
 */
export class ApplySpellEffectRule extends SpellRule {
  onRuleStart(): MaterialMove[] {
    // Default orientation is not set
    let spellOrientation=this.remind(Memory.SpellOrientation)
    if (spellOrientation===undefined){
      console.log("*** ERROR - unknown spell orientation => The game is stuck")
      return []
    }

    // Apply spell effects
    return this.castEffectsOrGoToNextOrientation(spellOrientation)
  }

  castEffectsOrGoToNextOrientation(spellOrientation:Orientation):MaterialMove[] {
    let moves=this.castEffects(spellOrientation)
    if (moves.length>0)
      return moves

    return [this.rules().startPlayerTurn(RuleId.SelectCastSpellOrientation, this.getActivePlayer())]
  }

  castEffects(spellOrientation:Orientation):MaterialMove[] {
    this.memorize(Memory.SpellOrientation, spellOrientation)

    // Record the orientation as applied
    let extraMemory:Memory|undefined=undefined
    switch (spellOrientation){
      case Orientation.North:
        extraMemory=Memory.AppliedSpellNorth
        break
      case Orientation.East:
        extraMemory=Memory.AppliedSpellEast
        break
      case Orientation.South:
        extraMemory=Memory.AppliedSpellSouth
        break
      case Orientation.West:
        extraMemory=Memory.AppliedSpellWest
        break
    }
    this.memorize(extraMemory, true)

    // Get the active tile coordinates
    const activeTileCoordinates=this.getActiveTileCoordinates()
    const tileX=activeTileCoordinates.x
    const tileY=activeTileCoordinates.y

    // Get the active tile
    const tile=this.getActiveTile()
    if (tile===undefined){
      console.log("*** ERROR - Missing active tile")
      return []
    }
    const spell=this.getSpell(tile, spellOrientation)

    // Apply the spell if there's one
    if (spell.nbGolems<=0)
      return []
    return this.applySpell(spellOrientation, spell, tileX, tileY)
  }

  // Precondition: the spell is not empty
  applySpell(spellOrientation:Orientation, spell:Spell, tileX:number, tileY:number):MaterialMove[]{
    const tilesCoords=this.getTargetTileCoordinates({x:tileX, y:tileY}, spellOrientation, spell)
    const targetX=tilesCoords.x
    const targetY=tilesCoords.y
    const targetTile=this.getTile(tilesCoords)
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
    const golemCount=this.getGolemCountAtCoords({x:targetX, y:targetY})

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
