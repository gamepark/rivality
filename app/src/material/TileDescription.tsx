import { css } from '@emotion/react'
import { CardDescription, ItemContext } from '@gamepark/react-game'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { Tile } from '@gamepark/rivality/material/Tile'
import { Memory } from '@gamepark/rivality/rules/Memory'
import { MaterialItem } from '@gamepark/rules-api'
import Cottage_11_23B_22 from '../images/Cottage_11_23b_22.jpg'
import Cottage_12_21_23B from '../images/Cottage_12_21_23b.jpg'
import Cottage_22_23B_11 from '../images/Cottage_22_23b_11.jpg'
import Cottage_23B_12_21 from '../images/Cottage_23b_12_21.jpg'
import Cottage_23B_31_x from '../images/Cottage_23b_31_x.jpg'
import Cottage_23B_32_x from '../images/Cottage_23b_32_x.jpg'
import Cottage_31_23B_x from '../images/Cottage_31_23b_x.jpg'
import Cottage_32_23B_x from '../images/Cottage_32_23b_x.jpg'
import Fortress_21_23B_22 from '../images/Fortress_21_23b_22.jpg'
import Fortress_22_13B_31 from '../images/Fortress_22_13b_31.jpg'
import Fortress_22_22_23B from '../images/Fortress_22_22_23b.jpg'
import Fortress_22_23B_21 from '../images/Fortress_22_23b_21.jpg'
import Fortress_23B_22_22 from '../images/Fortress_23b_22_22.jpg'
import Fortress_31_22_13B from '../images/Fortress_31_22_13b.jpg'
import StoneCircle_11_31 from '../images/StoneCircle_11_31.jpg'
import StoneCircle_11_32 from '../images/StoneCircle_11_32.jpg'
import StoneCircle_12_31 from '../images/StoneCircle_12_31.jpg'
import StoneCircle_21_22 from '../images/StoneCircle_21_22.jpg'
import StoneCircle_22_21 from '../images/StoneCircle_22_21.jpg'
import StoneCircle_31_11 from '../images/StoneCircle_31_11.jpg'
import StoneCircle_31_12 from '../images/StoneCircle_31_12.jpg'
import StoneCircle_32_11 from '../images/StoneCircle_32_11.jpg'
import StoneCircle_x_41 from '../images/StoneCircle_x_41.jpg'
import StoneCircle_x_41_star from '../images/StoneCircle_x_41_star.jpg'
import TileBack from '../images/TileBack.jpg'
import WellOfMana from '../images/WellOfMana.jpg'
import { TileHelp } from './help/TileHelp'
import { uiTileTools } from './UITileTools'

export class TileDescription extends CardDescription {
  height = 7
  width = 7
  borderRadius = 0.5

  backImage = TileBack
  help = TileHelp

  images = {
    [Tile.WellOfMana]: WellOfMana,
    [Tile.StoneCircle_x_41]: StoneCircle_x_41,
    [Tile.StoneCircle_x_41_star]: StoneCircle_x_41_star,
    [Tile.StoneCircle_31_11]: StoneCircle_31_11,
    [Tile.StoneCircle_11_31]: StoneCircle_11_31,
    [Tile.StoneCircle_12_31]: StoneCircle_12_31,
    [Tile.StoneCircle_31_12]: StoneCircle_31_12,
    [Tile.StoneCircle_11_32]: StoneCircle_11_32,
    [Tile.StoneCircle_32_11]: StoneCircle_32_11,
    [Tile.StoneCircle_21_22]: StoneCircle_21_22,
    [Tile.StoneCircle_22_21]: StoneCircle_22_21,
    [Tile.Cottage_12_21_23B]: Cottage_12_21_23B,
    [Tile.Cottage_23B_12_21]: Cottage_23B_12_21,
    [Tile.Cottage_22_23B_11]: Cottage_22_23B_11,
    [Tile.Cottage_31_23B_x]: Cottage_31_23B_x,
    [Tile.Cottage_11_23B_22]: Cottage_11_23B_22,
    [Tile.Cottage_23B_31_x]: Cottage_23B_31_x,
    [Tile.Cottage_32_23B_x]: Cottage_32_23B_x,
    [Tile.Cottage_23B_32_x]: Cottage_23B_32_x,
    [Tile.Fortress_21_23B_22]: Fortress_21_23B_22,
    [Tile.Fortress_22_13B_31]: Fortress_22_13B_31,
    [Tile.Fortress_23B_22_22]: Fortress_23B_22_22,
    [Tile.Fortress_31_22_13B]: Fortress_31_22_13B,
    [Tile.Fortress_22_23B_21]: Fortress_22_23B_21,
    [Tile.Fortress_22_22_23B]: Fortress_22_22_23B
  }

  getItemExtraCss(item: MaterialItem, context: ItemContext) {
    const location = item.location
    if (
      uiTileTools.isHighlightedSquare(location, context) ||
      uiTileTools.isActiveWizardSquare(location, context)
    ) {
      return css`filter: contrast(1.5)`
    }
    if (uiTileTools.isUnderAttackSquare(location, context)) {
      return css`filter: opacity(0.5) drop-shadow(0 0 0 red)`
    }
    return css``
  }

  getShortClickLocalMove({ rules, player, index, type }: ItemContext) {
    const material = rules.material(type).index(index)
    const item = material.getItem()!
    if ((item.location.type === LocationType.PlayerHand && item.location.player === player)
      || rules.remind(Memory.TilePreview) === index) {
      return material.moveItem({ ...item.location, rotation: (item.location.rotation % 4) + 1 })
    }
    return
  }
}

export const tileDescription = new TileDescription()
export const spaceBetweenTiles = 0.5
