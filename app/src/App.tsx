/** @jsxImportSource @emotion/react */
import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialHeader, MaterialImageLoader, Menu, useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useEffect, useState } from 'react'
import { GameDisplay } from './GameDisplay'
import { Headers } from './headers/Headers'

export default function App() {
  const game = useGame<MaterialGame>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  const [isImagesLoading, setImagesLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])
  const loading = !game || isJustDisplayed || isImagesLoading
  return (
    <>
      { !!game && <GameDisplay players={game.players} /> }
      <LoadingScreen display={loading} author="François Bachelart" artist="Lucie Mercier" publisher="Nostromo Editions" developer="Denis Boulanger"/>
      <MaterialHeader rulesStepsHeaders={Headers} loading={loading}/>
      <MaterialImageLoader onImagesLoad={() => setImagesLoading(false)} />
      <Menu/>
      <FailuresDialog/>
      <FullscreenDialog/>
    </>
  )
}
