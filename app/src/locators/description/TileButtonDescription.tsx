/** @jsxImportSource @emotion/react */
import { css, Interpolation, Theme } from '@emotion/react'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { Tile } from '@gamepark/rivality/material/Tile'
import { Orientation } from '@gamepark/rivality/Orientation'
import { CustomMoveType } from '@gamepark/rivality/rules/CustomMoveType'
import { Memory } from '@gamepark/rivality/rules/Memory'
import { RuleId } from '@gamepark/rivality/rules/RuleId'
import { isCustomMoveType, Location, MaterialMoveBuilder, MaterialRules } from '@gamepark/rules-api'
import Cancel from '../../images/icon/cancel.png'
import RemoveGolem1 from '../../images/icon/no_golem1.png'
import RemoveGolem2 from '../../images/icon/no_golem2.png'
import RemoveGolem3 from '../../images/icon/no_golem3.png'
import Rotator from '../../images/icon/rotator.png'
import Validate from '../../images/icon/validate.png'
import { tileDescription } from '../../material/TileDescription'
import { uiTileTools } from '../../material/UITileTools'

export enum TileButtonId {
  Cancel,
  Rotate,
  Validate,
  SelectSpellNorth,
  SelectSpellEast,
  SelectSpellSouth,
  SelectSpellWest,
  RemoveGolem1,
  RemoveGolem2,
  RemoveGolem3
}

export class TileButtonDescription extends LocationDescription {
  height = 3
  width = 3
  borderRadius = 1.5
  alwaysVisible = true

  getExtraCss(location: Location, { rules }: LocationContext): Interpolation<Theme> {
    if (this.isDisabled(location, rules)) {
      return css`
        filter: grayscale(1);
        box-shadow: 0 0 0.3em black;
      `
    }
    return css`
      box-shadow: 0 0 0.3em black;
    `
  }

  getImage(location: Location) {
    switch (location.id) {
      case TileButtonId.Cancel:
        return Cancel
      case TileButtonId.Rotate:
        return Rotator
      case TileButtonId.Validate:
      case TileButtonId.SelectSpellNorth:
      case TileButtonId.SelectSpellEast:
      case TileButtonId.SelectSpellSouth:
      case TileButtonId.SelectSpellWest:
        return Validate
      case TileButtonId.RemoveGolem1:
        return RemoveGolem1
      case TileButtonId.RemoveGolem2:
        return RemoveGolem2
      case TileButtonId.RemoveGolem3:
        return RemoveGolem3
    }
    return
  }

  getLocations(context: MaterialContext): Location[] {
    const locations: Location[] = []
    const rules=context.rules
    const player=context.player

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
    const ruleId=rules.game.rule?.id
    if (ruleId===RuleId.AskGolemRemoval){
      if (player!==undefined){
        const tileX = rules.remind<number | undefined>(Memory.SpellTileX)
        const tileY = rules.remind<number | undefined>(Memory.SpellTileY)
        const tileIndex = rules.material(MaterialType.Tile)
          .location(LocationType.Board)
          .filter(item => item.location.x===tileX && item.location.y===tileY)
          .getIndex()

        rules.getLegalMoves(player).forEach(move => {
          if (isCustomMoveType(CustomMoveType.ChoosePlayer)(move)){
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
    if (ruleId===RuleId.AskSpellOrientation){
      if (player!==undefined){
        const hasSpellNorth = rules.remind(Memory.AppliedSpellNorth)!==true
        const hasSpellEast = rules.remind(Memory.AppliedSpellEast)!==true
        const hasSpellSouth = rules.remind(Memory.AppliedSpellSouth)!==true
        const hasSpellWest = rules.remind(Memory.AppliedSpellWest)!==true

        if (hasSpellNorth){
          const tileIndex=uiTileTools.activeSpellTargetItemIndex(context, Orientation.North)
          if (tileIndex!==undefined){
            locations.push({ type: LocationType.TileButton, id: TileButtonId.SelectSpellNorth, parent: tileIndex })
          }
        }
        if (hasSpellEast){
          const tileIndex=uiTileTools.activeSpellTargetItemIndex(context, Orientation.East)
          if (tileIndex!==undefined){
            locations.push({ type: LocationType.TileButton, id: TileButtonId.SelectSpellEast, parent: tileIndex })
          }
        }
        if (hasSpellSouth){
          const tileIndex=uiTileTools.activeSpellTargetItemIndex(context, Orientation.South)
          if (tileIndex!==undefined){
            locations.push({ type: LocationType.TileButton, id: TileButtonId.SelectSpellSouth, parent: tileIndex })
          }
        }
        if (hasSpellWest){
          const tileIndex=uiTileTools.activeSpellTargetItemIndex(context, Orientation.West)
          if (tileIndex!==undefined){
            locations.push({ type: LocationType.TileButton, id: TileButtonId.SelectSpellWest, parent: tileIndex })
          }
        }
      }
    }

    return locations
  }

  transformOwnLocation(location: Location, context: LocationContext): string[] {
    const { rules, locators } = context
    const tile = rules.material(MaterialType.Tile).getItem(location.parent!)!
    if ((tile===undefined) || (tile.location===undefined))
      return super.transformOwnLocation(location, context)
    return [
      locators[tile.location.type]!.getTranslate3d(tile, { ...context, type: MaterialType.Tile, index: location.parent!, displayIndex: 0 }),
      ...super.transformOwnLocation(location, context)
    ]
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
        console.log("*** ERROR - Unsupported button")
        return { x: tileDescription.width / 2, y: tileDescription.height / 2, z: 10 }
    }
  }

  getShortClickMove(location: Location, { rules }: MaterialContext) {
    if (this.isDisabled(location, rules)) return
    if (location.id === TileButtonId.Validate) {
      return rules.material(MaterialType.Tile).index(location.parent!).moveItem(item => item.location)
    } else if (location.id === TileButtonId.SelectSpellNorth) {
      return MaterialMoveBuilder.customMove(CustomMoveType.ChooseOrientation, Orientation.North)
    } else if (location.id === TileButtonId.SelectSpellEast) {
      return MaterialMoveBuilder.customMove(CustomMoveType.ChooseOrientation, Orientation.East)
    } else if (location.id === TileButtonId.SelectSpellSouth) {
      return MaterialMoveBuilder.customMove(CustomMoveType.ChooseOrientation, Orientation.South)
    } else if (location.id === TileButtonId.SelectSpellWest) {
      return MaterialMoveBuilder.customMove(CustomMoveType.ChooseOrientation, Orientation.West)
    } else if (location.id === TileButtonId.RemoveGolem1) {
      return MaterialMoveBuilder.customMove(CustomMoveType.ChoosePlayer, 1)
    } else if (location.id === TileButtonId.RemoveGolem2) {
      return MaterialMoveBuilder.customMove(CustomMoveType.ChoosePlayer, 2)
    } else if (location.id === TileButtonId.RemoveGolem3) {
      return MaterialMoveBuilder.customMove(CustomMoveType.ChoosePlayer, 3)
    }
    return
  }

  getShortClickLocalMove(location: Location, { rules, player }: MaterialContext) {
    if (location.id === TileButtonId.Cancel) {
      return rules.material(MaterialType.Tile).index(location.parent!).moveItem({ type: LocationType.PlayerHand, player })
    } else if (location.id === TileButtonId.Rotate) {
      return rules.material(MaterialType.Tile).index(location.parent!).moveItem(item => ({ ...item.location, rotation: item.location.rotation % 4 + 1 }))
    }
    return
  }

  isDisabled(location: Location, rules: MaterialRules) {
    // Filter moves for the tutorial only
    if (rules.game.tutorialStep === undefined || location.id !== TileButtonId.Validate) return false
    const tile = rules.material(MaterialType.Tile).index(location.parent!).getItem()!
    switch (tile.id) {
      case Tile.StoneCircle_32_11:
      case Tile.Cottage_23B_31_x:
        return tile.location.rotation !== Orientation.North
      case Tile.StoneCircle_21_22:
        return tile.location.rotation !== Orientation.East
      case Tile.Fortress_31_22_13B:
        return tile.location.rotation !== Orientation.South
      case Tile.StoneCircle_31_12:
        return tile.location.rotation !== Orientation.West
    }
    return false
  }
}
