import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Golem } from '../material/Golem'
import { BoardSpace } from '../material/BoardSpace'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { wizardTools } from '../logic/WizardTools'
import { Spell, tileSpells } from '../logic/TileSpells'
import { tileTools } from '../logic/TileTools'
import { Orientation } from '../Orientation'
import { Tile } from '../material/Tile'
// import { RuleId } from '../rules/RuleId'

export class CastSpellRule extends PlayerTurnRule {
  castEffects(spellOrientation:Orientation):MaterialMove[] {
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
    const golemsOnTarget=this
      .material(MaterialType.Golem)
      .location(LocationType.Board)
      .filter(item => item.location.x==targetX && item.location.y==targetY)
    const nbGolems1OnTarget=golemsOnTarget.filter(item => item.id==Golem.Golem1).length
    const nbGolems2OnTarget=golemsOnTarget.filter(item => item.id==Golem.Golem2).length
    const nbGolems3OnTarget=golemsOnTarget.filter(item => item.id==Golem.Golem3).length

//    const nbGolemsOnTargetByPlayer=[nbGolems1OnTarget, nbGolems2OnTarget, nbGolems3OnTarget]

    let nbPlayerGolems=0
    let nbOpponentGolems=0
    let hasFiveGolemsOfASingleOpponent=false
    let isTileControlledByOpponent=false
    if (this.getActivePlayer()==1){
      nbPlayerGolems=nbGolems1OnTarget
      nbOpponentGolems=nbGolems2OnTarget+nbGolems3OnTarget
      hasFiveGolemsOfASingleOpponent=(nbGolems2OnTarget==5)||(nbGolems3OnTarget==5)
      isTileControlledByOpponent=
        ((nbGolems2OnTarget > nbGolems1OnTarget) && (nbGolems2OnTarget > nbGolems3OnTarget)
        ||(nbGolems3OnTarget > nbGolems1OnTarget) && (nbGolems3OnTarget > nbGolems2OnTarget))
    } else if (this.getActivePlayer()==2){
      nbPlayerGolems=nbGolems2OnTarget
      nbOpponentGolems=nbGolems1OnTarget+nbGolems3OnTarget
      hasFiveGolemsOfASingleOpponent=(nbGolems1OnTarget==5)||(nbGolems3OnTarget==5)
      isTileControlledByOpponent=
        ((nbGolems1OnTarget > nbGolems2OnTarget) && (nbGolems1OnTarget > nbGolems3OnTarget)
        ||(nbGolems3OnTarget > nbGolems1OnTarget) && (nbGolems3OnTarget > nbGolems2OnTarget))
    } else if (this.getActivePlayer()==3){
      nbPlayerGolems=nbGolems3OnTarget
      nbOpponentGolems=nbGolems1OnTarget+nbGolems2OnTarget
      hasFiveGolemsOfASingleOpponent=(nbGolems1OnTarget==5)||(nbGolems2OnTarget==5)
      isTileControlledByOpponent=
        ((nbGolems1OnTarget > nbGolems2OnTarget) && (nbGolems1OnTarget > nbGolems3OnTarget)
        ||(nbGolems2OnTarget > nbGolems1OnTarget) && (nbGolems2OnTarget > nbGolems3OnTarget))
    }

    // TODO - Missing break shield rule
    let nbActiveShields=0
    if (isTileControlledByOpponent){
      if (tileTools.isCottage(targetTile))
        nbActiveShields=1
      else if (tileTools.isFortress(targetTile))
        nbActiveShields=2
      if (hasFiveGolemsOfASingleOpponent)
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
    nbPlayerGolems=nbPlayerGolems+nbAddedGolems

    // Golem removal moves
    // TODO - Implement removal for the 3 players mode
    let nbGolems1ToBeRemoved=0
    let nbGolems2ToBeRemoved=0
    let nbGolems3ToBeRemoved=0
    while (nbPlayerGolems+nbOpponentGolems > 5){
      if (this.getActivePlayer()==1){
        // Active player = 1
        if (nbOpponentGolems>0){
          nbOpponentGolems--
          nbGolems2ToBeRemoved++
        } else {
          nbPlayerGolems--
          nbGolems1ToBeRemoved++
        }
      } else {
        // Active player = 2
        if (nbOpponentGolems>0){
          nbOpponentGolems--
          nbGolems1ToBeRemoved++
        } else {
          nbPlayerGolems--
          nbGolems2ToBeRemoved++
        }
      }
    }

    if (nbGolems1ToBeRemoved>0){
      moves.push(this.
        material(MaterialType.Golem)
        .location(LocationType.Board)
        .filter(item =>
          item.location.x==targetX
          && item.location.y==targetY
          && item.id==Golem.Golem1
        )
        .limit(nbGolems1ToBeRemoved)
        .moveItemsAtOnce(
          {
            type: LocationType.PlayerGolemStack,
            player: 1
          }
        )
      )
    }
    if (nbGolems2ToBeRemoved>0){
      moves.push(this.
        material(MaterialType.Golem)
        .location(LocationType.Board)
        .filter(item =>
          item.location.x==targetX
          && item.location.y==targetY
          && item.id==Golem.Golem2
        )
        .limit(nbGolems2ToBeRemoved)
        .moveItemsAtOnce(
          {
            type: LocationType.PlayerGolemStack,
            player: 2
          }
        )
      )
    }
    if (nbGolems3ToBeRemoved>0){
      moves.push(this.
        material(MaterialType.Golem)
        .location(LocationType.Board)
        .filter(item =>
          item.location.x==targetX
          && item.location.y==targetY
          && item.id==Golem.Golem3
        )
        .limit(nbGolems3ToBeRemoved)
        .moveItemsAtOnce(
          {
            type: LocationType.PlayerGolemStack,
            player: 3
          }
        )
      )
    }
    return moves
  }
}
