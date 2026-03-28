export type LaneIndex = 0 | 1 | 2

export type GameStatus = 'menu' | 'playing' | 'won' | 'lost'

export type GateOperator = 'add' | 'multiply' | 'divide'

export type GateTone = 'positive' | 'negative'

export interface GateOperation {
  kind: GateOperator
  label: string
  tone: GateTone
  value: number
}

export interface GateDefinition {
  id: string
  lane: LaneIndex
  operation: GateOperation
  z: number
}

export interface HazardDefinition {
  damage: number
  id: string
  lane: LaneIndex
  z: number
}

export interface LevelDefinition {
  description: string
  difficulty: string
  gates: GateDefinition[]
  hazards: HazardDefinition[]
  id: string
  length: number
  name: string
  speed: number
}

export interface GameSnapshot {
  appliedGateIds: Set<string>
  bestScore: number
  hitHazardIds: Set<string>
  level: LevelDefinition
  levelIndex: number
  playerLane: LaneIndex
  playerTargetX: number
  playerX: number
  playerZ: number
  progress: number
  score: number
  status: GameStatus
  units: number
}
