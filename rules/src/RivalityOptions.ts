import { OptionsSpec } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
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
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const RivalityOptionsSpec: OptionsSpec<RivalityOptions> = {
  players: {
    id: {
      label: (t: TFunction) => t('Player color'),
      values: playerColors,
      valueSpec: color => ({ label: t => getPlayerName(color, t) })
    }
  },
  realTimeScore: {
    label: (t: TFunction) => t('real-time-scores'),
    help: (t: TFunction) => t('real-time-scores.help'),
    competitiveDisabled: true
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
