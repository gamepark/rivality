/** @jsxImportSource @emotion/react */
//import { css } from '@emotion/react'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { LocationContext, LocationDescription /*, MaterialContext*/ } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { buttonDescription } from '../../material/ButtonDescription'
import { tableDesign } from '../position/TableDesign'

export class PlayerButtonDescription extends LocationDescription {
  height = buttonDescription.height
  width = buttonDescription.width

//  alwaysVisible = true
//  extraCss = css`border: 0.05em solid white`

  location = { type: LocationType.PlayerButton }

  getCoordinates(location: Location, context: LocationContext) {
    return tableDesign.playerButtonCoordinates(location, context)
  }
}
