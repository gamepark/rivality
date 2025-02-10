import { GameAI } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { PlayerColor } from '@gamepark/rivality/PlayerColor'
import { MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { RivalityBot } from './RivalityBot'

export const ai: GameAI<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>
  = (game: MaterialGame<PlayerColor, MaterialType, LocationType>, player: PlayerColor): Promise<MaterialMove[]> => {
  return Promise.resolve(new RivalityBot(player).run(game))
}
