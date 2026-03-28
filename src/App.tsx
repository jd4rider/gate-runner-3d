import { useEffect } from 'react'
import { useCallback } from 'react'
import { GameOverModal } from './components/GameOverModal'
import { HUD } from './components/HUD'
import { StartScreen } from './components/StartScreen'
import { LANE_POSITIONS } from './game/constants'
import { RunnerScene } from './game/RunnerScene'
import { useRunnerGame } from './game/useRunnerGame'

function App() {
  const {
    game,
    finishSteering,
    levels,
    moveLeft,
    moveRight,
    restartLevel,
    returnToMenu,
    selectLevel,
    steerToRatio,
    startNextLevel,
    startSelectedLevel,
    step,
  } = useRunnerGame()
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

  const hasNextLevel = game.levelIndex < levels.length - 1
  const steeringRatio =
    (LANE_POSITIONS[0] - game.playerTargetX) / (LANE_POSITIONS[0] - LANE_POSITIONS[2])

  return (
    <div className="app-shell">
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
          onRestart={restartLevel}
          onReturnToMenu={returnToMenu}
          onSteer={steerToRatio}
          onSteerEnd={finishSteering}
          steeringRatio={steeringRatio}
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
