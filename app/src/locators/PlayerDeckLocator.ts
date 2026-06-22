import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { Location } from '@gamepark/rules-api'
import { PlayerDeckDescription } from './description/PlayerDeckDescription'
import { tableDesign } from './position/TableDesign'

class PlayerDeckLocator extends DeckLocator {
  locationDescription = new PlayerDeckDescription()

  getLocations(context: MaterialContext): Location[] {
    const { rules } = context
    const locations: Location[] = []

    rules.players.forEach(p => {
      locations.push({
        type: LocationType.PlayerDeck,
        player: p
      })
      const nbTiles = rules.material(MaterialType.Tile).location(LocationType.PlayerDeck).player(p).length
      locations.push({
        type: LocationType.PlayerDeckQuantity,
        player: p,
        id: nbTiles
      })
    })
    return locations
  }

  getPositionDependencies(_location: Location, context: MaterialContext) {
    // The player areas reposition when the board (and thus the table size) grows
    return tableDesign.getBoardDimensions(context.rules)
  }

  getCoordinates(location: Location, context: MaterialContext) {
    return tableDesign.playerDeckCoordinates(location, context)
  }

  getRotateZ(location: Location, context: MaterialContext): number {
    return tableDesign.rotateZForPlayer(location.player, context)
  }
}

export const playerDeckLocator = new PlayerDeckLocator()
