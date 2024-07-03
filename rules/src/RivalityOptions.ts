import { OptionsSpec } from '@gamepark/rules-api'
import { TFunction } from 'i18next'

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type RivalityOptions = {
  players: number,
  realTimeScore: boolean
}

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const RivalityOptionsSpec: OptionsSpec<RivalityOptions> = {
  realTimeScore: {
    label: (t: TFunction) => t('real-time-scores'),
    help: (t: TFunction) => t('real-time-scores.help'),
    competitiveDisabled: true
  }
}
