import { MaterialContext } from '@gamepark/react-game'
import { Location, XYCoordinates } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { Memory } from '@gamepark/rivality/rules/Memory'
import { Orientation } from '@gamepark/rivality/Orientation'
import { RuleId } from '@gamepark/rivality/rules/RuleId'
import { tileSpells } from '@gamepark/rivality/logic/TileSpells'
import { tileTools } from '@gamepark/rivality/logic/TileTools'
import { wizardTools } from '@gamepark/rivality/logic/WizardTools'

export class UITileTools {
  isHighlightedSquare(location:Location, context: MaterialContext){
    let spellX=context.rules.remind(Memory.SpellTileX)
    let spellY=context.rules.remind(Memory.SpellTileY)
    return (spellX!==undefined && spellY!==undefined && location.x===spellX && location.y===spellY)
  }

  isActiveWizardSquare(location:Location, context: MaterialContext){
    const ruleId=context.rules.state.rule?.id
    const tilePreview=(context.rules.remind(Memory.TilePreview)!==undefined)
    if (ruleId!==RuleId.AskSpellOrientation && !tilePreview)
      return false

    const wizardLocation=this.activePlayerWizardLocation(context)
    if (wizardLocation===undefined)
      return false

    return (location.x===wizardLocation.x && location.y===wizardLocation.y)
  }

  activePlayerWizardLocation(context: MaterialContext){
    const activePlayer=context.player
    if (activePlayer===undefined)
      return undefined

    // If there's a tile preview, the wizard is supposed to be on this tile
    // even if it's not the case due to local moves
    // If there's no tile preview, the actual square of the wizard is considered

    const tilePreview=(context.rules.remind(Memory.TilePreview)!==undefined)
    if (tilePreview){
      // Tile preview
      const tileId=context.rules.remind(Memory.TilePreview)
      const tile=context.rules.material(MaterialType.Tile).getItem(tileId)!
      return tile.location
    }

    // No tile preview => actual wizard' square
    const wizardItem=context.rules.material(MaterialType.Wizard)
      .location(LocationType.Board)
      .filter(item => item.id===wizardTools.playerWizard(activePlayer))
      .getItem()!
    return wizardItem.location
  }

  isUnderAttackSquare(location:Location, context: MaterialContext){
    const activePlayer=context.player
    if (activePlayer!==undefined){
      const ruleId=context.rules.state.rule?.id
      const tilePreview=(context.rules.remind(Memory.TilePreview)!==undefined)
      const isSpellOrderSelection=(ruleId===RuleId.AskSpellOrientation)

      if (tilePreview || isSpellOrderSelection){
        const thisX=location.x!
        const thisY=location.y!

        // 1 - Find location of the tile with wizard
        const wizardLocation=this.activePlayerWizardLocation(context)
        if (wizardLocation===undefined)
          return false

        // 2 - Find tile with wizard
        const tileX=wizardLocation.x!
        const tileY=wizardLocation.y!

        // A tile cannot be attacked by itself
        if (thisX===tileX && thisY===tileY)
          return false

        const wizardTile=context.rules.material(MaterialType.Tile)
          .location(LocationType.Board)
          .filter(item => item.location.x===tileX && item.location.y===tileY)
        if (wizardTile.length > 0){
          // Found tile with wizard
          const tileItem=wizardTile.getItem()!
          const tileId=tileItem.id
          const tileOrientation=tileItem.location.rotation

          // 3 - Find spell distances in all 4 directions
          let distances={}
          distances[Orientation.North]=0
          distances[Orientation.East]=0
          distances[Orientation.South]=0
          distances[Orientation.West]=0

          const orientations=[Orientation.North, Orientation.East, Orientation.South, Orientation.West]
          orientations.forEach(orientation => {
            const direction=tileTools.tileSideFromOrientations(orientation, tileOrientation)
            const spell=tileSpells.spell(tileId, direction)
            if (spell.nbGolems > 0){
              distances[orientation]=spell.distance
            }
          })

          // 4 - Check if the current location is a target of the spells
          let targetNorth=true
          let targetSouth=true
          let targetEast=true
          let targetWest=true
          if (ruleId===RuleId.AskSpellOrientation){
            // Restrict the target to the spell orientations that have not been applied yet
            targetNorth=context.rules.remind(Memory.AppliedSpellNorth)!==true
            targetSouth=context.rules.remind(Memory.AppliedSpellSouth)!==true
            targetEast=context.rules.remind(Memory.AppliedSpellEast)!==true
            targetWest=context.rules.remind(Memory.AppliedSpellWest)!==true
          }
          if (
            (targetNorth && thisX===tileX && thisY===tileY-distances[Orientation.North]) ||
            (targetSouth && thisX===tileX && thisY===tileY+distances[Orientation.South]) ||
            (targetWest  && thisY===tileY && thisX===tileX-distances[Orientation.West]) ||
            (targetEast  && thisY===tileY && thisX===tileX+distances[Orientation.East])
          ){
            return true
          }
        }
      }
    }
    return false
  }

  activeSpellTargetCoordinates(context: MaterialContext, spellOrientation:Orientation): XYCoordinates|undefined {
    // 1 - Find location of the tile with wizard
    const wizardLocation=this.activePlayerWizardLocation(context)
    if (wizardLocation===undefined)
      return undefined

    // 2 - Find tile with wizard
    const tileX=wizardLocation.x!
    const tileY=wizardLocation.y!

    const wizardTile=context.rules.material(MaterialType.Tile)
      .location(LocationType.Board)
      .filter(item => item.location.x===tileX && item.location.y===tileY)
    if (wizardTile.length <= 0)
      return undefined

    const tileItem=wizardTile.getItem()!
    const tileId=tileItem.id
    const tileOrientation=tileItem.location.rotation

    // 3 - Find spell distance
    const direction=tileTools.tileSideFromOrientations(spellOrientation, tileOrientation)
    const spell=tileSpells.spell(tileId, direction)
    if (spell.nbGolems <= 0)
      return undefined

    const spellDistance=spell.distance

    switch (spellOrientation){
      case Orientation.North: return {x:tileX, y:tileY-spellDistance}
      case Orientation.South: return {x:tileX, y:tileY+spellDistance}
      case Orientation.East: return {x:tileX+spellDistance, y:tileY}
      case Orientation.West: return {x:tileX-spellDistance, y:tileY}
    }
    return undefined
  }

  activeSpellTargetItemIndex(context: MaterialContext, spellOrientation:Orientation): number|undefined {
    const coords=this.activeSpellTargetCoordinates(context, spellOrientation)
    if (coords===undefined)
      return
    return context.rules.material(MaterialType.Tile)
      .location(LocationType.Board)
      .filter(item => item.location.x===coords.x && item.location.y===coords.y)
      .getIndex()
  }
}

export const uiTileTools = new UITileTools()
