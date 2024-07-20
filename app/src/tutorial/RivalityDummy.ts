import { Dummy, isMoveItemType, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { RivalityRules } from '@gamepark/rivality/RivalityRules'
import { Direction } from '@gamepark/rivality/logic/Direction'
import { LocationType } from '@gamepark/rivality/material/LocationType'
import { MaterialType } from '@gamepark/rivality/material/MaterialType'
import { Orientation } from '@gamepark/rivality/Orientation'
import { PlayerColor } from '@gamepark/rivality/PlayerColor'
import { RuleId } from '@gamepark/rivality/rules/RuleId'
import { Tile } from '@gamepark/rivality/material/Tile'
import { tileSpells } from '@gamepark/rivality/logic/TileSpells'
import { tileTools } from '@gamepark/rivality/logic/TileTools'

export class RivalityDummy extends Dummy<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor> {
  constructor() {
    super(RivalityRules)
  }

  getLegalMoves(game: MaterialGame<PlayerColor, MaterialType, LocationType>, player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const rules = new RivalityRules(game)
    const legalMoves = super.getLegalMoves(game, player)

    // Only consider tiles at locations with an active spell
    // AI level: No strategy, no tactic, just avoid silly moves
    if (game.rule?.id === RuleId.ChooseTile) {
      const allBoardTiles=rules.material(MaterialType.Tile).location(LocationType.Board)

      const moves = legalMoves.filter((move) => {
        if (!(isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.Tile)(move) &&
              move.location.type === LocationType.Board))
          return false

        // Tile move
        const tile:Tile=game.items[MaterialType.Tile]![move.itemIndex]!.id

        // Only keep the move if a spell is targetting an existing tile
        let hasActiveSpell=false

        const targetX=move.location.x
        const targetY=move.location.y
        const tileOrientation=move.location.rotation
        if (targetX===undefined || targetY===undefined || tileOrientation===undefined)
          return

        [Orientation.North, Orientation.East, Orientation.South, Orientation.West].forEach(spellOrientation => {
          const tileSide:Direction=tileTools.tileSideFromOrientations(spellOrientation, tileOrientation)
          const spell=tileSpells.spell(tile, tileSide)
          if (spell.nbGolems<=0)
            return
          const distance=spell.distance
          let targetCoords={x:targetX, y:targetY}
          switch (spellOrientation){
            case Orientation.North:
              targetCoords.y-=distance
              break
            case Orientation.East:
              targetCoords.x+=distance
              break
            case Orientation.South:
              targetCoords.y+=distance
              break
            case Orientation.West:
              targetCoords.x-=distance
              break
          }
          const isTargetOccupied=allBoardTiles.filter(item => item.location.x===targetCoords.x && item.location.y===targetCoords.y)
            .length > 0
          if (isTargetOccupied)
            hasActiveSpell=true
        });

        return hasActiveSpell
      })
      if (moves.length) return moves
    }

    return legalMoves
  }
}
