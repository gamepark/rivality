/** @jsxImportSource @emotion/react */
import { MaterialHelpProps, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Direction } from '@gamepark/rivality/logic/Direction'
import { tileSpells } from '@gamepark/rivality/logic/TileSpells'
import { tileTools } from '@gamepark/rivality/logic/TileTools'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { Tile } from '@gamepark/rivality/material/Tile'
import { PlayerColor } from '@gamepark/rivality/PlayerColor'
import { RivalityRules } from '@gamepark/rivality/RivalityRules'
import { useTranslation } from 'react-i18next'
import { SpellHelp, SymbolShield } from './HelpTools'

export const TileHelp = (props: MaterialHelpProps) => {
  const { item } = props
  const playerId = usePlayerId()
  const playerLocation = item.location!.player!
  const playerLocationName = usePlayerName(playerLocation!)
  const rules=useRules<RivalityRules>()
  const { t } = useTranslation()

  if (item.id === undefined) {
    const locationType=item.location!.type
    if (locationType===LocationType.PlayerHand){
      if (playerLocation===playerId){
        return <><h2>{t('help.hand.you')}</h2></>
      } else {
        return <><h2>{t('help.hand.player', {player:playerLocationName})}</h2></>
      }
    } else if (locationType===LocationType.PlayerDeck){
      const nbCards=rules?.material(MaterialType.Tile).location(LocationType.PlayerDeck).player(playerLocation).length
      if (playerLocation===playerId){
        return <>
          <h2>{t('help.deck.you')}</h2>
          <p>
            {t('help.nb.cards')} {nbCards}
          </p>
        </>
      } else {
        return <>
          <h2>{t('help.deck.player', {player:playerLocationName})}</h2>
          <p>
            {t('help.nb.cards')} {nbCards}
          </p>
        </>
      }
    }
    // Unknown location
    return <></>
  }

  let tileType="unknown"
  let nbPoints=666
  let tileProtection=0
  if (item.id===Tile.WellOfMana){
    tileType=t('help.well.of.mana')
    nbPoints=3
    tileProtection=0
  } else if (tileTools.isCottage(item.id)){
    tileType=t('help.cottage')
    nbPoints=2
    tileProtection=1
  } else if (tileTools.isFortress(item.id)){
    tileType=t('help.fortress')
    nbPoints=4
    tileProtection=2
  } else {
    tileType=t('help.stone.circle')
    nbPoints=1
    tileProtection=0
  }

  const spellLeft=tileSpells.spell(item.id, Direction.Left)
  const spellTop=tileSpells.spell(item.id, Direction.Top)
  const spellRight=tileSpells.spell(item.id, Direction.Right)

  const golemsOnTile=rules?.material(MaterialType.Golem)
    .location(LocationType.Board)
    .filter(golem => golem.location.x===item.location!.x && golem.location.y===item.location!.y)
  const has5SimilarGolemsOnTile=(
    ( golemsOnTile!.filter(golem => golem.id===PlayerColor.Purple).length >= 5 ) ||
    ( golemsOnTile!.filter(golem => golem.id===PlayerColor.Orange).length >= 5 ) ||
    ( golemsOnTile!.filter(golem => golem.id===PlayerColor.Green).length >= 5 )
  )

  return <>
    {t('help.type')}: {tileType}<br/>
    &nbsp;<br/>
    {t('help.points')}: {nbPoints}<br/>
    &nbsp;<br/>
    {t('help.spells')}:<br/><ul>
    <li>
      {t('help.left')}:
      <SpellHelp spell={spellLeft}/><br/>
    </li>
    <li>
      {t('help.top')}:
      <SpellHelp spell={spellTop}/><br/>
    </li>
    <li>
      {t('help.right')}:
      <SpellHelp spell={spellRight}/><br/>
    </li>
    </ul>
    {t('help.protection')}: <TileProtection shields={tileProtection} extraShield={has5SimilarGolemsOnTile}/>
  </>
}

const TileProtection=({ shields, extraShield }: {shields:number, extraShield:boolean}) => {
  const { t } = useTranslation()
  const total = extraShield ? shields+1 : shields
  if (total>0){
    if (total===1){
      if (shields===1){
        // Only 1 standard shield
        return <>{t('help.shield.1')}&nbsp;&nbsp;<SymbolShield nb={shields}/></>
      } else {
        // Only 1 extra shield
        return <>{t('help.shield.1')}&nbsp;&nbsp;<SymbolExtraShield/></>
      }
    }
    // Potential mix of standard and extra shields
    return <>{t('help.shield.2', {shields:total})}&nbsp;&nbsp;<SymbolShield nb={shields}/>{extraShield ? <>+<SymbolExtraShield/></> : ""}</>
  }
  return <>{t('help.none.2')}</>
}

const SymbolExtraShield=() => {
  const { t } = useTranslation()
  return <><SymbolShield nb={1}/> {t('help.shield.3')}</>
}
