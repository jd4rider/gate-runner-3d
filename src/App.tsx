import { useEffect, useRef } from 'react'
import { useCallback } from 'react'
import { GameOverModal } from './components/GameOverModal'
import { HUD } from './components/HUD'
import { StartScreen } from './components/StartScreen'
import { SWIPE_THRESHOLD } from './game/constants'
import { RunnerScene } from './game/RunnerScene'
import { useRunnerGame } from './game/useRunnerGame'

function App() {
  const {
    game,
    levels,
    moveLeft,
    moveRight,
    restartLevel,
    returnToMenu,
    selectLevel,
    startNextLevel,
    startSelectedLevel,
    step,
  } = useRunnerGame()

  const touchStartX = useRef<number | null>(null)
  const handleExit = useCallback(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (window.history.length > 1) {
      window.history.back()
      return
    }

    window.location.assign('https://github.com/jd4rider/gate-runner-3d')
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return
      }

      const key = event.key.toLowerCase()

      if (game.status === 'menu') {
        if (key === 'enter' || key === ' ') {
          event.preventDefault()
          startSelectedLevel()
        }
        return
      }

      if (game.status === 'playing') {
        if (key === 'arrowleft' || key === 'a') {
          event.preventDefault()
          moveLeft()
        } else if (key === 'arrowright' || key === 'd') {
          event.preventDefault()
          moveRight()
        } else if (key === 'r') {
          event.preventDefault()
          restartLevel()
        } else if (key === 'escape') {
          event.preventDefault()
          returnToMenu()
        }
        return
      }

      if (key === 'enter' || key === 'r') {
        event.preventDefault()
        restartLevel()
      } else if (key === 'escape') {
        event.preventDefault()
        returnToMenu()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    game.status,
    moveLeft,
    moveRight,
    restartLevel,
    returnToMenu,
    startSelectedLevel,
  ])

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (game.status !== 'playing') {
      return
    }

    touchStartX.current = event.changedTouches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (game.status !== 'playing' || touchStartX.current === null) {
      return
    }

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current
    const deltaX = endX - touchStartX.current

    if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
      if (deltaX > 0) {
        moveRight()
      } else {
        moveLeft()
      }
    }

    touchStartX.current = null
  }

  const hasNextLevel = game.levelIndex < levels.length - 1

  return (
    <div className="app-shell" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="app-shell__scene">
        <RunnerScene game={game} onStep={step} />
      </div>

      {game.status === 'menu' ? (
        <StartScreen
          bestScore={game.bestScore}
          levels={levels}
          selectedLevelIndex={game.levelIndex}
          onExit={handleExit}
          onSelectLevel={selectLevel}
          onStart={startSelectedLevel}
        />
      ) : (
        <HUD
          bestScore={game.bestScore}
          difficulty={game.level.difficulty}
          levelName={game.level.name}
          progress={game.progress}
          score={game.score}
          units={game.units}
          onMoveLeft={moveLeft}
          onMoveRight={moveRight}
          onRestart={restartLevel}
          onReturnToMenu={returnToMenu}
        />
      )}

      {(game.status === 'won' || game.status === 'lost') && (
        <GameOverModal
          bestScore={game.bestScore}
          levelName={game.level.name}
          score={game.score}
          status={game.status}
          units={game.units}
          onMenu={returnToMenu}
          onNextLevel={hasNextLevel ? startNextLevel : undefined}
          onRetry={restartLevel}
        />
      )}
    </div>
  )
}

export default App
