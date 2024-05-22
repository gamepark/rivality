import { FillGapStrategy, hideItemId, hideItemIdToOthers, HidingStrategy, MaterialItem, SecretMaterialRules, PositiveSequenceStrategy } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerId } from './PlayerId'
import { CastSpellNorthRule } from './rules/CastSpellNorthRule'
import { CastSpellEastRule } from './rules/CastSpellEastRule'
import { CastSpellSouthRule } from './rules/CastSpellSouthRule'
import { CastSpellWestRule } from './rules/CastSpellWestRule'
import { ChooseTileRule } from './rules/ChooseTileRule'
import { EndTurnRule } from './rules/EndTurnRule'
import { RemoveGolemRule } from './rules/RemoveGolemRule'
import { RuleId } from './rules/RuleId'
import { score } from './logic/Score'

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
export class RivalityRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType> {
  rules = {
    [RuleId.ChooseTile]: ChooseTileRule,
    [RuleId.CastSpellNorth]: CastSpellNorthRule,
    [RuleId.CastSpellEast]: CastSpellEastRule,
    [RuleId.CastSpellSouth]: CastSpellSouthRule,
    [RuleId.CastSpellWest]: CastSpellWestRule,
    [RuleId.RemoveGolem]: RemoveGolemRule,
    [RuleId.EndTurn]: EndTurnRule
  }

  locationsStrategies = {
    [MaterialType.Tile]: {
      [LocationType.PlayerDeck]: new PositiveSequenceStrategy()
    },
    [MaterialType.Wizard]: {
    },
    [MaterialType.Golem]: {
      [LocationType.Board]: new PositiveSequenceStrategy('z'), // sequence on Z
      [LocationType.PlayerGolemStack]: new FillGapStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.Tile]: {
      [LocationType.PlayerDeck]: hideItemId, // alwaysHide,
      [LocationType.PlayerHand]: hideItemIdToOthers,
      [LocationType.Board]: alwaysShow
    }
  }

  itemsCanMerge() {
    return false
  }

  getScore(player: PlayerId) {
    return score.playerScore(
      player,
      this.material(MaterialType.Tile).location(LocationType.Board),
      this.material(MaterialType.Golem).location(LocationType.Board),
      this.material(MaterialType.Wizard).location(LocationType.Board)
    )
  }
}
