/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/rivality/rules/RuleId'
import { ComponentType } from 'react'
import { ApplySpellEffectHeader } from './ApplySpellEffectHeader'
import { AskGolemRemovalHeader } from './AskGolemRemovalHeader'
import { AskSpellOrientationHeader } from './AskSpellOrientationHeader'
import { ChooseTileHeader } from './ChooseTileHeader'
import { EndTurnHeader } from './EndTurnHeader'
import { PrepareCastSpellHeader } from './PrepareCastSpellHeader'
import { RemoveGolemHeader } from './RemoveGolemHeader'
import { SelectCastSpellOrientationHeader } from './SelectCastSpellOrientationHeader'
import { ShufflePlayer1DeckHeader } from './ShufflePlayer1DeckHeader'
import { StartHeader } from './StartHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.Start]: StartHeader,
  [RuleId.ChooseTile]: ChooseTileHeader,
  [RuleId.SelectCastSpellOrientation]: SelectCastSpellOrientationHeader,
  [RuleId.RemoveGolem]: RemoveGolemHeader,
  [RuleId.AskGolemRemoval]: AskGolemRemovalHeader,
  [RuleId.EndTurn]: EndTurnHeader,
  [RuleId.ShufflePlayer1Deck]: ShufflePlayer1DeckHeader,
  [RuleId.PrepareCastSpell]: PrepareCastSpellHeader,
  [RuleId.ApplySpellEffect]: ApplySpellEffectHeader,
  [RuleId.AskSpellOrientation]: AskSpellOrientationHeader
}
