import { GameProvider } from '@gamepark/react-game'
import { RivalityOptionsSpec } from '@gamepark/rivality/RivalityOptions'
import { RivalityRules } from '@gamepark/rivality/RivalityRules'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { rivalityAnimations } from './RivalityAnimations'
import { RivalityTestSetup } from './tests/RivalityTestSetup'
import { Tutorial } from './tutorial/Tutorial'
import { ai } from './tutorial/TutorialAi'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="rivality"
      Rules={RivalityRules}
      optionsSpec={RivalityOptionsSpec}
      GameSetup={RivalityTestSetup}
      material={Material}
      locators={Locators}
      animations={rivalityAnimations}
      tutorial={new Tutorial()}
      ai={ai}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
