import { HidingStrategy, MaterialItem, HiddenMaterialRules, PositiveSequenceStrategy } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { PlayerTurn } from './rules/PlayerTurn'
import { RuleId } from './rules/RuleId'

export const hideCardWhenNotRotated: HidingStrategy = (
  item: MaterialItem
) => {
  return item.location.rotation ? [] : ['id']
}
export const alwaysHide: HidingStrategy = () => {
  return ['id']
}

export const alwaysShow: HidingStrategy = () => {
  return []
}

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class RivalityRules extends HiddenMaterialRules<PlayerColor, MaterialType, LocationType> {
  rules = {
    [RuleId.PlayerTurn]: PlayerTurn
  }

  locationsStrategies = {
    [MaterialType.Tile]: {
      [LocationType.PlayerDeck]: new PositiveSequenceStrategy()
    },
    [MaterialType.Wizard]: {
    },
    [MaterialType.Golem]: {
      [LocationType.Board]: new PositiveSequenceStrategy(),
      [LocationType.PlayerGolemStack]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.Tile]: {
      [LocationType.PlayerDeck]: hideCardWhenNotRotated, // alwaysHide,
      [LocationType.PlayerHand]: alwaysShow, // TODO - hide opponents' cards
      [LocationType.Board]: alwaysShow
    }
  }

  itemsCanMerge() {
    return false
  }
}
