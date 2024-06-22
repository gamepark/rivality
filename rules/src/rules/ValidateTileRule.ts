import { CustomMove, isSelectItemType, ItemMove, MaterialMove, PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import { Button } from '../material/Button'
import { CustomMoveType } from './CustomMoveType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Orientation } from '../Orientation'
import { RuleId } from './RuleId'
import { wizardTools } from '../logic/WizardTools'

export class ValidateTileRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    // Possible actions: Validate, Turn tile, Abort
    return [
      this.rules().customMove(CustomMoveType.Validate),
      this.rules().customMove(CustomMoveType.RotateClockwise),
      this.rules().customMove(CustomMoveType.Cancel),
      ...this.material(MaterialType.Button).location(LocationType.Board).selectItems()
    ]
  }

  coordinatesOfTileWithWizard(): XYCoordinates {
    const wizardItem=this.material(MaterialType.Wizard)
      .location(LocationType.Board)
      .filter(item => item.id==wizardTools.playerWizard(this.getActivePlayer()))
      .getItem()!
    return {x: wizardItem.location.x!, y: wizardItem.location.y!}
  }

  tileWithWizard() {
    const coords=this.coordinatesOfTileWithWizard()
    return this.material(MaterialType.Tile)
      .location(LocationType.Board)
      .filter(item => item.location.x===coords.x && item.location.y===coords.y)
  }

  golemsOnTileWithWizard() {
    const coords=this.coordinatesOfTileWithWizard()
    return this.material(MaterialType.Golem)
      .location(LocationType.Board)
      .filter(item => item.location.x===coords.x && item.location.y===coords.y)
  }

  rotateActions(): MaterialMove[]{
    // 1 - Get current orientation
    let currentOrientation=Orientation.North
    let tileItem=this.tileWithWizard().getItem()
    if (tileItem!==undefined){
      currentOrientation=tileItem.location.rotation
    }

    // 2 - Compute new orientation
    let orientation=Orientation.North
    switch (currentOrientation){
      case Orientation.West:  orientation=Orientation.North; break
      case Orientation.North: orientation=Orientation.East; break
      case Orientation.East:  orientation=Orientation.South; break
      case Orientation.South: orientation=Orientation.West; break
    }

    // 3 - Apply new orientation
    return [this.tileWithWizard().moveItemsAtOnce({ rotation:orientation })]
  }

  validateActions(): MaterialMove[]{
    return [this.rules().startPlayerTurn(RuleId.PrepareCastSpell, this.getActivePlayer())]
  }

  cancelActions(): MaterialMove[]{
    let moves:MaterialMove[]=[]
    const player=this.getActivePlayer()

    // Retrieve the golem on the tile with the wizard
    moves.push(this.golemsOnTileWithWizard().moveItemsAtOnce({type:LocationType.PlayerGolemStack, player}))

    // Move back the tile to the player's hand
    // x:1 or 2
    // rotation: same as other card
    const playerHand=this.material(MaterialType.Tile)
      .location(LocationType.PlayerHand)
      .player(player)
    let playerHandRotation=Orientation.North
    let newHandX=1
    if (playerHand.length > 0){
      const firstTileInHand=playerHand.getItems()[0]
      playerHandRotation=firstTileInHand.location.rotation
      if (firstTileInHand.location.x===1)
        newHandX=2
    }

    moves.push(this.tileWithWizard().moveItemsAtOnce({
      type:LocationType.PlayerHand,
      player,
      x:newHandX,
      rotation:playerHandRotation
    }))

    // Allow the player to perform an other move
    moves.push(this.rules().startPlayerTurn(RuleId.ChooseTile, player))

    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isSelectItemType(MaterialType.Button)(move)){
      const buttonId=this.material(MaterialType.Button).index(move.itemIndex).getItem()?.id
      switch (buttonId){
        case Button.Rotator:  return this.rotateActions()
        case Button.Cancel:   return this.cancelActions()
        case Button.Validate: return this.validateActions()
      }
    }
    return []
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    switch (move.type){
      case CustomMoveType.RotateClockwise:
        return this.rotateActions()
      case CustomMoveType.Validate:
        return this.validateActions()
      case CustomMoveType.Cancel:
        return this.cancelActions()
    }
    return []
  }
}
