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

    for (let i=0; i<30; i++){
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
    const nbPlayers=context.rules.game.players.length
//    const golemPlayer=location.player
    const baseCoordinates = tableDesign.playerGolemStackCoordinates(location, context)
    let nbGolemsPerLine=(nbPlayers===2 ? 10 : 5)
    let nbGolemsLines=(nbPlayers===2 ? 3 : 4)

    /*
    if (nbPlayers===3 && golemPlayer===2){
      let tmp=nbGolemsPerLine
      nbGolemsPerLine=nbGolemsLines
      nbGolemsLines=tmp
    }
    */

    const indexX=Math.floor(location.x!%nbGolemsPerLine)
    const indexY=Math.floor(location.x!/nbGolemsPerLine)
    const deltaX=indexX*(golemDescription.width+spaceBetweenGolems)
    const deltaY=indexY*(golemDescription.height+spaceBetweenGolems)
    return {
      x: baseCoordinates.x + deltaX - (nbGolemsPerLine/2)*(golemDescription.width+spaceBetweenGolems)+spaceBetweenGolems*1.5,
      y: baseCoordinates.y + deltaY - (nbGolemsLines/2)*(golemDescription.height+spaceBetweenGolems)+spaceBetweenGolems*1.5,
      z: location.x!+1
    }
  }
}
