/** @jsxImportSource @emotion/react */
import { RivalityOptionsSpec } from '@gamepark/rivality/RivalityOptions'
import { RivalityRules } from '@gamepark/rivality/RivalityRules'
import { RivalitySetup } from '@gamepark/rivality/RivalitySetup'
import { GameProvider, MaterialGameAnimations, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider game="rivality" Rules={RivalityRules} optionsSpec={RivalityOptionsSpec} GameSetup={RivalitySetup}
                  material={Material} locators={Locators} animations={new MaterialGameAnimations()}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
