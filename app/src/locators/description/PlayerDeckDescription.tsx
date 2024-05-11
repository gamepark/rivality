/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { tileDescription } from '../../material/TileDescription'
import { tableDesign } from '../position/TableDesign'

export class PlayerDeckDescription extends LocationDescription {
  height = tileDescription.height
  width = tileDescription.width
  borderRadius = tileDescription.borderRadius

  alwaysVisible = true
  extraCss = css`border: 0.05em solid white`

  location = { type: LocationType.PlayerDeck }

  getLocations(context: MaterialContext) : Location[]  {
    const { rules } = context
    const locations : Location[] = []

    rules.players.forEach(p => {
      locations.push({
        type: LocationType.PlayerDeck,
        player: p
        })
      })
    return locations
  }

  getCoordinates(location: Location, context: LocationContext) {
    const baseCoordinates=tableDesign.playerDeckCoordinates(location, context)
    return {
      x: baseCoordinates.x,
      y: baseCoordinates.y,
      z: 0
    }
  }
}
