/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialHelpProps, Picture, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { Direction } from '@gamepark/rivality/logic/Direction'
import { Golem } from '@gamepark/rivality/material/Golem'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { RivalityRules } from '@gamepark/rivality/RivalityRules'
import { Spell, tileSpells } from '@gamepark/rivality/logic/TileSpells'
import { Tile } from '@gamepark/rivality/material/Tile'
import { tileTools } from '@gamepark/rivality/logic/TileTools'
import { GPTrans } from '../../Translator'
import arrowIcon from '../../images/icon/arrow.png'
import breakShieldsIcon from '../../images/icon/break_shields.png'
import distanceIcon from '../../images/icon/distance.png'
import golemIcon from '../../images/icon/golem.png'
import shieldIcon from '../../images/icon/shield.png'

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
            <GPTrans defaults="help.nb.cards" suffix=":"></GPTrans> {nbCards}
          </p>
        </>
      } else {
        return <>
          <h2>{t('help.deck.player', {player:playerLocationName})}</h2>
          <p>
            <GPTrans defaults="help.nb.cards" suffix=":"></GPTrans> {nbCards}
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
    ( golemsOnTile!.filter(golem => golem.id===Golem.Golem1).length >= 5 ) ||
    ( golemsOnTile!.filter(golem => golem.id===Golem.Golem2).length >= 5 ) ||
    ( golemsOnTile!.filter(golem => golem.id===Golem.Golem3).length >= 5 )
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

const SpellHelp=({ spell }: {spell:Spell }) => {
  const { t } = useTranslation()
  const isValidSpell=spell.nbGolems>0
  return <>
    <SpellSymbols spell={spell}/>
    <ul>
      <li>
        {isValidSpell && <SpellDetails spell={spell}/>}
        {!isValidSpell && <>{t('help.none.1')}</>}
      </li>
      {isValidSpell && spell.breakShields && <li>{t('help.break.shields')}</li>}
    </ul>
  </>
}

const SpellDetails=({ spell }: {spell:Spell }) => {
  const { t } = useTranslation()
  const nbGolems=spell.nbGolems
  const distance=spell.distance
  if (nbGolems===1){
    if (distance===1){
      return <>{t('help.summon.1.1')}</>
    }
    return <>{t('help.summon.1.2', {distance})}</>
  }
  if (distance===1){
    return <>{t('help.summon.2.1', {nbGolems})}</>
  }
  return <>{t('help.summon.2.2', {nbGolems, distance})}</>
}

const SymbolShield=({nb}:{nb:number}) => {
  if (nb<=0) return <></>
  return <><Picture css={iconCss} src={shieldIcon}/>&nbsp;<SymbolShield nb={nb-1}/></>
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

const SymbolGolem=({nb}:{nb:number}) => {
  if (nb<=0) return <></>
  return <><Picture css={iconCss} src={golemIcon}/>&nbsp;<SymbolGolem nb={nb-1}/></>
}

const SymbolDistance=({nb}:{nb:number}) => {
  if (nb<=0) return <></>
  return <>&nbsp;<Picture css={iconCss} src={distanceIcon}/><SymbolDistance nb={nb-1}/></>
}

const SymbolBreakShields=({value}:{value:boolean}) => {
  if (!value) return <></>
  return <>&nbsp;&nbsp;<Picture css={iconCss} src={breakShieldsIcon}/></>
}

const SpellSymbols=({ spell }: {spell:Spell }) => {
  if (spell.nbGolems===0)
    return <></>
  return <>
    &nbsp;&nbsp;&nbsp;
    <SymbolGolem nb={spell.nbGolems}/>
    <Picture css={iconCss} src={arrowIcon}/>
    <SymbolDistance nb={spell.distance}/>
    <SymbolBreakShields value={spell.breakShields}/>
    &nbsp;<br/>&nbsp;
  </>
}

const iconCss=css`
  vertical-align: middle;
`
