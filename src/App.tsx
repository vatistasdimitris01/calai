import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import SplashLoader from '@/components/SplashLoader'
import DesktopBlocker from '@/components/DesktopBlocker'
import Onboarding from '@/pages/Onboarding'
import Home from '@/pages/Home'
import Camera from '@/pages/Camera'
import Loading from '@/pages/Loading'
import Result from '@/pages/Result'
import Analytics from '@/pages/Analytics'

function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

function AppShell() {
  const navigate = useNavigate()
  const [splashDone, setSplashDone] = useState(false)
  const [onboardingDone, setOnboardingDone] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('calai_onboarding_done')) setOnboardingDone(true)
  }, [])

  const handleOnboardingFinish = useCallback(() => {
    localStorage.setItem('calai_onboarding_done', 'true')
    setOnboardingDone(true)
    navigate('/')
  }, [navigate])

  if (!isMobile()) return <DesktopBlocker />

  if (!splashDone) return <SplashLoader onFinish={() => setSplashDone(true)} />
  if (!onboardingDone) return <Onboarding onFinish={handleOnboardingFinish} />

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/result" element={<Result />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <AppShell />
      </div>
    </BrowserRouter>
  )
}
