/** @jsxImportSource @emotion/react */
import { Tile } from '@gamepark/rivality/material/Tile'
import { MaterialHelpProps /*, Picture */ } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { Direction } from '@gamepark/rivality/logic/Direction'
import { Spell, tileSpells } from '@gamepark/rivality/logic/TileSpells'
import { tileTools } from '@gamepark/rivality/logic/TileTools'

export const TileHelp = (props: MaterialHelpProps) => {
  const { item } = props
  const { t } = useTranslation()

  if (item.id === undefined) {
    return <>
      <h2>{t('help.tile')}</h2>
    </>
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
    nbPoints=3
    tileProtection=2
  } else {
    tileType=t('help.stone.circle')
    nbPoints=1
    tileProtection=0
  }

  const spellLeft=tileSpells.spell(item.id, Direction.Left)
  const spellTop=tileSpells.spell(item.id, Direction.Top)
  const spellRight=tileSpells.spell(item.id, Direction.Right)

  return <>
    {t('help.type')}: {tileType}<br/>
    &nbsp;<br/>
    {t('help.points')}: {nbPoints}<br/>
    &nbsp;<br/>
    {t('help.spells')}:<br/><ul>
    <li>
      {t('help.left')}:<br/>
      <SpellHelp spell={spellLeft}/>
    </li>
    <li>
      {t('help.top')}:<br/>
      <SpellHelp spell={spellTop}/>
    </li>
    <li>
      {t('help.right')}:<br/>
      <SpellHelp spell={spellRight}/>
    </li>
    </ul>
    {t('help.protection')}: <TileProtection shields={tileProtection}/>
  </>
}

const SpellHelp=({ spell }: {spell:Spell }) => {
  const { t } = useTranslation()
  const isValidSpell=spell.nbGolems>0
  return <ul>
    <li>
      {isValidSpell && <SpellDetails spell={spell}/>}
      {!isValidSpell && <>{t('help.none.1')}</>}
    </li>
    {isValidSpell && spell.breakShields && <li>{t('help.break.shields')}</li>}
  </ul>
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

const TileProtection=({ shields }: {shields:number }) => {
  const { t } = useTranslation()
  if (shields>0){
    if (shields===1)
      return <>{t('help.shield.1')}</>
    return <>{t('help.shield.2', {shields})}</>
  }
  return <>{t('help.none.2')}</>
}
