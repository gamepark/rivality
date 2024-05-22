//import { LocationType } from '../material/LocationType'
//import { MaterialType } from '../material/MaterialType'
import { Material } from '@gamepark/rules-api'
import { Golem } from '../material/Golem'
import { PlayerId } from '../PlayerId'

export class GolemCount {
  hasFiveGolemsOfASingleOpponent:boolean
  isTileControlledByOpponent:boolean
  nbGolems1:number
  nbGolems2:number
  nbGolems3:number

  nbPlayerGolems(player:PlayerId):number {
    if (player==1) return this.nbGolems1
    if (player==2) return this.nbGolems2
    if (player==3) return this.nbGolems3
    console.log("*** ERROR - Unsupported player number")
    return this.nbGolems1
  }

  constructor(golems:Material, activePlayer:PlayerId){
    this.nbGolems1=golems.filter(item => item.id==Golem.Golem1).length
    this.nbGolems2=golems.filter(item => item.id==Golem.Golem2).length
    this.nbGolems3=golems.filter(item => item.id==Golem.Golem3).length

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
  playerGolem(player:PlayerId): Golem {
    if (player==1)
      return Golem.Golem1
    if (player==2)
      return Golem.Golem2
    if (player==3)
      return Golem.Golem3
    console.log("*** ERROR - Invalid player for golem")
    return Golem.Golem1
  }

  golemCount(golems:Material, activePlayer:PlayerId) : GolemCount {
    return new GolemCount(golems, activePlayer)
  }
}

export const golemTools = new GolemTools()
