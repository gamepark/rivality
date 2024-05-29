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

/*
"tuto.goal.1": "Dans Rivality, vous incarnez un mage puissant qui va devoir combattre ses adversaires pour le contrôle du très convoité puits de mana multicolore. Préparez-vous à invoquer de puissantes armées de Golems, à ériger des forteresses imprenables pour remporter cette fantastique bataille à venir !",
"tuto.goal.2": "Votre objectif sera de totaliser le plus de points de victoire en contrôlant un maximum de tuiles de terrain.",
"tuto.basics.1": "Vous avez 2 tuiles en main, ainsi qu'un tas de golems.",
"tuto.basics.2": "Les tuiles vont être placées à tour de rôle par les joueurs dans l'espace central appelé \"Champ de bataille\".",
"tuto.basics.3": "La pose de ces tuiles va entraîner la pose de golems sur le Champ de bataille.",
"tuto.basics.4": "Nous allons revenir sur ce point dans quelques instants.",
"tuto.basics.5": "Un joueur contrôle une tuile s'il dispose de plus de golems dessus que n'importe lequel de ses adversaires.",
"tuto.basics.6": "Une tuile contrôlée rapporte en fin de partie le nombre de points inscrit en bas à droite de la tuile.",
"tuto.basics.7": "Par exemple, la carte centrale appelée Puit de Mana rapporte 3 points.",
"tuto.basics.8": "Celui qui a le plus de points gagne. Simple, non ? :-)",
"tuto.tiles.1": "Comment place-t-on les tuiles et les golems ?",
"tuto.tiles.2": "A tour de rôle, les joueurs choisissent une des 2 tuiles de leur main et la place à côté d'une tuile du Champ de bataille.",
"tuto.tiles.3": "Placez une tuile en bas du Puit de Mana",
"tuto.wizard.1": "Votre magicien est déplacé sur cette tuile, et un golem est également ajouté dessus.",
"tuto.wizard.2": "Le magicien protège cette tuile des attaques de vos adversaires.",
"tuto.spells.1": "Sur les bords de la tuile poséee, il y a des symboles indiquant des sorts d'invocation de golems.",
"tuto.spells.2": "Sur la gauche de cette tuile, X golems sont invoqués à une distance de Y.",
"tuto.spells.3": "En haut de cette tuile, X golems sont invoqués à une distance de Y.",
"tuto.spells.4": "A droite de cette tuile, X golems sont invoqués à une distance de Y.",
"tuto.spells.5": "Comme il n'y a pas de tuile à gauche et à droite, les sorts correspondants sont perdus.",
"tuto.spells.6": "Juste en haut de la tuile, il y a le Puit de Mana, sur lequel sont donc invoqués X golems.",
"tuto.end.turn.1": "Votre main est complétée.",
"tuto.end.turn.2": "Puis c'est le tour du joueur suivant.",
"tuto.round.1": "Le 2ème joueur choisit d'invoquer 2 golems sur le Puit de Mana, afin de le contrôler pour le moment.",
"tuto.turn.tile.1": "Il est possible d'orienter une tuile avant de la poser.",
"tuto.turn.tile.2": "Tournez vos tuiles vers la droite",
"tuto.turn.tile.3": "Placez la tuile à gauche de la tuile adverse afin d'ajouter 2 golems sur le Puits de Mana",
"tuto.shield.1": "Certaines tuiles disposent de Boucliers magiques (symbole).",
"tuto.shield.2": "Dans ce cas, lors d'une attaque de tuile contrôlée par un adversaire, l'attaquant perd un nombre de golems égal au nombre de boucliers.",
"tuto.shield.3": "L'adversaire pose une tuile pour attaquer une de nos cartes avec 1 bouclier.",
"tuto.shield.4": "Lors de la pose de cette tuile, l'adversaire n'a posé que X golems sur la tuile Z au-lieu de X+1, car elle dispose d'un bouclier",
"tuto.broken.shield.1": "Lors d'une attaque à une distance de 3, les golems gagnent la propriété bouclier brisé (symbole) et ne sont pas affectés par les boucliers.",
"tuto.broken.shield.2": "Posez la tuile avec une attaque à une distance de 3",
"tuto.broken.shield.3": "2 golems sont bien placés sur la tuile Z.",
"tuto.broken.shield.4": "Les boucliers ont été ignorés.",
"tuto.5.golems.1": "Sur une tuile, il ne peut y avoir au maximum que 5 golems.",
"tuto.5.golems.2": "S'il y en a plus, l'attaquant retire des golems adverses pour atteindre un total de 5 golems.",
"tuto.5.golems.3": "Si cela est insuffisant, il retire certains de ses golems.",
"tuto.5.golems.4": "Jouez un coup pour avoir 5 golems sur une tuile, en évinçant des golems adverses.",
"tuto.5.golems.5": "Si une tuile est contrôlée par 5 golems, elle bénéficie d'un bouclier magique (symbole) supplémentaire.",
"tuto.5.golems.6": "Jouez la tuile sur l'emplacement indiqué",
"tuto.5.golems.7": "Le 1er sort fait apparaître des golems.",
"tuto.5.golems.8": "Les 3 golems du 2ème sort sont tous détruits par les 2 boucliers initiaux de la tuile plus le bouclier supplémentaire de retranchement.",
"tuto.game.over.1": "La partie s'arrête quand",
"tuto.game.over.2": "tous les joueurs ont joué leur dernière tuile",
"tuto.game.over.3": "ou",
"tuto.game.over.4": "un des joueurs a placé tous ses golems sur le champ de bataille",
"tuto.score.1": "Chaque joueur gagne les points des tuiles du Champ de bataille qu'il contrôle, à l'exception de celle où se trouve son magicien.",
"tuto.score.2": "Le joueur contrôlant le Puit de Mana gagne également les points des tuiles où il se trouve en position d'égalité.",
"tuto.score.3": "En cas d'égalité, c'est le joueur contrôlant le Puits de Mana qui remporte la partie ... même s'il est dernier au score",
"tuto.score.4": "Exemple: Les joueurs 1 et 2 ont 23 points. Le joueur 3 a 19 points et contrôle le Puits de Mana. C'est le joueur 3 qui gagne.",
"tuto.good.luck.1": "C'est à vous de continuer la partie.",
"tuto.good.luck.2": "Bonne chance !",
*/

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
          return tile==Tile.StoneCircle_32_11
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
          return tile==Tile.Cottage_12_21_23B
          && move.location.x===0
          && move.location.y===-1
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
        filter: isCustomMoveType(CustomMoveType.Left)
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
          return tile==Tile.StoneCircle_22_22
          && move.location.x===0
          && move.location.y===-2
        }
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
          <Trans defaults="tuto.shield.3"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.shield.4"></Trans>
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
          <Trans defaults="tuto.broken.shield.1"></Trans><br/>
          &nbsp;<br/>
          <b><Trans defaults="tuto.broken.shield.2"></Trans></b>
          </>
        )
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
        )
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
          &nbsp;<br/>
          <b><Trans defaults="tuto.5.golems.4"></Trans></b>
          </>
        )
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.5.golems.5"></Trans><br/>
          &nbsp;<br/>
          <b><Trans defaults="tuto.5.golems.6"></Trans></b>
          </>
        )
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.5.golems.7"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.5.golems.8"></Trans>
          </>
        )
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
