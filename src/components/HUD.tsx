interface HUDProps {
  bestScore: number
  difficulty: string
  levelName: string
  progress: number
  score: number
  units: number
  onMoveLeft: () => void
  onMoveRight: () => void
  onRestart: () => void
  onReturnToMenu: () => void
}

export function HUD({
  bestScore,
  difficulty,
  levelName,
  progress,
  score,
  units,
  onMoveLeft,
  onMoveRight,
  onRestart,
  onReturnToMenu,
}: HUDProps) {
  const progressPercent = Math.round(progress * 100)

  return (
    <div className="hud">
      <div className="hud__panel">
        <div className="hud__top">
          <div>
            <p className="eyebrow">Now Running</p>
            <h2>
              {levelName} <span>{difficulty}</span>
            </h2>
          </div>

          <div className="hud__actions">
            <button className="button button--ghost" onClick={onRestart} type="button">
              Restart
            </button>
            <button className="button button--ghost" onClick={onReturnToMenu} type="button">
              Menu
            </button>
          </div>
        </div>

        <div className="hud__stats">
          <div className="stat-card">
            <span>Units</span>
            <strong>{units}</strong>
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

        <div className="progress-card">
          <div className="progress-card__row">
            <span>Progress</span>
            <strong>{progressPercent}%</strong>
          </div>
          <div className="progress-bar">
            <span style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="hud__hint">Left / Right or A / D. R restarts. Esc returns to menu.</p>
        </div>
      </div>

      <div className="touch-controls" aria-label="Mobile lane controls">
        <button className="touch-controls__button" onClick={onMoveLeft} type="button">
          Left
        </button>
        <button className="touch-controls__button" onClick={onMoveRight} type="button">
          Right
        </button>
      </div>
    </div>
  )
}
