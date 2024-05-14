/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/rivality/rules/RuleId'
import { ComponentType } from 'react'
import { ChooseTileHeader } from './ChooseTileHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.ChooseTile]: ChooseTileHeader
}
