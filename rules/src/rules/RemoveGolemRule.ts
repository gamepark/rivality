import { MaterialMove } from '@gamepark/rules-api'
import { golemTools } from '../logic/GolemTools'
import { playerTools } from '../logic/PlayerTools'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { PlayerId } from '../PlayerId'
import { SpellRule } from './SpellRule'
import { RuleId } from '../rules/RuleId'

/*
 * If the number of golems exceeds 5 on the current spell tile,
 * golems are removed
 */

export class RemoveGolemRule extends SpellRule {
  onRuleStart(): MaterialMove[] {
    let moves:MaterialMove[]=[]

    moves.push(...this.removeGolems())

    return moves
  }

  golemMoves(player:PlayerId, fromTileX:number, fromTileY:number, nbGolems:number){
    const golemId=golemTools.playerGolem(player)
    return this.
      material(MaterialType.Golem)
      .location(LocationType.Board)
      .filter(item =>
        item.location.x==fromTileX
        && item.location.y==fromTileY
        && item.id==golemId
      )
      .limit(nbGolems)
      .moveItemsAtOnce(
        {
          type: LocationType.PlayerGolemStack,
          player: player
        }
      )
  }

  nextSpellAction() : MaterialMove {
    return this.rules().startPlayerTurn(RuleId.SelectCastSpellOrientation, this.getActivePlayer())
  }

  removeGolems() : MaterialMove[] {
    let moves:MaterialMove[]=[]

    const nbPlayers=this.game.players.length
    const tileX:number = this.remind(Memory.SpellTileX)
    const tileY:number = this.remind(Memory.SpellTileY)

    const golemsOnTarget=this
      .material(MaterialType.Golem)
      .location(LocationType.Board)
      .filter(item => item.location.x==tileX && item.location.y==tileY)

    const activePlayer:PlayerId = this.getActivePlayer()
    let opponentsId:PlayerId[]=playerTools.opponentsOf(activePlayer, nbPlayers)

    let golemCount = golemTools.golemCount(golemsOnTarget, activePlayer)

    // 0. Count golems per player
    const nbActivePlayerGolems=golemCount.nbPlayerGolems(this.getActivePlayer())
    let initialTotalNbGolems=nbActivePlayerGolems
    let nbOpponentGolems:number[]=[]
    for (let i=0; i<opponentsId.length; i++){
      const opponent=opponentsId[i]
      const nbGolems=golemCount.nbPlayerGolems(opponent)
      nbOpponentGolems.push(nbGolems)
      initialTotalNbGolems+=nbGolems
    }

    // 1. If 5 golems or less, nothing to do
    if (initialTotalNbGolems<=5){
      return [this.nextSpellAction()]
    }

    // 1. If active player has 5+ golems, keep 5 golems from this player, remove others
    //    and go to next spell rule
    if (nbActivePlayerGolems>=5){
      if (nbActivePlayerGolems>5){
        moves.push(this.golemMoves(activePlayer, tileX, tileY, nbActivePlayerGolems-5))
      }
      for (let i=0; i<opponentsId.length; i++){
        const opponent=opponentsId[i]
        const nbGolems=nbOpponentGolems[i]
        if (nbGolems>0){
          moves.push(this.golemMoves(opponent, tileX, tileY, nbGolems))
        }
      }
      moves.push(this.nextSpellAction())
      return moves
    }

    // 2. Compute the maximum number of opponent golems (5-nb active player's golem)
    const maxNbOpponentGolems=5-nbActivePlayerGolems

    // 3. Dispatch fairly the nb of golems between nbOpponents
    let toBeRemoved:number[] = []
    for (let i=0; i<opponentsId.length; i++){
      toBeRemoved.push(0)
    }

    let keepRemovingGolems=true
    let requiresQuestionToPlayer=false

    /*
    No infinite loop proof:
    - At each iteration:
      o at least one iteration of the for loop
      o nbPlayersWithMaxNbGolems>0
    - Then
      o either stop condition
      o either return
      o or a value in nbOpponentGolems is decreased by at least one
    => nbGolemsStillToBeRemoved decreases by at least one at each loop
    => nbGolemsStillToBeRemoved reaches 0 or less after a finite nb of steps
    => no infinite loop
    */
    while (keepRemovingGolems && opponentsId.length>0) {
      let maxNbGolems=0
      let nbPlayersWithMaxNbGolems=0
      let totalNbGolems=0

      // Look for players with the higher nb of golems
      for (let i=0; i<opponentsId.length; i++){
        let oppGolems = nbOpponentGolems[i]
        if (oppGolems<0) oppGolems=0

        totalNbGolems+=oppGolems
        if (oppGolems>maxNbGolems){
          maxNbGolems=oppGolems
          nbPlayersWithMaxNbGolems=1
        } else if (oppGolems==maxNbGolems){
          nbPlayersWithMaxNbGolems++
        }
      }

      const nbGolemsStillToBeRemoved=totalNbGolems-maxNbOpponentGolems
      if (nbGolemsStillToBeRemoved<=0 || maxNbGolems<=0){
        // No golem to be removed
        keepRemovingGolems=false
      } else if (nbGolemsStillToBeRemoved<nbPlayersWithMaxNbGolems){
        // Cannot decide which golem to be removed => ask player
        requiresQuestionToPlayer=true
        keepRemovingGolems=false
      } else {
        // Remove 1 golem to each player with the max nb of golems
        for (let i=0; i<opponentsId.length; i++){
          let oppGolems = nbOpponentGolems[i]
          if (oppGolems == maxNbGolems){
            toBeRemoved[i]=toBeRemoved[i]+1
            nbOpponentGolems[i]=nbOpponentGolems[i]-1
          }
        }
      }
    }

    // 4. Move the golems to be removed
    for (let i=0; i<opponentsId.length; i++){
      const opponent=opponentsId[i]
      const nbGolems=toBeRemoved[i]
      if (nbGolems>0){
        moves.push(this.golemMoves(opponent, tileX, tileY, nbGolems))
      }
    }

    // 5. Go to next spell rule
    if (requiresQuestionToPlayer){
      moves.push(this.rules().startPlayerTurn(RuleId.AskGolemRemoval, this.getActivePlayer()))
    } else {
      moves.push(this.nextSpellAction())
    }
    return moves
  }
}
