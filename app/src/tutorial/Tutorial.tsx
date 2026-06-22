import { css } from '@emotion/react'
import { MaterialTutorial, Picture, TutorialStep } from '@gamepark/react-game'
import { Spell } from '@gamepark/rivality/logic/TileSpells'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { Tile } from '@gamepark/rivality/material/Tile'
import { Orientation } from '@gamepark/rivality/Orientation'
import { PlayerColor } from '@gamepark/rivality/PlayerColor'
import { isMoveItemType, MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { SpellSymbols, SymbolBreakShields, SymbolShield } from '../material/help/HelpTools'
import { TutorialSetup } from './TutorialSetup'
import rotateIcon from '../images/icon/rotator.png'
import validateIcon from '../images/icon/validate.png'

const me = 1
const opponent = 2

export class Tutorial extends MaterialTutorial<PlayerColor, MaterialType, LocationType> {
  opponentName = 'Rincevent'

  version = 6
  options = { players: 2 }
  setup = new TutorialSetup()

  players = [{ id: me }, { id: opponent, name: this.opponentName }]

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.welcome"></Trans>
        )
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.goal.1"></Trans><br/>
          &nbsp;<br/>
          <Trans i18nKey="tuto.goal.2"></Trans>
          </>
        ),
        size: { width: 120 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.basics.1"></Trans><br/>
          </>
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Tile).location(LocationType.PlayerHand).player(me),
          this.material(game, MaterialType.Golem).location(LocationType.PlayerGolemStack).player(me)
        ],
        locations: [
          this.location(LocationType.PlayerHand).player(me).location,
          this.location(LocationType.PlayerGolemStack).player(me).location
        ],
        margin: {
          right: 10,
          top: 10,
          bottom: 10
        }
      })
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.basics.2"></Trans><br/>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Tile).location(LocationType.Board)
        ],
        margin: {
          right: 10,
          top: 10,
          bottom: 10,
          left:10
        }
      })
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.basics.3"></Trans><br/>
          &nbsp;<br/>
          <Trans i18nKey="tuto.basics.4"></Trans><br/>
          </>
        ),
        position: { x: 40, y: -10 },
        size: { width: 70 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.basics.5"></Trans><br/>
          </>
        ),
        position: { x: 40, y: -10 },
        size: { width: 70 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.basics.6"></Trans><br/>
          &nbsp;<br/>
          <Trans i18nKey="tuto.basics.7"></Trans><br/>
          &nbsp;<br/>
          <Trans i18nKey="tuto.basics.8"></Trans><br/>
          <Trans i18nKey="tuto.basics.9"></Trans>
          </>
        ),
        position: { x: 40, y: -15 },
        size: { width: 70 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.tiles.1"></Trans><br/>
          &nbsp;<br/>
          <Trans i18nKey="tuto.tiles.2"></Trans><br/>
          &nbsp;<br/>
          <Trans i18nKey="tuto.tiles.3"></Trans>
          </>
        ),
        position: { x: 40, y: -15 },
        size: { width: 72 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.tiles.4a"></Trans><br/>
          <Trans i18nKey="tuto.tiles.4b"></Trans><br/>
          <Trans i18nKey="tuto.tiles.4c"></Trans><br/>
          &nbsp;<br/>
          <b><Trans i18nKey="tuto.tiles.4d"></Trans></b>
          &nbsp;<Picture css={iconCss} src={validateIcon}/>
          </>
        ),
        position: { x: 40, y: -15 },
        size: { width: 75 }
      },
      move: {
        player: me,
        filter: (move, game) => {
          if (!isMoveItemType(MaterialType.Tile)(move))
            return false

          const moveItem:MoveItem=move
          const tile:Tile=game.items[MaterialType.Tile]![moveItem.itemIndex]!.id
          return tile===Tile.StoneCircle_32_11
          && move.location.x===0
          && move.location.y===1
          && move.location.rotation===Orientation.North
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.wizard.1"></Trans><br/>
          &nbsp;<br/>
          <Trans i18nKey="tuto.wizard.2"></Trans>
          </>
        ),
        position: { x: 50, y: -15 },
        size: { width: 72 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Tile)
            .location(LocationType.Board)
            .filter(item => item.location.x===0 && item.location.y===1),
          this.material(game, MaterialType.Golem)
            .location(LocationType.Board)
            .filter(item => item.location.x===0 && item.location.y===1),
          this.material(game, MaterialType.Wizard)
            .location(LocationType.Board)
            .filter(item => item.location.x===0 && item.location.y===1)
        ],
        margin: {
          right: 10,
          top: 10,
          bottom: 10,
          left:10
        }
      })
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.spells.1"></Trans><br/>
          <ul>
          <li>
            <Trans i18nKey="tuto.spells.2"></Trans><br/>
            <SpellSymbols spell={new Spell(3,2,false)}/>
          </li>
          <li>
            <Trans i18nKey="tuto.spells.3"></Trans><br/>
            <SpellSymbols spell={new Spell(1,1,false)}/>
          </li>
          </ul>
          </>
        ),
        position: { x: 50, y: -10 },
        size: { width: 72 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Tile)
            .location(LocationType.Board)
            .filter(item => item.location.x===0 && item.location.y===1),
          this.material(game, MaterialType.Golem)
            .location(LocationType.Board)
            .filter(item => item.location.x===0 && item.location.y===1),
          this.material(game, MaterialType.Wizard)
            .location(LocationType.Board)
            .filter(item => item.location.x===0 && item.location.y===1)
        ],
        margin: {
          right: 10,
          top: 10,
          bottom: 10,
          left:10
        }
      })
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.spells.5"></Trans><br/>
          &nbsp;<br/>
          <Trans i18nKey="tuto.spells.6"></Trans>
          </>
        ),
        position: { x: 40, y: -15 },
        size: { width: 72 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Tile)
            .location(LocationType.Board)
            .filter(item => item.location.x===0 && item.location.y===1),
          this.material(game, MaterialType.Golem)
            .location(LocationType.Board)
            .filter(item => item.location.x===0 && item.location.y===0)
        ],
        margin: {
          right: 10,
          top: 10,
          bottom: 10,
          left:10
        }
      })
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.end.turn.1"></Trans><br/>
          &nbsp;<br/>
          <Trans i18nKey="tuto.end.turn.2"></Trans>
          </>
        ),
        position: { x: 40, y: -15 },
        size: { width: 72 }
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => {
          if (!isMoveItemType(MaterialType.Tile)(move))
            return false

          const moveItem:MoveItem=move
          const tile:Tile=game.items[MaterialType.Tile]![moveItem.itemIndex]!.id
          return tile===Tile.Cottage_12_21_23B
          && move.location.x===-1
          && move.location.y===0
          && move.location.rotation===Orientation.East
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.round.1"></Trans>
          </>
        ),
        position: { x: 40, y: -15 },
        size: { width: 72 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <ul>
          <li><b><Trans i18nKey="tuto.turn.tile.3"></Trans></b></li>
          <li><b><Trans i18nKey="tuto.turn.tile.4"></Trans></b></li>
          &nbsp;<Picture css={iconCss} src={rotateIcon}/>
          <li><b><Trans i18nKey="tuto.turn.tile.5"></Trans></b>
          &nbsp;<Picture css={iconCss} src={validateIcon}/>
          </li>
          </ul>
          </>
        ),
        position: { x: 40, y: -15 },
        size: { width: 72 }
      },
      move: {
        player: me,
        filter: (move, game) => {
          if (!isMoveItemType(MaterialType.Tile)(move))
            return false

          const moveItem:MoveItem=move
          const tile:Tile=game.items[MaterialType.Tile]![moveItem.itemIndex]!.id
          return tile===Tile.StoneCircle_21_22
          && move.location.x===-2
          && move.location.y===0
          // Note: The orientation is forced through TileButtonDescription.isDisabled()
          // No forced orientation here allows the user to test the rotation button
          // && move.location.rotation===Orientation.East
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.round.2"></Trans>
          </>
        ),
        position: { x: 40, y: -15 },
        size: { width: 50 }
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => {
          if (!isMoveItemType(MaterialType.Tile)(move))
            return false

          const moveItem:MoveItem=move
          const tile:Tile=game.items[MaterialType.Tile]![moveItem.itemIndex]!.id
          return tile===Tile.Cottage_22_23B_11
          && move.location.x===-2
          && move.location.y===1
          && move.location.rotation===Orientation.South
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.shield.1">
            <SymbolShield nb={1}/>
          </Trans><br/>
          &nbsp;<br/>
          <Trans i18nKey="tuto.shield.2"></Trans><br/>
          </>
        ),
        position: { x: 40, y: -15 },
        size: { width: 72 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <b><Trans i18nKey="tuto.round.4"></Trans></b>
          </>
        ),
        position: { x: 40, y: -15 },
        size: { width: 72 }
      },
      move: {
        player: me,
        filter: (move, game) => {
          if (!isMoveItemType(MaterialType.Tile)(move))
            return false

          const moveItem:MoveItem=move
          const tile:Tile=game.items[MaterialType.Tile]![moveItem.itemIndex]!.id
          return tile===Tile.Cottage_23B_31_x
          && move.location.x===-1
          && move.location.y===1
//          && move.location.rotation===Orientation.North
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.shield.3"></Trans><br/>
          &nbsp;<br/>
          <Trans i18nKey="tuto.shield.4"></Trans>
          </>
        ),
        position: { x: 40, y: -15 },
        size: { width: 72 }
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => {
          if (!isMoveItemType(MaterialType.Tile)(move))
            return false

          const moveItem:MoveItem=move
          const tile:Tile=game.items[MaterialType.Tile]![moveItem.itemIndex]!.id
          return tile===Tile.StoneCircle_x_41_star
          && move.location.x===-2
          && move.location.y===-1
          && move.location.rotation===Orientation.South
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.broken.shield.1">
            <SymbolBreakShields value={true}/>
          </Trans>
          </>
        ),
        position: { x: 40, y: -15 },
        size: { width: 72 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <b><Trans i18nKey="tuto.round.6"></Trans></b>
          </>
        ),
        position: { x: 40, y: -15 },
        size: { width: 72 }
      },
      move: {
        player: me,
        filter: (move, game) => {
          if (!isMoveItemType(MaterialType.Tile)(move))
            return false

          const moveItem:MoveItem=move
          const tile:Tile=game.items[MaterialType.Tile]![moveItem.itemIndex]!.id
          return tile===Tile.Fortress_31_22_13B
          && move.location.x===1
          && move.location.y===1
//          && move.location.rotation===Orientation.South
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.broken.shield.3"></Trans><br/>
          &nbsp;<br/>
          <Trans i18nKey="tuto.broken.shield.4"></Trans>
          </>
        ),
        position: { x: 40, y: -15 },
        size: { width: 72 }
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => {
          if (!isMoveItemType(MaterialType.Tile)(move))
            return false

          const moveItem:MoveItem=move
          const tile:Tile=game.items[MaterialType.Tile]![moveItem.itemIndex]!.id
          return tile===Tile.StoneCircle_11_32
          && move.location.x===-1
          && move.location.y===2
          && move.location.rotation===Orientation.North
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.5.golems.1"></Trans><br/>
          &nbsp;<br/>
          <Trans i18nKey="tuto.5.golems.2"></Trans><br/>
          &nbsp;<br/>
          <Trans i18nKey="tuto.5.golems.3"></Trans><br/>
          </>
        ),
        position: { x: 40, y: -15 },
        size: { width: 72 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <b><Trans i18nKey="tuto.5.golems.4"></Trans></b>
          </>
        ),
        position: { x: 40, y: -15 },
        size: { width: 72 }
      },
      move: {
        player: me,
        filter: (move, game) => {
          if (!isMoveItemType(MaterialType.Tile)(move))
            return false

          const moveItem:MoveItem=move
          const tile:Tile=game.items[MaterialType.Tile]![moveItem.itemIndex]!.id
          return tile===Tile.StoneCircle_31_12
          && move.location.x===0
          && move.location.y===-1
//          && move.location.rotation===Orientation.West
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.5.golems.5">
            <SymbolShield nb={1}/>
          </Trans><br/>
          </>
        ),
        position: { x: 40, y: -15 },
        size: { width: 72 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.game.over.1"></Trans><br/>
          <ul>
          <li><Trans i18nKey="tuto.game.over.2"></Trans><br/></li>
          </ul>
          <Trans i18nKey="tuto.game.over.3"></Trans><br/>
          <ul>
          <li><Trans i18nKey="tuto.game.over.4"></Trans></li>
          </ul>
          </>
        )
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.score.1"></Trans><br/>
          &nbsp;<br/>
          <Trans i18nKey="tuto.score.2"></Trans><br/>
          </>
        )
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.score.3"></Trans><br/>
          &nbsp;<br/>
          <Trans i18nKey="tuto.score.4"></Trans>
          </>
        )
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans i18nKey="tuto.good.luck.1"></Trans><br/>
          <p style={{textAlign: "center"}}>
          <Trans i18nKey="tuto.good.luck.2"></Trans>
          </p>
          </>
        )
      }
    }
  ]
}

const iconCss=css`
  border-radius: 50%;
  vertical-align: top;
  max-height: 1em;
`
