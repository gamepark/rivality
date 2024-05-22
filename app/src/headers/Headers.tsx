/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/rivality/rules/RuleId'
import { ComponentType } from 'react'
import { AskGolemRemovalHeader } from './AskGolemRemovalHeader'
import { CastSpellHeader } from './CastSpellHeader'
import { ChooseTileHeader } from './ChooseTileHeader'
import { EndTurnHeader } from './EndTurnHeader'
import { RemoveGolemHeader } from './RemoveGolemHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.ChooseTile]: ChooseTileHeader,
  [RuleId.CastSpell]: CastSpellHeader,
  [RuleId.RemoveGolem]: RemoveGolemHeader,
  [RuleId.EndTurn]: EndTurnHeader,
  [RuleId.AskGolemRemoval]: AskGolemRemovalHeader
}
