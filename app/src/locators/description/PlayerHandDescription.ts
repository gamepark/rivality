/** @jsxImportSource @emotion/react */
import { ItemContext, LocationDescription } from '@gamepark/react-game'
//import { css } from '@emotion/react'
import { Location } from '@gamepark/rules-api'
import { tileDescription } from '../../material/TileDescription'
import { tableDesign } from '../position/TableDesign'

export class PlayerHandDescription extends LocationDescription {
  width = tileDescription.width*2
  height = tileDescription.height
  borderRadius = tileDescription.borderRadius

//  alwaysVisible = true
//  extraCss = css`border: 0.05em solid white`

  getCoordinates(location: Location, context: ItemContext) {
    const coordinates = tableDesign.playerHandCoordinates(location, context)
    return {
      x: coordinates.x,
      y: coordinates.y,
      z: 5
    }
  }
}
