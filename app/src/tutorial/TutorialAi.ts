import { RivalityDummy } from './RivalityDummy'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { PlayerColor } from '@gamepark/rivality/PlayerColor'
import { GameAI } from '@gamepark/react-game'
import { MaterialGame, MaterialMove } from '@gamepark/rules-api'

export const ai: GameAI<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>
  = (game: MaterialGame<PlayerColor, MaterialType, LocationType>, bot: PlayerColor): Promise<MaterialMove[]> => {
  return new RivalityDummy().getRandomMove(game, bot)
}
