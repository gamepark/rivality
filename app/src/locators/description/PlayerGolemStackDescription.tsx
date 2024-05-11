/** @jsxImportSource @emotion/react */
//import { css } from '@emotion/react'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { golemDescription, spaceBetweenGolems } from '../../material/GolemDescription'
import { tableDesign } from '../position/TableDesign'

export class PlayerGolemStackDescription extends LocationDescription {
  height = golemDescription.height
  width = golemDescription.width

//  alwaysVisible = true
//  extraCss = css`border: 0.05em solid white`

  location = { type: LocationType.PlayerGolemStack }

  getLocations(context: MaterialContext) : Location[]  {
    const { rules } = context
    const locations : Location[] = []

    for (let i=1; i<=30; i++){
      rules.players.forEach(p => {
        locations.push({
          type: LocationType.PlayerGolemStack,
          player: p,
          x: i
        })
      })
    }
    return locations
  }

  getCoordinates(location: Location, context: LocationContext) {
    const baseCoordinates = tableDesign.playerGolemStackCoordinates(location, context)
    const nbGolemsPerLine=10
    const nbGolemsLines=3
    const indexX=Math.floor((location.x!-1)%nbGolemsPerLine)
    const indexY=Math.floor((location.x!-1)/nbGolemsPerLine)
    console.log(indexX+" - "+indexY)
    const deltaX=indexX*(golemDescription.width+spaceBetweenGolems)
    const deltaY=indexY*(golemDescription.height+spaceBetweenGolems)
    return {
      x: baseCoordinates.x + deltaX - (nbGolemsPerLine/2)*(golemDescription.width+spaceBetweenGolems),
      y: baseCoordinates.y + deltaY - (nbGolemsLines/2)*(golemDescription.height+spaceBetweenGolems),
      z: location.x!+1
    }
  }
}
