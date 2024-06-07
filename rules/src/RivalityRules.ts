import {
  FillGapStrategy,
  hideItemId,
  hideItemIdToOthers,
  HidingStrategy,
  MaterialItem,
  SecretMaterialRules,
  PositiveSequenceStrategy,
  CompetitiveRank, MaterialGame, MaterialMove
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { AskGolemRemovalRule } from './rules/AskGolemRemovalRule'
import { CastSpellRule } from './rules/CastSpellRule'
import { ChooseTileRule } from './rules/ChooseTileRule'
import { EndTurnRule } from './rules/EndTurnRule'
import { RemoveGolemRule } from './rules/RemoveGolemRule'
import { StartRule } from './rules/StartRule'
import { ShufflePlayer1DeckRule } from './rules/ShufflePlayer1DeckRule'
import { PlayerId } from './PlayerId'
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
export class RivalityRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType>
  implements CompetitiveRank<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId> {
  rules = {
    [RuleId.Start]: StartRule,
    [RuleId.ChooseTile]: ChooseTileRule,
    [RuleId.CastSpell]: CastSpellRule,
    [RuleId.RemoveGolem]: RemoveGolemRule,
    [RuleId.AskGolemRemoval]: AskGolemRemovalRule,
    [RuleId.EndTurn]: EndTurnRule,
    [RuleId.ShufflePlayer1Deck]: ShufflePlayer1DeckRule
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

  rankPlayers(playerA: PlayerId, playerB: PlayerId): number {
    const playerScores=[
      this.computeScore(1),
      this.computeScore(2),
      this.computeScore(3)
    ]
    const playerControllingWellOfMana:PlayerId|undefined=this.getPlayerControllingWellOfMana()

    let highscore=playerScores[0]
    if (playerScores[1]>highscore) highscore=playerScores[1]
    if (playerScores[2]>highscore) highscore=playerScores[2]

    let nbPlayersWithHighScore=0
    for (let i=0; i<3; i++){
      if (playerScores[i] == highscore)
        nbPlayersWithHighScore++
    }

    // In case multiple players have the highscore,
    // the winner is the player controlling the well of mana
    // even if his/her score is lower than the highscore
    //
    // then players are ranked through their score
    if (nbPlayersWithHighScore>1){
      if (playerA===playerControllingWellOfMana)
        return -1
      if (playerB===playerControllingWellOfMana)
        return 1
    }

    // Then rank by score
    const scoreA=playerScores[playerA-1]
    const scoreB=playerScores[playerB-1]

    if (scoreA < scoreB)
      return 1
    if (scoreA > scoreB)
      return -1
    return 0
  }

  // Do not use getScore() in order to rank players according to the rules of the game
  computeScore(player: PlayerId) {
    return score.playerScore(
      player,
      this.material(MaterialType.Tile).location(LocationType.Board),
      this.material(MaterialType.Golem).location(LocationType.Board),
      this.material(MaterialType.Wizard).location(LocationType.Board)
    )
  }

  getPlayerControllingWellOfMana() : PlayerId|undefined {
    return score.playerControllingWellOfMana(
      this.material(MaterialType.Golem).location(LocationType.Board)
    )
  }
}
