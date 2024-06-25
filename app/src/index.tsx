/** @jsxImportSource @emotion/react */
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { RivalityOptionsSpec } from '@gamepark/rivality/RivalityOptions'
import { RivalityRules } from '@gamepark/rivality/RivalityRules'
import { RivalitySetup } from '@gamepark/rivality/RivalitySetup'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { rivalityAnimations } from './RivalityAnimations'
import translations from './translations.json'
import { Tutorial } from './tutorial/Tutorial'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="rivality"
      Rules={RivalityRules}
      optionsSpec={RivalityOptionsSpec}
      GameSetup={RivalitySetup}
      material={Material}
      locators={Locators}
      animations={rivalityAnimations}
      tutorial={new Tutorial()}
    >
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
