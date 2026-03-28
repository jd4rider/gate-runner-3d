import type { LevelDefinition } from '../game/types'

interface StartScreenProps {
  bestScore: number
  levels: LevelDefinition[]
  selectedLevelIndex: number
  onSelectLevel: (levelIndex: number) => void
  onStart: () => void
}

export function StartScreen({
  bestScore,
  levels,
  selectedLevelIndex,
  onSelectLevel,
  onStart,
}: StartScreenProps) {
  return (
    <div className="overlay overlay--start">
      <div className="start-panel">
        <p className="eyebrow">React + Three Fiber prototype</p>
        <h1>Gate Shift Runner</h1>
        <p className="lead">
          Shift across three lanes, cross growth gates, avoid hazards, and reach the finish with at
          least one unit left.
        </p>

        <div className="hero-row">
          <button className="button" onClick={onStart} type="button">
            Start Run
          </button>
          <div className="score-chip">
            <span>Best Score</span>
            <strong>{bestScore}</strong>
          </div>
        </div>

        <div className="level-grid">
          {levels.map((level, index) => {
            const isSelected = index === selectedLevelIndex

            return (
              <button
                key={level.id}
                className={`level-card ${isSelected ? 'level-card--selected' : ''}`}
                onClick={() => onSelectLevel(index)}
                type="button"
              >
                <span className="level-card__difficulty">{level.difficulty}</span>
                <strong>{level.name}</strong>
                <p>{level.description}</p>
                <div className="level-card__stats">
                  <span>Speed {level.speed.toFixed(1)}</span>
                  <span>{level.gates.length} gates</span>
                  <span>{level.hazards.length} hazards</span>
                </div>
              </button>
            )
          })}
        </div>

        <div className="tips-grid">
          <div className="tip-card">
            <strong>Desktop</strong>
            <p>Use Left / Right arrows or A / D to move between lanes.</p>
          </div>
          <div className="tip-card">
            <strong>Mobile</strong>
            <p>Swipe left or right, or tap the large touch zones while running.</p>
          </div>
          <div className="tip-card">
            <strong>Goal</strong>
            <p>Positive gates grow the group. Negative gates and hazards can end the run.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
