/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/rivality/rules/RuleId'
import { ComponentType } from 'react'
import { AskGolemRemovalHeader } from './AskGolemRemovalHeader'
import { CastSpellEastHeader } from './CastSpellEastHeader'
import { CastSpellNorthHeader } from './CastSpellNorthHeader'
import { CastSpellSouthHeader } from './CastSpellSouthHeader'
import { CastSpellWestHeader } from './CastSpellWestHeader'
import { ChooseTileHeader } from './ChooseTileHeader'
import { EndTurnHeader } from './EndTurnHeader'
import { RemoveGolemHeader } from './RemoveGolemHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.ChooseTile]: ChooseTileHeader,
  [RuleId.CastSpellNorth]: CastSpellNorthHeader,
  [RuleId.CastSpellEast]:  CastSpellEastHeader,
  [RuleId.CastSpellSouth]: CastSpellSouthHeader,
  [RuleId.CastSpellWest]:  CastSpellWestHeader,
  [RuleId.RemoveGolem]: RemoveGolemHeader,
  [RuleId.EndTurn]: EndTurnHeader,
  [RuleId.AskGolemRemoval]: AskGolemRemovalHeader
}
