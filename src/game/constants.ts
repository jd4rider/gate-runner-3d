import type {
  GateDefinition,
  HazardDefinition,
  LaneIndex,
  LevelDefinition,
} from './types'

export const LANE_POSITIONS = [-3.4, 0, 3.4] as const
export const TRACK_WIDTH = 12
export const STARTING_UNITS = 1
export const BEST_SCORE_STORAGE_KEY = 'gate-shift-runner-best-score'
export const SWIPE_THRESHOLD = 36

export const CAMERA_DISTANCE = 12
export const CAMERA_HEIGHT = 7.2
export const CAMERA_LOOK_AHEAD = 9

const addGate = (id: string, z: number, lane: LaneIndex, amount: number): GateDefinition => ({
  id,
  lane,
  operation: {
    kind: 'add',
    label: amount > 0 ? `+${amount}` : `${amount}`,
    tone: amount >= 0 ? 'positive' : 'negative',
    value: amount,
  },
  z,
})

const multiplyGate = (
  id: string,
  z: number,
  lane: LaneIndex,
  amount: number,
): GateDefinition => ({
  id,
  lane,
  operation: {
    kind: 'multiply',
    label: `x${amount}`,
    tone: 'positive',
    value: amount,
  },
  z,
})

const divideGate = (id: string, z: number, lane: LaneIndex, amount: number): GateDefinition => ({
  id,
  lane,
  operation: {
    kind: 'divide',
    label: `/${amount}`,
    tone: 'negative',
    value: amount,
  },
  z,
})

const hazard = (id: string, z: number, lane: LaneIndex, damage: number): HazardDefinition => ({
  damage,
  id,
  lane,
  z,
})

export const LEVELS: LevelDefinition[] = [
  {
    id: 'warmup-corridor',
    name: 'Warmup Corridor',
    description: 'A readable opener with forgiving choices and a few obvious traps.',
    difficulty: 'Easy',
    length: 96,
    speed: 11.5,
    gates: [
      addGate('l1-g1', 12, 0, 5),
      addGate('l1-g2', 12, 1, 10),
      addGate('l1-g3', 12, 2, -3),
      multiplyGate('l1-g4', 24, 0, 2),
      addGate('l1-g5', 24, 1, 5),
      divideGate('l1-g6', 24, 2, 2),
      addGate('l1-g7', 40, 0, 10),
      addGate('l1-g8', 40, 1, -3),
      addGate('l1-g9', 40, 2, 5),
      divideGate('l1-g10', 54, 0, 2),
      multiplyGate('l1-g11', 54, 1, 2),
      addGate('l1-g12', 54, 2, 10),
      addGate('l1-g13', 72, 0, 5),
      addGate('l1-g14', 72, 1, -3),
      multiplyGate('l1-g15', 72, 2, 2),
      addGate('l1-g16', 84, 0, 10),
      divideGate('l1-g17', 84, 1, 2),
      addGate('l1-g18', 84, 2, 5),
    ],
    hazards: [
      hazard('l1-h1', 31, 1, 2),
      hazard('l1-h2', 33, 2, 1),
      hazard('l1-h3', 62, 0, 3),
      hazard('l1-h4', 64, 2, 2),
      hazard('l1-h5', 78, 1, 4),
    ],
  },
  {
    id: 'switchback-run',
    name: 'Switchback Run',
    description: 'Bigger swings, faster pacing, and tighter hazard spacing.',
    difficulty: 'Medium',
    length: 118,
    speed: 13.1,
    gates: [
      divideGate('l2-g1', 14, 0, 2),
      addGate('l2-g2', 14, 1, 10),
      addGate('l2-g3', 14, 2, 5),
      multiplyGate('l2-g4', 28, 0, 2),
      addGate('l2-g5', 28, 1, -3),
      addGate('l2-g6', 28, 2, 10),
      addGate('l2-g7', 46, 0, 5),
      multiplyGate('l2-g8', 46, 1, 2),
      divideGate('l2-g9', 46, 2, 2),
      addGate('l2-g10', 60, 0, -3),
      addGate('l2-g11', 60, 1, 10),
      multiplyGate('l2-g12', 60, 2, 2),
      multiplyGate('l2-g13', 82, 0, 2),
      divideGate('l2-g14', 82, 1, 2),
      addGate('l2-g15', 82, 2, 10),
      addGate('l2-g16', 96, 0, 5),
      addGate('l2-g17', 96, 1, -3),
      multiplyGate('l2-g18', 96, 2, 2),
      divideGate('l2-g19', 108, 0, 2),
      addGate('l2-g20', 108, 1, 10),
      addGate('l2-g21', 108, 2, 5),
    ],
    hazards: [
      hazard('l2-h1', 35, 0, 2),
      hazard('l2-h2', 37, 1, 4),
      hazard('l2-h3', 39, 2, 3),
      hazard('l2-h4', 69, 0, 5),
      hazard('l2-h5', 71, 1, 2),
      hazard('l2-h6', 73, 2, 5),
      hazard('l2-h7', 101, 1, 6),
    ],
  },
  {
    id: 'final-gauntlet',
    name: 'Final Gauntlet',
    description: 'A sharper route with higher upside and more punishing misses.',
    difficulty: 'Hard',
    length: 134,
    speed: 14.6,
    gates: [
      addGate('l3-g1', 12, 0, 10),
      divideGate('l3-g2', 12, 1, 2),
      addGate('l3-g3', 12, 2, 5),
      addGate('l3-g4', 24, 0, -3),
      multiplyGate('l3-g5', 24, 1, 2),
      divideGate('l3-g6', 24, 2, 2),
      multiplyGate('l3-g7', 42, 0, 2),
      addGate('l3-g8', 42, 1, 10),
      addGate('l3-g9', 42, 2, -3),
      divideGate('l3-g10', 56, 0, 2),
      addGate('l3-g11', 56, 1, 5),
      multiplyGate('l3-g12', 56, 2, 2),
      addGate('l3-g13', 76, 0, 10),
      addGate('l3-g14', 76, 1, -3),
      divideGate('l3-g15', 76, 2, 2),
      multiplyGate('l3-g16', 90, 0, 2),
      divideGate('l3-g17', 90, 1, 2),
      addGate('l3-g18', 90, 2, 5),
      divideGate('l3-g19', 108, 0, 2),
      addGate('l3-g20', 108, 1, 10),
      multiplyGate('l3-g21', 108, 2, 2),
      addGate('l3-g22', 122, 0, -3),
      addGate('l3-g23', 122, 1, 5),
      addGate('l3-g24', 122, 2, 10),
    ],
    hazards: [
      hazard('l3-h1', 31, 0, 4),
      hazard('l3-h2', 33, 1, 2),
      hazard('l3-h3', 35, 2, 4),
      hazard('l3-h4', 63, 0, 5),
      hazard('l3-h5', 65, 1, 3),
      hazard('l3-h6', 67, 2, 5),
      hazard('l3-h7', 97, 0, 6),
      hazard('l3-h8', 99, 1, 2),
      hazard('l3-h9', 101, 2, 6),
    ],
  },
]
