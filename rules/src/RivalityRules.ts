import {
  CompetitiveRank,
  FillGapStrategy,
  hideItemId,
  hideItemIdToOthers,
  isMoveItemType,
  LocalMovePreview,
  MaterialGame,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules
} from '@gamepark/rules-api'
import { score } from './logic/Score'
import { tileTools } from './logic/TileTools'
import { wizardTools } from './logic/WizardTools'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerId } from './PlayerId'
import { ApplySpellEffectRule } from './rules/ApplySpellEffectRule'
import { AskGolemRemovalRule } from './rules/AskGolemRemovalRule'
import { AskSpellOrientationRule } from './rules/AskSpellOrientationRule'
import { ChooseTileRule } from './rules/ChooseTileRule'
import { EndTurnRule } from './rules/EndTurnRule'
import { Memory } from './rules/Memory'
import { PrepareCastSpellRule } from './rules/PrepareCastSpellRule'
import { RemoveGolemRule } from './rules/RemoveGolemRule'
import { RuleId } from './rules/RuleId'
import { SelectCastSpellOrientationRule } from './rules/SelectCastSpellOrientationRule'
import { ShufflePlayer1DeckRule } from './rules/ShufflePlayer1DeckRule'
import { StartRule } from './rules/StartRule'
import isEqual from 'lodash/isEqual'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class RivalityRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType>
  implements CompetitiveRank<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId>,
    LocalMovePreview<MaterialMove<PlayerId, MaterialType, LocationType>> {
  rules = {
    [RuleId.Start]: StartRule,
    [RuleId.ChooseTile]: ChooseTileRule,
    [RuleId.SelectCastSpellOrientation]: SelectCastSpellOrientationRule,
    [RuleId.RemoveGolem]: RemoveGolemRule,
    [RuleId.AskGolemRemoval]: AskGolemRemovalRule,
    [RuleId.EndTurn]: EndTurnRule,
    [RuleId.ShufflePlayer1Deck]: ShufflePlayer1DeckRule,
    [RuleId.PrepareCastSpell]: PrepareCastSpellRule,
    [RuleId.ApplySpellEffect]: ApplySpellEffectRule,
    [RuleId.AskSpellOrientation]: AskSpellOrientationRule
  }

  locationsStrategies = {
    [MaterialType.Tile]: {
      [LocationType.PlayerHand]: new PositiveSequenceStrategy(),
      [LocationType.PlayerDeck]: new PositiveSequenceStrategy()
    },
    [MaterialType.Wizard]: {},
    [MaterialType.Golem]: {
      [LocationType.Board]: new PositiveSequenceStrategy('z'), // sequence on Z
      [LocationType.PlayerGolemStack]: new FillGapStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.Tile]: {
      [LocationType.PlayerDeck]: hideItemId, // alwaysHide,
      [LocationType.PlayerHand]: hideItemIdToOthers
    }
  }

  itemsCanMerge() {
    return false
  }

  previewMove(move: MaterialMove) {
    if (isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.Board) {
      const tilePreview = this.remind(Memory.TilePreview)
      return tilePreview !== move.itemIndex || !isEqual(this.material(MaterialType.Tile).getItem(move.itemIndex)?.location, move.location)
    }
    return false
  }

  rankPlayers(playerA: PlayerId, playerB: PlayerId): number {
    const playerScores = [
      this.computeScore(1),
      this.computeScore(2),
      this.computeScore(3)
    ]
    const playerControllingWellOfMana: PlayerId | undefined = this.getPlayerControllingWellOfMana()

    let highscore = playerScores[0]
    if (playerScores[1] > highscore) highscore = playerScores[1]
    if (playerScores[2] > highscore) highscore = playerScores[2]

    let nbPlayersWithHighScore = 0
    for (let i = 0; i < 3; i++) {
      if (playerScores[i] == highscore)
        nbPlayersWithHighScore++
    }

    // In case multiple players have the highscore,
    // the winner is the player controlling the well of mana
    // even if his/her score is lower than the highscore
    //
    // then players are ranked through their score
    if (nbPlayersWithHighScore > 1) {
      if (playerA === playerControllingWellOfMana)
        return -1
      if (playerB === playerControllingWellOfMana)
        return 1
    }

    // Then rank by score
    const scoreA = playerScores[playerA - 1]
    const scoreB = playerScores[playerB - 1]

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

  getPlayerControllingWellOfMana(): PlayerId | undefined {
    return score.playerControllingWellOfMana(
      this.material(MaterialType.Golem).location(LocationType.Board)
    )
  }

  // To get the value of the tile occupied by the wizard of the given player
  computeWizardTileScore(player: PlayerId) {
    const playerWizard = wizardTools.playerWizard(player)

    const wizardLocation = this.material(MaterialType.Wizard)
      .location(LocationType.Board)
      .filter(item => item.id === playerWizard)
      .getItem()!
      .location!

    if (wizardLocation !== undefined) {
      const tileAtWizardLocation = this.material(MaterialType.Tile)
        .location(LocationType.Board)
        .filter(item => item.location.x === wizardLocation.x && item.location.y === wizardLocation.y)
      if (tileAtWizardLocation.length > 0) {
        const tile = tileAtWizardLocation.limit(1).getItem()!.id
        return tileTools.tileScore(tile)
      }
    }
    // No tile => score = 0
    return 0
  }
}
