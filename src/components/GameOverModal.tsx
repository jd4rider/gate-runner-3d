import type { GameStatus } from '../game/types'

interface GameOverModalProps {
  bestScore: number
  levelName: string
  score: number
  status: Extract<GameStatus, 'won' | 'lost'>
  units: number
  onMenu: () => void
  onNextLevel?: () => void
  onRetry: () => void
}

export function GameOverModal({
  bestScore,
  levelName,
  score,
  status,
  units,
  onMenu,
  onNextLevel,
  onRetry,
}: GameOverModalProps) {
  const isWin = status === 'won'

  return (
    <div className="overlay overlay--modal">
      <div className="modal-card">
        <p className="eyebrow">{isWin ? 'Level Cleared' : 'Run Over'}</p>
        <h2>{isWin ? 'Finish line reached' : 'Unit count dropped to zero'}</h2>
        <p className="lead">
          {levelName} ended with <strong>{units}</strong> unit{units === 1 ? '' : 's'} and a score
          of <strong>{score}</strong>.
        </p>

        <div className="modal-stats">
          <div className="stat-card">
            <span>Result</span>
            <strong>{isWin ? 'Win' : 'Loss'}</strong>
          </div>
          <div className="stat-card">
            <span>Score</span>
            <strong>{score}</strong>
          </div>
          <div className="stat-card">
            <span>Best</span>
            <strong>{bestScore}</strong>
          </div>
        </div>

        <div className="modal-actions">
          <button className="button" onClick={onRetry} type="button">
            {isWin ? 'Run Again' : 'Retry Level'}
          </button>

          {onNextLevel && (
            <button className="button button--secondary" onClick={onNextLevel} type="button">
              Next Level
            </button>
          )}

          <button className="button button--ghost" onClick={onMenu} type="button">
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  )
}
