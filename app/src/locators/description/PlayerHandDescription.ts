/** @jsxImportSource @emotion/react */
//import { css } from '@emotion/react'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { ItemContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { tileDescription } from '../../material/TileDescription'
import { tableDesign } from '../position/TableDesign'

export class PlayerHandDescription extends LocationDescription {
  width = tileDescription.width*2
  height = tileDescription.height
  borderRadius = tileDescription.borderRadius

//  alwaysVisible = true
//  extraCss = css`border: 0.05em solid white`

  getLocations(context: MaterialContext): Location[] {
    const { rules } = context
    const locations : Location[] = []

    for (let i=1; i<=2; i++){
      rules.players.forEach(p => {
        locations.push({
          type: LocationType.PlayerHand,
          player: p,
          x: i
        })
      })
    }
    return locations
  }

  getCoordinates(location: Location, context: ItemContext) {
    const coordinates = tableDesign.playerHandCoordinates(location, context)
    return {
      x: coordinates.x,
      y: coordinates.y,
      z: 5
    }
  }
}
