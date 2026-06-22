import { LocationContext, Locator, MaterialContext } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { Orientation } from '@gamepark/rivality/Orientation'
import { CustomMoveType } from '@gamepark/rivality/rules/CustomMoveType'
import { Memory } from '@gamepark/rivality/rules/Memory'
import { RuleId } from '@gamepark/rivality/rules/RuleId'
import { isCustomMoveType, Location } from '@gamepark/rules-api'
import { tileDescription } from '../material/TileDescription'
import { uiTileTools } from '../material/UITileTools'
import { TileButtonDescription, TileButtonId } from './description/TileButtonDescription'

export class TileButtonLocator extends Locator {
  locationDescription = new TileButtonDescription()

  getLocations(context: MaterialContext): Location[] {
    const locations: Location[] = []
    const rules = context.rules
    const player = context.player
    const activePlayer = context.rules.getActivePlayer()

    // Buttons around the tile being placed
    const tilePreview = rules.remind<number | undefined>(Memory.TilePreview)
    if (tilePreview !== undefined) {
      locations.push(
        { type: LocationType.TileButton, id: TileButtonId.Cancel, parent: tilePreview },
        { type: LocationType.TileButton, id: TileButtonId.Rotate, parent: tilePreview },
        { type: LocationType.TileButton, id: TileButtonId.Validate, parent: tilePreview }
      )
    }

    // Buttons around tiles in player's hand
    if (player !== undefined) {
      for (const index of rules.material(MaterialType.Tile).location(LocationType.PlayerHand).player(player).getIndexes()) {
        locations.push({ type: LocationType.TileButton, id: TileButtonId.Rotate, parent: index })
      }
    }

    // Buttons around tile with golems to be removed
    const ruleId = rules.game.rule?.id
    if (ruleId === RuleId.AskGolemRemoval) {
      if ((player !== undefined) && (player === activePlayer)) {
        const tileX = rules.remind<number | undefined>(Memory.SpellTileX)
        const tileY = rules.remind<number | undefined>(Memory.SpellTileY)
        const tileIndex = rules.material(MaterialType.Tile)
          .location(LocationType.Board)
          .filter(item => item.location.x === tileX && item.location.y === tileY)
          .getIndex()

        rules.getLegalMoves(player).forEach(move => {
          if (isCustomMoveType(CustomMoveType.ChoosePlayer)(move)) {
            locations.push({
              type: LocationType.TileButton,
              id: move.data === 1 ? TileButtonId.RemoveGolem1 : move.data === 2 ? TileButtonId.RemoveGolem2 : TileButtonId.RemoveGolem3,
              parent: tileIndex
            })
          }
        })
      }
    }

    // Buttons around target tile
    if (ruleId === RuleId.AskSpellOrientation) {
      if ((player !== undefined) && (player === activePlayer)) {
        const hasSpellNorth = rules.remind(Memory.AppliedSpellNorth) !== true
        const hasSpellEast = rules.remind(Memory.AppliedSpellEast) !== true
        const hasSpellSouth = rules.remind(Memory.AppliedSpellSouth) !== true
        const hasSpellWest = rules.remind(Memory.AppliedSpellWest) !== true

        if (hasSpellNorth) {
          const tileIndex = uiTileTools.activeSpellTargetItemIndex(context, Orientation.North)
          if (tileIndex !== undefined) {
            locations.push({ type: LocationType.TileButton, id: TileButtonId.SelectSpellNorth, parent: tileIndex })
          }
        }
        if (hasSpellEast) {
          const tileIndex = uiTileTools.activeSpellTargetItemIndex(context, Orientation.East)
          if (tileIndex !== undefined) {
            locations.push({ type: LocationType.TileButton, id: TileButtonId.SelectSpellEast, parent: tileIndex })
          }
        }
        if (hasSpellSouth) {
          const tileIndex = uiTileTools.activeSpellTargetItemIndex(context, Orientation.South)
          if (tileIndex !== undefined) {
            locations.push({ type: LocationType.TileButton, id: TileButtonId.SelectSpellSouth, parent: tileIndex })
          }
        }
        if (hasSpellWest) {
          const tileIndex = uiTileTools.activeSpellTargetItemIndex(context, Orientation.West)
          if (tileIndex !== undefined) {
            locations.push({ type: LocationType.TileButton, id: TileButtonId.SelectSpellWest, parent: tileIndex })
          }
        }
      }
    }

    return locations
  }

  placeLocation(location: Location, context: LocationContext) {
    const tile = context.rules.material(MaterialType.Tile).getItem(location.parent!)
    return context.locators[tile.location.type]!.placeItem(tile, { ...context, type: MaterialType.Tile, index: location.parent!, displayIndex: 0 })
      .concat(super.placeLocation(location, context))
  }

  getCoordinates(location: Location) {
    switch (location.id) {
      // Top left
      case TileButtonId.Cancel:
      case TileButtonId.RemoveGolem2:
        return { x: -tileDescription.width / 2, y: -tileDescription.height / 2, z: 10 }
      // Top right
      case TileButtonId.Rotate:
      case TileButtonId.RemoveGolem3:
        return { x: tileDescription.width / 2, y: -tileDescription.height / 2, z: 10 }
      // Bottom right
      case TileButtonId.Validate:
      case TileButtonId.RemoveGolem1:
      case TileButtonId.SelectSpellNorth:
      case TileButtonId.SelectSpellEast:
      case TileButtonId.SelectSpellSouth:
      case TileButtonId.SelectSpellWest:
        return { x: tileDescription.width / 2, y: tileDescription.height / 2, z: 10 }
      default:
        console.log('*** ERROR - Unsupported button')
        return { x: tileDescription.width / 2, y: tileDescription.height / 2, z: 10 }
    }
  }
}

export const tileButtonLocator = new TileButtonLocator()
