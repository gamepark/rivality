import { TFunction, OptionsSpecV2 } from '@gamepark/rules-api'
import { PlayerColor, playerColors } from './PlayerColor'

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type RivalityOptions = {
  players: { id: PlayerColor }[],
  realTimeScore: boolean
}

/**
 * The option space of rivality: structure only.
 *
 * Labels live in the game's presentation document, published beside its translations at
 * `/options/<locale>.json` and keyed by convention. Subscription and competitive gates live in
 * the platform database, so they can change without releasing the game again.
 *
 * That is where the competitive settings went.
 */
export const RivalityOptionsSpecV2: OptionsSpecV2 = {
  specVersion: 2,
  players: { min: 2, max: 3 },
  identities: { values: playerColors },
  options: {
    realTimeScore: { kind: 'boolean' }
  }
}

export function getPlayerName(playerId: PlayerColor, t: TFunction) {
  switch (playerId) {
    case PlayerColor.Purple:
      return t('Purple')
    case PlayerColor.Orange:
      return t('Orange')
    case PlayerColor.Green:
      return t('Green')
  }
}
