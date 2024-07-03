import { RivalityOptions } from '@gamepark/rivality/RivalityOptions'
import { RivalitySetup } from '@gamepark/rivality/RivalitySetup'
import { tests } from './RivalityTests'
import { Memory } from '@gamepark/rivality/rules/Memory'

export class RivalityTestSetup extends RivalitySetup {
  setupMaterial(options: RivalityOptions & { test?: number }) {
    // Global parameters
    this.memorize(Memory.RealTimeScore, options.realTimeScore ?? false)

    this.setupTiles(options)
    this.setupGolems(options)
    this.setupWizards(options)

    // Tests
    if (options.test !== undefined) {
      console.log('Test mode')
      tests.setupMaterial(this, options.test, options.players)
      return
    }

    this.setupPlayerHands(options)
  }

  start(options: RivalityOptions & { test?: number }) {
    if (options.test !== undefined) {
      tests.start(this, options.test)
    } else {
      super.start(options)
    }
  }
}
