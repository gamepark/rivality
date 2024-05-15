/** @jsxImportSource @emotion/react */
//import { css } from '@emotion/react'
import { Tile } from '@gamepark/rivality/material/Tile'
import { MaterialHelpProps /*, Picture */ } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { Direction } from '@gamepark/rivality/logic/Direction'
import { Spell, tileSpells } from '@gamepark/rivality/logic/TileSpells'
import { tileTools } from '@gamepark/rivality/logic/TileTools'

//import golemIcon from '../../images/icon/Golem.png'

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
  if (item.id==Tile.WellOfMana){
    //tileType="Well of Mana"
    tileType="Puits de Mana"
    nbPoints=3
    tileProtection=0
  } else if (tileTools.isCottage(item.id)){
    //tileType="Cottage"
    tileType="Chaumière"
    nbPoints=2
    tileProtection=1
  } else if (tileTools.isFortress(item.id)){
//    tileType="Fortress"
    tileType="Forteresse"
    nbPoints=3
    tileProtection=2
  } else {
//    tileType="Stone circle"
    tileType="Plaine à Dolmens"
    nbPoints=1
    tileProtection=0
  }
  console.log(nbPoints)

  const spellLeft=tileSpells.spell(item.id, Direction.Left)
  const spellTop=tileSpells.spell(item.id, Direction.Top)
  const spellRight=tileSpells.spell(item.id, Direction.Right)

  return <>
    Type: {tileType}<br/>
    &nbsp;<br/>
    Sorts:<br/><ul>
    <li>
      Gauche:<br/>
      <SpellHelp spell={spellLeft}/>
    </li>
    <li>
      Haut:<br/>
      <SpellHelp spell={spellTop}/>
    </li>
    <li>
      Droite:<br/>
      <SpellHelp spell={spellRight}/>
    </li>
    </ul>
    Protection: <TileProtection shields={tileProtection}/>
  </>
}

const SpellHelp=({ spell }: {spell:Spell }) => {
  const isValidSpell=spell.nbGolems>0
  return <ul>
    <li>
      {isValidSpell && <SpellDetails spell={spell}/>}
      {!isValidSpell && <>Aucun</>}
    </li>
    {isValidSpell && spell.breakShields && <li>Perce les boucliers magiques</li>}
  </ul>
}

const SpellDetails=({ spell }: {spell:Spell }) => {
  return <>Invoque {spell.nbGolems} golem(s) à {spell.distance} tuile(s) de distance</>
}

const TileProtection=({ shields }: {shields:number }) => {
  if (shields>0)
    return <>{shields} bouclier(s)</>
  return <>Aucune</>
}
