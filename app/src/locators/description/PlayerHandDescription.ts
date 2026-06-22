import { LocationDescription } from '@gamepark/react-game'
import { tileDescription } from '../../material/TileDescription'

export class PlayerHandDescription extends LocationDescription {
  width = tileDescription.width * 2
  height = tileDescription.height
  borderRadius = tileDescription.borderRadius
}
