import { useCallback, useEffect, useState } from 'react'
import { BEST_SCORE_STORAGE_KEY, LEVELS, STARTING_UNITS } from './constants'
import type {
  GameSnapshot,
  GateDefinition,
  GameStatus,
  HazardDefinition,
  LaneIndex,
} from './types'

const clampLane = (lane: number) => Math.max(0, Math.min(2, lane)) as LaneIndex

const readBestScore = () => {
  if (typeof window === 'undefined') {
    return 0
  }

  const rawValue = window.localStorage.getItem(BEST_SCORE_STORAGE_KEY)
  const parsedValue = Number.parseInt(rawValue ?? '0', 10)

  return Number.isFinite(parsedValue) ? parsedValue : 0
}

const computeScore = (units: number, playerZ: number, clearedLevel: boolean) =>
  Math.max(0, Math.floor(playerZ * 10) + Math.max(0, units - STARTING_UNITS) * 45 + (clearedLevel ? 250 : 0))

const applyGateOperation = (units: number, gate: GateDefinition) => {
  switch (gate.operation.kind) {
    case 'add':
      return units + gate.operation.value
    case 'multiply':
      return units * gate.operation.value
    case 'divide':
      return Math.floor(units / gate.operation.value)
    default:
      return units
  }
}

const applyHazard = (units: number, hazard: HazardDefinition) => units - hazard.damage

const createSnapshot = (
  levelIndex: number,
  bestScore: number,
  status: Extract<GameStatus, 'menu' | 'playing'>,
): GameSnapshot => {
  const level = LEVELS[levelIndex]

  return {
    appliedGateIds: new Set(),
    bestScore,
    hitHazardIds: new Set(),
    level,
    levelIndex,
    playerLane: 1,
    playerZ: 0,
    progress: 0,
    score: 0,
    status,
    units: STARTING_UNITS,
  }
}

export const useRunnerGame = () => {
  const [game, setGame] = useState<GameSnapshot>(() => createSnapshot(0, readBestScore(), 'menu'))

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(BEST_SCORE_STORAGE_KEY, String(game.bestScore))
  }, [game.bestScore])

  const selectLevel = useCallback((levelIndex: number) => {
    setGame((current) =>
      createSnapshot(Math.max(0, Math.min(LEVELS.length - 1, levelIndex)), current.bestScore, 'menu'),
    )
  }, [])

  const startSelectedLevel = useCallback(() => {
    setGame((current) => createSnapshot(current.levelIndex, current.bestScore, 'playing'))
  }, [])

  const restartLevel = useCallback(() => {
    setGame((current) => createSnapshot(current.levelIndex, current.bestScore, 'playing'))
  }, [])

  const returnToMenu = useCallback(() => {
    setGame((current) => createSnapshot(current.levelIndex, current.bestScore, 'menu'))
  }, [])

  const startNextLevel = useCallback(() => {
    setGame((current) =>
      createSnapshot(Math.min(current.levelIndex + 1, LEVELS.length - 1), current.bestScore, 'playing'),
    )
  }, [])

  const moveLeft = useCallback(() => {
    setGame((current) =>
      current.status === 'playing'
        ? {
            ...current,
            playerLane: clampLane(current.playerLane - 1),
          }
        : current,
    )
  }, [])

  const moveRight = useCallback(() => {
    setGame((current) =>
      current.status === 'playing'
        ? {
            ...current,
            playerLane: clampLane(current.playerLane + 1),
          }
        : current,
    )
  }, [])

  const step = useCallback((delta: number) => {
    const safeDelta = Math.min(delta, 0.08)

    setGame((current) => {
      if (current.status !== 'playing') {
        return current
      }

      const previousZ = current.playerZ
      const nextZ = Math.min(current.playerZ + current.level.speed * safeDelta, current.level.length)
      const appliedGateIds = new Set(current.appliedGateIds)
      const hitHazardIds = new Set(current.hitHazardIds)
      let nextUnits = current.units

      for (const gate of current.level.gates) {
        const crossedGate = previousZ < gate.z && nextZ >= gate.z
        const inSameLane = current.playerLane === gate.lane

        if (!appliedGateIds.has(gate.id) && crossedGate && inSameLane) {
          nextUnits = applyGateOperation(nextUnits, gate)
          appliedGateIds.add(gate.id)
        }
      }

      for (const hazard of current.level.hazards) {
        const crossedHazard = previousZ < hazard.z && nextZ >= hazard.z
        const inSameLane = current.playerLane === hazard.lane

        if (!hitHazardIds.has(hazard.id) && crossedHazard && inSameLane) {
          nextUnits = applyHazard(nextUnits, hazard)
          hitHazardIds.add(hazard.id)
        }
      }

      let nextStatus: GameStatus = 'playing'

      if (nextUnits <= 0) {
        nextUnits = 0
        nextStatus = 'lost'
      } else if (nextZ >= current.level.length) {
        nextStatus = 'won'
      }

      const clearedLevel = nextStatus === 'won'
      const nextScore = computeScore(nextUnits, nextZ, clearedLevel)
      const nextBestScore =
        nextStatus === 'won' || nextStatus === 'lost'
          ? Math.max(current.bestScore, nextScore)
          : current.bestScore

      return {
        ...current,
        appliedGateIds,
        bestScore: nextBestScore,
        hitHazardIds,
        playerZ: nextZ,
        progress: nextZ / current.level.length,
        score: nextScore,
        status: nextStatus,
        units: nextUnits,
      }
    })
  }, [])

  return {
    game,
    levels: LEVELS,
    moveLeft,
    moveRight,
    restartLevel,
    returnToMenu,
    selectLevel,
    startNextLevel,
    startSelectedLevel,
    step,
  }
}
