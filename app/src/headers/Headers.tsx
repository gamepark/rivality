/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/rivality/rules/RuleId'
import { ComponentType } from 'react'
import { AskGolemRemovalHeader } from './AskGolemRemovalHeader'
import { CastSpellHeader } from './CastSpellHeader'
import { ChooseTileHeader } from './ChooseTileHeader'
import { EndTurnHeader } from './EndTurnHeader'
import { RemoveGolemHeader } from './RemoveGolemHeader'
import { StartHeader } from './StartHeader'
import { ShufflePlayer1DeckHeader } from './ShufflePlayer1DeckHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.Start]: StartHeader,
  [RuleId.ChooseTile]: ChooseTileHeader,
  [RuleId.CastSpell]: CastSpellHeader,
  [RuleId.RemoveGolem]: RemoveGolemHeader,
  [RuleId.AskGolemRemoval]: AskGolemRemovalHeader,
  [RuleId.EndTurn]: EndTurnHeader,
  [RuleId.ShufflePlayer1Deck]: ShufflePlayer1DeckHeader
}
