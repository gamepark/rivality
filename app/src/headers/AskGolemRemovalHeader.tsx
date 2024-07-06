/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Picture } from '@gamepark/react-game'
import { CustomMoveType } from '@gamepark/rivality/rules/CustomMoveType'
import { RivalityRules } from '@gamepark/rivality/RivalityRules'
import { PlayMoveButton, useLegalMove, usePlayerName, usePlayerId, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import removeGolem1Icon from '../images/icon/no_golem1b.png'
import removeGolem2Icon from '../images/icon/no_golem2b.png'
import removeGolem3Icon from '../images/icon/no_golem3b.png'

export const AskGolemRemovalHeader = () => {
  const p1 = useLegalMove(isCustomMoveType(CustomMoveType.Player1))
  const p2 = useLegalMove(isCustomMoveType(CustomMoveType.Player2))
  const p3 = useLegalMove(isCustomMoveType(CustomMoveType.Player3))

  const { t } = useTranslation()
  const playerId = usePlayerId()
  const activePlayer = useRules<RivalityRules>()?.game.rule?.player
  const player = usePlayerName(activePlayer)

  if (playerId !== undefined && activePlayer === playerId) {
    return <><Trans defaults="header.ask.golem.removal.you"></Trans>&nbsp;
    {p1 !== undefined && <PlayMoveButton move={p1}>
      <Picture css={iconCss} src={removeGolem1Icon}/>
    </PlayMoveButton>}
    {p2 !== undefined && <PlayMoveButton move={p2}>
      <Picture css={iconCss} src={removeGolem2Icon}/>
    </PlayMoveButton>}
    {p3 !== undefined && <PlayMoveButton move={p3}>
      <Picture css={iconCss} src={removeGolem3Icon}/>
    </PlayMoveButton>}
    </>
  } else {
    return <>{t('header.ask.golem.removal.player', { player })}</>
  }
}

const iconCss=css`
  vertical-align: top;
  max-height: 1em;
`
