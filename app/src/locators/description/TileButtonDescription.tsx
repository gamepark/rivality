/** @jsxImportSource @emotion/react */
import { css, Interpolation, Theme } from '@emotion/react'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { Tile } from '@gamepark/rivality/material/Tile'
import { Orientation } from '@gamepark/rivality/Orientation'
import { Memory } from '@gamepark/rivality/rules/Memory'
import { Location, MaterialRules } from '@gamepark/rules-api'
import Cancel from '../../images/icon/cancel.png'
import Rotator from '../../images/icon/rotator.png'
import Validate from '../../images/icon/validate.png'
import { buttonDescription } from '../../material/ButtonDescription'
import { tileDescription } from '../../material/TileDescription'

export enum TileButtonId {
  Cancel,
  Rotate,
  Validate
/*
  ,
  SelectSpellNorth,
  SelectSpellEast,
  SelectSpellSouth,
  SelectSpellWest
*/
}

export class TileButtonDescription extends LocationDescription {
  height = buttonDescription.height
  width = buttonDescription.width
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
        return Validate
    }
    return
  }

  getLocations({ rules, player }: MaterialContext): Location[] {
    const locations: Location[] = []
    const tilePreview = rules.remind<number | undefined>(Memory.TilePreview)
    if (tilePreview !== undefined) {
      locations.push(
        { type: LocationType.TileButton, id: TileButtonId.Cancel, parent: tilePreview },
        { type: LocationType.TileButton, id: TileButtonId.Rotate, parent: tilePreview },
        { type: LocationType.TileButton, id: TileButtonId.Validate, parent: tilePreview }
      )
    }
    if (player !== undefined) {
      for (const index of rules.material(MaterialType.Tile).location(LocationType.PlayerHand).player(player).getIndexes()) {
        locations.push({ type: LocationType.TileButton, id: TileButtonId.Rotate, parent: index })
      }
    }
    return locations
  }

  transformOwnLocation(location: Location, context: LocationContext): string[] {
    const { rules, locators } = context
    const tile = rules.material(MaterialType.Tile).getItem(location.parent!)!
    return [
      locators[tile.location.type]!.getTranslate3d(tile, { ...context, type: MaterialType.Tile, index: location.parent!, displayIndex: 0 }),
      ...super.transformOwnLocation(location, context)
    ]
  }

  getCoordinates(location: Location) {
    switch (location.id) {
      case TileButtonId.Cancel:
        return { x: -tileDescription.width / 2, y: -tileDescription.height / 2, z: 0.1 }
      case TileButtonId.Rotate:
        return { x: tileDescription.width / 2, y: -tileDescription.height / 2, z: 0.1 }
      case TileButtonId.Validate:
      default:
        return { x: tileDescription.width / 2, y: tileDescription.height / 2, z: 0.1 }
    }
  }

  getShortClickMove(location: Location, { rules }: MaterialContext) {
    if (this.isDisabled(location, rules)) return
    if (location.id === TileButtonId.Validate) {
      return rules.material(MaterialType.Tile).index(location.parent!).moveItem(item => item.location)
/*
    } else if (location.id === TileButtonId.SelectSpellNorth) {
      return rules.customMove(CustomMoveType.North)
    } else if (location.id === TileButtonId.SelectSpellEast) {
      return rules.customMove(CustomMoveType.East)
    } else if (location.id === TileButtonId.SelectSpellSouth) {
      return rules.customMove(CustomMoveType.South)
    } else if (location.id === TileButtonId.SelectSpellWest) {
      return rules.customMove(CustomMoveType.West)
*/
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
