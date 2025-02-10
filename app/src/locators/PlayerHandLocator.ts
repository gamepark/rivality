/** @jsxImportSource @emotion/react */
import { HandLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { Location } from '@gamepark/rules-api'
import { PlayerHandDescription } from './description/PlayerHandDescription'
import { tableDesign } from './position/TableDesign'

export class PlayerHandLocator extends HandLocator {
  locationDescription = new PlayerHandDescription()

  getLocations(context: MaterialContext): Location[] {
    const { rules } = context
    const locations: Location[] = []

    for (let i = 1; i <= 2; i++) {
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

  clockwise = false

  getCoordinates(location: Location, context: ItemContext) {
    const baseCoordinates = tableDesign.playerHandCoordinates(location, context)
    return { x: baseCoordinates.x, y: baseCoordinates.y, z: 1 }
  }

  radius = 125

  getBaseAngle(location: Location, context: MaterialContext): number {
    return tableDesign.rotateZForPlayer(location.player, context)
  }
}

export const playerHandLocator = new PlayerHandLocator()
