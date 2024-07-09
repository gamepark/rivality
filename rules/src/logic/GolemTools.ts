import { Material } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'

export class GolemCount {
  hasFiveGolemsOfASingleOpponent:boolean
  isTileControlledByOpponent:boolean
  nbGolems1:number
  nbGolems2:number
  nbGolems3:number

  nbPlayerGolems(player:PlayerColor):number {
    if (player==1) return this.nbGolems1
    if (player==2) return this.nbGolems2
    if (player==3) return this.nbGolems3
    console.log("*** ERROR - Unsupported player number")
    return this.nbGolems1
  }

  constructor(golems:Material, activePlayer:PlayerColor){
    this.nbGolems1=golems.filter(item => item.id==PlayerColor.Purple).length
    this.nbGolems2=golems.filter(item => item.id==PlayerColor.Orange).length
    this.nbGolems3=golems.filter(item => item.id==PlayerColor.Green).length

    this.hasFiveGolemsOfASingleOpponent=false
    this.isTileControlledByOpponent=false
    if (activePlayer==1){
    //      nbPlayerGolems=nbGolems1OnTarget
    //      nbOpponentGolems=nbGolems2OnTarget+nbGolems3OnTarget
      this.hasFiveGolemsOfASingleOpponent=(this.nbGolems2==5)||(this.nbGolems3==5)
      this.isTileControlledByOpponent=
        ((this.nbGolems2 > this.nbGolems1) && (this.nbGolems2 > this.nbGolems3)
        ||(this.nbGolems3 > this.nbGolems1) && (this.nbGolems3 > this.nbGolems2))
    } else if (activePlayer==2){
    //      nbPlayerGolems=nbGolems2OnTarget
    //      nbOpponentGolems=nbGolems1OnTarget+nbGolems3OnTarget
      this.hasFiveGolemsOfASingleOpponent=(this.nbGolems1==5)||(this.nbGolems3==5)
      this.isTileControlledByOpponent=
        ((this.nbGolems1 > this.nbGolems2) && (this.nbGolems1 > this.nbGolems3)
        ||(this.nbGolems3 > this.nbGolems1) && (this.nbGolems3 > this.nbGolems2))
    } else if (activePlayer==3){
    //      nbPlayerGolems=nbGolems3OnTarget
    //      nbOpponentGolems=nbGolems1OnTarget+nbGolems2OnTarget
      this.hasFiveGolemsOfASingleOpponent=(this.nbGolems1==5)||(this.nbGolems2==5)
      this.isTileControlledByOpponent=
        ((this.nbGolems1 > this.nbGolems2) && (this.nbGolems1 > this.nbGolems3)
        ||(this.nbGolems2 > this.nbGolems1) && (this.nbGolems2 > this.nbGolems3))
    }
  }
}

export class GolemTools {

  golemCount(golems:Material, activePlayer:PlayerColor) : GolemCount {
    return new GolemCount(golems, activePlayer)
  }
}

export const golemTools = new GolemTools()
