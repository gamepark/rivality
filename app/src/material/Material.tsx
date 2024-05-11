import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { golemDescription } from './GolemDescription'
import { tileDescription } from './TileDescription'
import { wizardDescription } from './WizardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.Tile]: tileDescription,
  [MaterialType.Wizard]: wizardDescription,
  [MaterialType.Golem]: golemDescription
}
