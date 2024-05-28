import { FillGapStrategy, hideItemId, hideItemIdToOthers, HidingStrategy, MaterialItem, SecretMaterialRules, PositiveSequenceStrategy } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerId } from './PlayerId'
import { AskGolemRemovalRule } from './rules/AskGolemRemovalRule'
import { CastSpellRule } from './rules/CastSpellRule'
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
    [RuleId.CastSpell]: CastSpellRule,
    [RuleId.RemoveGolem]: RemoveGolemRule,
    [RuleId.EndTurn]: EndTurnRule,
    [RuleId.AskGolemRemoval]: AskGolemRemovalRule
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
