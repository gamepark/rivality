/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class PlayerDeckQuantityDescription extends LocationDescription {
  height = 0.8
  width = 1

  extraCss = css`
    display: flex;
    align-items: center;
    justify-content: center;
  `

  content = QuantityDisplay
}

const QuantityDisplay = ({ location }: { location: Location }) => {
  if (location.id <= 0)
    return <></>
  return <span css={scoreStyle}>{location.id}</span>
}

const scoreStyle = css`
  font-size: 1em;
  color: white;
  font-weight: bold;
`
