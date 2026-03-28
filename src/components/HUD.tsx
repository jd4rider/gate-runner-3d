import { useRef } from 'react'

interface HUDProps {
  bestScore: number
  difficulty: string
  levelName: string
  progress: number
  score: number
  units: number
  onRestart: () => void
  onReturnToMenu: () => void
  onSteer: (ratio: number) => void
  onSteerEnd: () => void
  steeringRatio: number
}

export function HUD({
  bestScore,
  difficulty,
  levelName,
  progress,
  score,
  units,
  onRestart,
  onReturnToMenu,
  onSteer,
  onSteerEnd,
  steeringRatio,
}: HUDProps) {
  const progressPercent = Math.round(progress * 100)
  const activePointerId = useRef<number | null>(null)

  const updateSteering = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const ratio = (event.clientX - bounds.left) / bounds.width
    onSteer(ratio)
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    activePointerId.current = event.pointerId
    event.currentTarget.setPointerCapture(event.pointerId)
    updateSteering(event)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerId.current !== event.pointerId) {
      return
    }

    updateSteering(event)
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerId.current !== event.pointerId) {
      return
    }

    activePointerId.current = null
    event.currentTarget.releasePointerCapture(event.pointerId)
    onSteerEnd()
  }

  return (
    <div className="hud">
      <div className="hud__panel hud__panel--desktop">
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

      <div className="hud__panel hud__panel--mobile">
        <div className="mobile-hud__top">
          <div className="mobile-hud__title">
            <strong>{levelName}</strong>
            <span>{difficulty}</span>
          </div>

          <div className="mobile-hud__actions">
            <button className="mobile-hud__action" onClick={onRestart} type="button">
              Restart
            </button>
            <button className="mobile-hud__action" onClick={onReturnToMenu} type="button">
              Menu
            </button>
          </div>
        </div>

        <div className="mobile-hud__stats">
          <div className="mobile-hud__chip">
            <span>Units</span>
            <strong>{units}</strong>
          </div>
          <div className="mobile-hud__chip">
            <span>Score</span>
            <strong>{score}</strong>
          </div>
          <div className="mobile-hud__chip">
            <span>Progress</span>
            <strong>{progressPercent}%</strong>
          </div>
        </div>
      </div>

      <div className="touch-controls" aria-label="Mobile lane controls">
        <div
          aria-label="Touch steering"
          className="touch-controls__pad"
          onPointerCancel={handlePointerUp}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className="touch-controls__track">
            <span className="touch-controls__marker">L</span>
            <span className="touch-controls__marker">M</span>
            <span className="touch-controls__marker">R</span>
            <span className="touch-controls__thumb" style={{ left: `${steeringRatio * 100}%` }} />
          </div>
          <p className="touch-controls__caption">Drag to steer smoothly</p>
        </div>
      </div>
    </div>
  )
}
