import { css } from '@emotion/react'
import { LocationDescription } from '@gamepark/react-game'
import { tileDescription } from '../../material/TileDescription'

export class PlayerDeckDescription extends LocationDescription {
  constructor() {
    super(tileDescription)
  }

  extraCss = css`border: 0.05em solid white`
}
