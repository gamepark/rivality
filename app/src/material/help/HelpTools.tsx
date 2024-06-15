/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Picture } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { Spell } from '@gamepark/rivality/logic/TileSpells'
import arrowIcon from '../../images/icon/arrow.png'
import breakShieldsIcon from '../../images/icon/break_shields.png'
import distanceIcon from '../../images/icon/distance.png'
import golemIcon from '../../images/icon/golem.png'
import shieldIcon from '../../images/icon/shield.png'

export const SpellHelp=({ spell }: {spell:Spell }) => {
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

export const SymbolShield=({nb}:{nb:number}) => {
  if (nb<=0) return <></>
  return <><Picture css={iconCss} src={shieldIcon}/>&nbsp;<SymbolShield nb={nb-1}/></>
}

export const SymbolGolem=({nb}:{nb:number}) => {
  if (nb<=0) return <></>
  return <><Picture css={iconCss} src={golemIcon}/>&nbsp;<SymbolGolem nb={nb-1}/></>
}

export const SymbolDistance=({nb}:{nb:number}) => {
  if (nb<=0) return <></>
  return <>&nbsp;<Picture css={iconCss} src={distanceIcon}/><SymbolDistance nb={nb-1}/></>
}

export const SymbolBreakShields=({value}:{value:boolean}) => {
  if (!value) return <></>
  return <>&nbsp;&nbsp;<Picture css={iconCss} src={breakShieldsIcon}/></>
}

export const SpellSymbols=({ spell }: {spell:Spell }) => {
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
