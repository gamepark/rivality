import { CustomMove, isSelectItemType, ItemMove, isCustomMove, MaterialItem, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CustomMoveType } from './CustomMoveType'
import { BoardSpace } from '../material/BoardSpace'
import { Button } from '../material/Button'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { Orientation } from '../Orientation'
import { RuleId } from './RuleId'

export class AskSpellOrientationRule extends PlayerTurnRule {
  onRuleStart(){
    const moves:MaterialMove[]=[]
    // Remove any previous button
    moves.push(this.material(MaterialType.Button).location(LocationType.Board).deleteItemsAtOnce())

    // Add needed buttons
    const legalMoves:MaterialMove[]=this.listPossiblePlayerMoves()
    const newButtons:MaterialItem[]=[]
    let boardButtons:Button[]=[]

    if (legalMoves
      .filter((move) =>
        isCustomMove(move) && move.type===CustomMoveType.North)
      .length > 0)
      boardButtons.push(Button.ChooseSpellNorth)

    if (legalMoves
      .filter((move) =>
        isCustomMove(move) && move.type===CustomMoveType.East)
      .length > 0)
      boardButtons.push(Button.ChooseSpellEast)

    if (legalMoves
      .filter((move) =>
        isCustomMove(move) && move.type===CustomMoveType.South)
      .length > 0)
      boardButtons.push(Button.ChooseSpellSouth)

    if (legalMoves
      .filter((move) =>
        isCustomMove(move) && move.type===CustomMoveType.West)
      .length > 0)
      boardButtons.push(Button.ChooseSpellWest)

    boardButtons.forEach(button => {
      newButtons.push({
        id: button,
        location: {
          type: LocationType.Board,
          id: BoardSpace.Button
        }
      })
    })
    moves.push(this.material(MaterialType.Button).createItemsAtOnce(newButtons))

    return moves
  }

  onRuleEnd(){
    // Remove all buttons
    return [this.material(MaterialType.Button).location(LocationType.Board).deleteItemsAtOnce()]
  }

  // Only custom moves
  listPossiblePlayerMoves(): MaterialMove[] {
    let moves:MaterialMove[]=[]

    if (!this.remind(Memory.AppliedSpellNorth)===true)
      moves.push(this.rules().customMove(CustomMoveType.North))
    if (!this.remind(Memory.AppliedSpellEast)===true)
      moves.push(this.rules().customMove(CustomMoveType.East))
    if (!this.remind(Memory.AppliedSpellSouth)===true)
      moves.push(this.rules().customMove(CustomMoveType.South))
    if (!this.remind(Memory.AppliedSpellWest)===true)
      moves.push(this.rules().customMove(CustomMoveType.West))

    return moves
  }

  getPlayerMoves(): MaterialMove[] {
    let moves:MaterialMove[]=[]

    // Header moves
    moves.push(...this.listPossiblePlayerMoves())

    // Button moves
    moves.push(...this.material(MaterialType.Button).location(LocationType.Board).selectItems())

    return moves
  }

  applyEffect(spellOrientation:Orientation): MaterialMove[] {
    this.memorize(Memory.SpellOrientation, spellOrientation)
    return [this.rules().startPlayerTurn(RuleId.ApplySpellEffect, this.getActivePlayer())]
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    let spellOrientation:Orientation|undefined=undefined
    switch (move.type){
      case CustomMoveType.North:
        spellOrientation=Orientation.North
        break
      case CustomMoveType.East:
        spellOrientation=Orientation.East
        break
      case CustomMoveType.South:
        spellOrientation=Orientation.South
        break
      case CustomMoveType.West:
        spellOrientation=Orientation.West
        break
    }
    if (spellOrientation===undefined){
      console.log("*** ERROR - Unknown spell orientation => Game is stuck")
      return []
    }
    return this.applyEffect(spellOrientation)
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isSelectItemType(MaterialType.Button)(move)){
      const buttonId=this.material(MaterialType.Button).getItem(move.itemIndex)?.id
      let spellOrientation:Orientation|undefined=undefined
      switch (buttonId){
        case Button.ChooseSpellNorth:
          spellOrientation=Orientation.North
          break
        case Button.ChooseSpellEast:
          spellOrientation=Orientation.East
          break
        case Button.ChooseSpellSouth:
          spellOrientation=Orientation.South
          break
        case Button.ChooseSpellWest:
          spellOrientation=Orientation.West
          break
      }
      if (spellOrientation===undefined){
        console.log("*** ERROR - Unknown spell orientation => Game is stuck")
        return []
      }
      return this.applyEffect(spellOrientation)
    }
    return []
  }
}
