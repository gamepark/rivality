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
import { spaceBetweenTiles, tileDescription } from '../../material/TileDescription'

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

  getLocations({ rules }: MaterialContext): Location[] {
    const tilePreview = rules.remind<number | undefined>(Memory.TilePreview)
    if (tilePreview !== undefined) {
      return [
        { type: LocationType.TileButton, id: TileButtonId.Cancel },
        { type: LocationType.TileButton, id: TileButtonId.Rotate },
        { type: LocationType.TileButton, id: TileButtonId.Validate }
      ]
    }
    return []
  }

  getCoordinates(location: Location, { rules }: LocationContext) {
    const tilePreview = rules.remind<number>(Memory.TilePreview)
    const tile = rules.material(MaterialType.Tile).getItem(tilePreview)!
    const coordinates = {
      x: tile.location.x! * (tileDescription.width + spaceBetweenTiles),
      y: tile.location.y! * (tileDescription.height + spaceBetweenTiles),
      z: 1
    }
    switch (location.id) {
      case TileButtonId.Cancel:
        coordinates.x -= tileDescription.width / 2
        coordinates.y -= tileDescription.height / 2
        break
      case TileButtonId.Rotate:
        coordinates.x += tileDescription.width / 2
        coordinates.y -= tileDescription.height / 2
        break
      case TileButtonId.Validate:
        coordinates.x += tileDescription.width / 2
        coordinates.y += tileDescription.height / 2
        break
    }
    return coordinates
  }

  getShortClickMove(location: Location, { rules }: MaterialContext) {
    if (location.id === TileButtonId.Validate) {
      const tilePreview = rules.remind(Memory.TilePreview)
      return rules.material(MaterialType.Tile).index(tilePreview).moveItem(item => item.location)
    }
    return
  }

  getShortClickLocalMove(location: Location, { rules, player }: MaterialContext) {
    if (location.id === TileButtonId.Cancel) {
      const tilePreview = rules.remind(Memory.TilePreview)
      return rules.material(MaterialType.Tile).index(tilePreview).moveItem({ type: LocationType.PlayerHand, player })
    } else if (location.id === TileButtonId.Rotate) {
      const tilePreview = rules.remind(Memory.TilePreview)
      return rules.material(MaterialType.Tile).index(tilePreview).moveItem(item => ({ ...item.location, rotation: item.location.rotation % 4 + 1 }))
    }
    return
  }
}

export enum TileButtonId {
  Cancel, Rotate, Validate
}
