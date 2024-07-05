/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { Memory } from '@gamepark/rivality/rules/Memory'
import { Location } from '@gamepark/rules-api'
import Cancel from '../../images/icon/cancel.png'
import Rotator from '../../images/icon/rotator.png'
import Validate from '../../images/icon/validate.png'
import { buttonDescription } from '../../material/ButtonDescription'
import { tileDescription } from '../../material/TileDescription'

export class TileButtonDescription extends LocationDescription {
  height = buttonDescription.height
  width = buttonDescription.width
  borderRadius = 1.5
  alwaysVisible = true

  extraCss = css`
    box-shadow: 0 0 0.3em black;
  `

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
    if (location.id === TileButtonId.Validate) {
      return rules.material(MaterialType.Tile).index(location.parent!).moveItem(item => item.location)
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
}

export enum TileButtonId {
  Cancel, Rotate, Validate
}
