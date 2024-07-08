import { MaterialItem, MaterialMove, XYCoordinates } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Orientation } from '../Orientation'
import { Memory } from './Memory'
import { RuleId } from './RuleId'
import { SpellRule } from './SpellRule'
import { tileTools } from '../logic/TileTools'

// FOR TESTS
// --- To be kept for now - still some tests to be performed and improvements to be implemented about spell orientation selection  ---
//const enforceAskPlayer=true
const enforceAskPlayer=false

enum OrientationChoice {
  North = 1,
  East  = 2,
  South = 3,
  West  = 4,
  NoRemainingOrientation = 5,
  AskPlayer = 6
}

class AutoplayData {
  autoplay:boolean
  nbNeededGolems:number

  constructor(autoplay:boolean, nbNeededGolems:number){
    this.autoplay=autoplay
    this.nbNeededGolems=nbNeededGolems
  }
}
const autoplayNoGolems=new AutoplayData(true, 0)

/*
 * This rule selects the spell orientation
 * then moves to the rule to apply the effect
 *
 * If there's no remaining orientation, it goes to next player's turn
 */
export class SelectCastSpellOrientationRule extends SpellRule {
  onRuleStart(): MaterialMove[] {
    this.forget(Memory.SpellOrientation)

    // Select spell orientation
    let spellOrientation:Orientation|undefined
    const orientationChoice=this.selectSpellOrientation()
    switch (orientationChoice){
      case OrientationChoice.AskPlayer:
        return [this.startPlayerTurn(RuleId.AskSpellOrientation, this.getActivePlayer())]
      case OrientationChoice.NoRemainingOrientation:
        return [this.startPlayerTurn(RuleId.EndTurn, this.getActivePlayer())]
      case OrientationChoice.North:
        spellOrientation=Orientation.North
        break
      case OrientationChoice.East:
        spellOrientation=Orientation.East
        break
      case OrientationChoice.South:
        spellOrientation=Orientation.South
        break
      case OrientationChoice.West:
        spellOrientation=Orientation.West
        break
    }

    if (spellOrientation===undefined){
      console.log("*** ERROR - No selected spell orientation => Game is stuck")
      return []
    }

    // Apply spell effects
    this.memorize(Memory.SpellOrientation, spellOrientation)
    return [this.startPlayerTurn(RuleId.ApplySpellEffect, this.getActivePlayer())]
  }

  mayAutoplay(
    spellOrientation:Orientation,
    activeTileCoords:XYCoordinates,
    activeTile:MaterialItem
  ) : AutoplayData {
    const spell = this.getSpell(activeTile, spellOrientation)
    const nbNeededGolems=spell.nbGolems

    // Automatically apply the orientations without spell
    if (nbNeededGolems<=0)
      return autoplayNoGolems

    // Automatically apply the orientations targetting no tile
    const targetTileCoords=this.getTargetTileCoordinates(
      activeTileCoords,
      spellOrientation,
      spell
    )
    const targetTile=this.getTile(targetTileCoords)
    if (targetTile===undefined){
      // No tile at the target coordinates
      return autoplayNoGolems
    }

    // Automatically apply the orientations whose target contains a wizard
    if (this.hasTileWizard(targetTileCoords))
      return autoplayNoGolems

    // -----------------------
    //         TEST
    // -----------------------
    if (enforceAskPlayer){
      // No autoplay
      return new AutoplayData(false, nbNeededGolems)
    }
    // -----------------------

    // Automatically apply the orientations
    // if no break shield
    // and a number of shields greater or equal to
    // the number of attacking golems
    // and controlled by opponent
    if (!spell.breakShields){
      const nbAttackingGolems=spell.nbGolems // TODO - Potentially restricted by the player' stack of golems
      let nbShields=tileTools.nbProtectionShields(targetTile.id)

      const golemCount=this.getGolemCountAtCoords(targetTileCoords)
      if (golemCount.hasFiveGolemsOfASingleOpponent)
        nbShields=nbShields+1

      if (golemCount.isTileControlledByOpponent && (nbShields >= nbAttackingGolems))
        return autoplayNoGolems
    }

    // No autoplay
    return new AutoplayData(false, nbNeededGolems)
  }

  // Returns the next spell orientation
  selectSpellOrientation(): OrientationChoice {
    const todoNorth=this.remind(Memory.AppliedSpellNorth)!==true
    const todoEast=this.remind(Memory.AppliedSpellEast)!==true
    const todoSouth=this.remind(Memory.AppliedSpellSouth)!==true
    const todoWest=this.remind(Memory.AppliedSpellWest)!==true

    if (!todoNorth && !todoEast && !todoSouth && !todoWest){
      // Nothing to do => End of all spell effects
      return OrientationChoice.NoRemainingOrientation
    }

    // Analyse the remaining spells
    const tileCoords=this.getActiveTileCoordinates()
    const tile=this.getTile(tileCoords)
    if (tile===undefined){
      console.log("*** ERROR - Unknown active tile")
      return OrientationChoice.AskPlayer
    }

    // Automatically apply the orientations without spell
    let candidate:OrientationChoice|undefined=undefined
    let totalNbNeededGolems=0
    let nbCandidates=0
    if (todoNorth){
      const data=this.mayAutoplay(Orientation.North, tileCoords, tile)
      if (data.autoplay)
        return OrientationChoice.North
      totalNbNeededGolems=totalNbNeededGolems+data.nbNeededGolems
      candidate=OrientationChoice.North
      nbCandidates=nbCandidates+1
    }

    if (todoEast){
      const data=this.mayAutoplay(Orientation.East, tileCoords, tile)
      if (data.autoplay)
        return OrientationChoice.East
      totalNbNeededGolems=totalNbNeededGolems+data.nbNeededGolems
      candidate=OrientationChoice.East
      nbCandidates=nbCandidates+1
    }

    if (todoSouth){
      const data=this.mayAutoplay(Orientation.South, tileCoords, tile)
      if (data.autoplay)
        return OrientationChoice.South
      totalNbNeededGolems=totalNbNeededGolems+data.nbNeededGolems
      candidate=OrientationChoice.South
      nbCandidates=nbCandidates+1
    }

    if (todoWest){
      const data=this.mayAutoplay(Orientation.West, tileCoords, tile)
      if (data.autoplay)
        return OrientationChoice.West
      totalNbNeededGolems=totalNbNeededGolems+data.nbNeededGolems
      candidate=OrientationChoice.West
      nbCandidates=nbCandidates+1
    }

    if (candidate!==undefined && !enforceAskPlayer){
      // Automatically apply one of the remaining orientation if the total number of (attacking golems-killed ones) is greater or equal to the number of golems in the player's stack
      let nbAvailableGolems=this
        .material(MaterialType.Golem)
        .location(LocationType.PlayerGolemStack)
        .player(this.getActivePlayer())
        .length
      if (nbAvailableGolems >= totalNbNeededGolems)
        return candidate

      // Automatically apply an orientation if there's only one remaining
      if (nbCandidates==1)
        return candidate
    }

    // No automated move => ask the player
    return OrientationChoice.AskPlayer
  }
}
