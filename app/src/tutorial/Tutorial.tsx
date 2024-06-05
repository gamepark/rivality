/** @jsxImportSource @emotion/react */
import { isCustomMoveType, isMoveItemType, MoveItem } from '@gamepark/rules-api'
import { css } from '@emotion/react'
import { CustomMoveType } from '@gamepark/rivality/rules/CustomMoveType'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { PlayerId } from '@gamepark/rivality/PlayerId'
import { Tile } from '@gamepark/rivality/material/Tile'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { TutorialSetup } from './TutorialSetup'
import { Trans } from 'react-i18next'

const me = 1
const opponent = 2

export class Tutorial extends MaterialTutorial<PlayerId, MaterialType, LocationType> {
  version = 1
  options = { players: 2 }
  setup = new TutorialSetup()

  players = [{ id: me }, { id: opponent }]

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.welcome"></Trans>
        )
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.goal.1"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.goal.2"></Trans>
          </>
        ),
        size: { width: 120 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.basics.1"></Trans><br/>
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
          <Trans defaults="tuto.basics.2"></Trans><br/>
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
          <Trans defaults="tuto.basics.3"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.basics.4"></Trans><br/>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.basics.5"></Trans><br/>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.basics.6"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.basics.7"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.basics.8"></Trans>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.tiles.1"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.tiles.2"></Trans><br/>
          &nbsp;<br/>
          <b><Trans defaults="tuto.tiles.3"></Trans></b>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
      },
      move: {
        player: me,
        filter: (move, game) => {
          if (!isMoveItemType(MaterialType.Tile)(move))
            return false

          const moveItem:MoveItem=move
          const tile:Tile=game.items[MaterialType.Tile]![moveItem.itemIndex]!.id
          console.log(tile)
          return tile===Tile.StoneCircle_32_11
          && move.location.x===0
          && move.location.y===1
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.wizard.1"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.wizard.2"></Trans>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.spells.1"></Trans><br/>
          <ul>
          <li><Trans defaults="tuto.spells.2"></Trans></li>
          <li><Trans defaults="tuto.spells.3"></Trans></li>
          </ul>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.spells.5"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.spells.6"></Trans>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.end.turn.1"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.end.turn.2"></Trans>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
      }
    },
    {
      move: {
        player: opponent,
        filter: isCustomMoveType(CustomMoveType.Right)
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
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.round.1"></Trans>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.turn.tile.1"></Trans><br/>
          &nbsp;<br/>
          <b><Trans defaults="tuto.turn.tile.2"></Trans></b><br/>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
      },
      move: {
        player: me,
        filter: isCustomMoveType(CustomMoveType.Right)
      }
    },
    {
      popup: {
        text: () => (
          <>
          <b><Trans defaults="tuto.turn.tile.3"></Trans></b>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
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
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.round.2"></Trans>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
      },
      move: {
        player: opponent,
        filter: isCustomMoveType(CustomMoveType.Bottom)
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
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <b><Trans defaults="tuto.round.3"></Trans></b>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
      },
      move: {
        player: me,
        filter: isCustomMoveType(CustomMoveType.Top)
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.shield.1"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.shield.2"></Trans><br/>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <b><Trans defaults="tuto.round.4"></Trans></b>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
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
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.shield.3"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.shield.4"></Trans>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
      }
    },
/*
    {
      move: {
        player: opponent,
        filter: isCustomMoveType(CustomMoveType.Bottom)
      }
    },
*/
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
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.broken.shield.1"></Trans>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <b><Trans defaults="tuto.round.5"></Trans></b>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
      },
      move: {
        player: me,
        filter: isCustomMoveType(CustomMoveType.Bottom)
      }
    },
    {
      popup: {
        text: () => (
          <>
          <b><Trans defaults="tuto.round.6"></Trans></b>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
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
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.broken.shield.3"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.broken.shield.4"></Trans>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
      }
    },
    {
      move: {
        player: opponent,
        filter: isCustomMoveType(CustomMoveType.Top)
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
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.5.golems.1"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.5.golems.2"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.5.golems.3"></Trans><br/>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <b><Trans defaults="tuto.round.7"></Trans></b>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
      },
      move: {
        player: me,
        filter: isCustomMoveType(CustomMoveType.Left)
      }
    },
    {
      popup: {
        text: () => (
          <>
          <b><Trans defaults="tuto.5.golems.4"></Trans></b>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
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
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.5.golems.5"></Trans><br/>
          </>
        ),
        position: { x: 50, y: 0 },
        size: { width: 50 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.game.over.1"></Trans><br/>
          <ul>
          <li><Trans defaults="tuto.game.over.2"></Trans><br/></li>
          </ul>
          <Trans defaults="tuto.game.over.3"></Trans><br/>
          <ul>
          <li><Trans defaults="tuto.game.over.4"></Trans></li>
          </ul>
          </>
        )
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.score.1"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.score.2"></Trans><br/>
          </>
        )
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.score.3"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.score.4"></Trans>
          </>
        )
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.good.luck.1"></Trans><br/>
          <p style={{textAlign: "center"}}>
          <Trans defaults="tuto.good.luck.2"></Trans>
          </p>
          </>
        )
      }
    }
  ]
}

export const alignIcon = css`
  > * {
    vertical-align: middle;
  }

  picture, img {
    vertical-align: middle;
    height: 1.5em;
    margin-right: 0.1em;
  }
`
