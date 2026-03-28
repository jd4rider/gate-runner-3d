import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Vector3 } from 'three'
import {
  CAMERA_DISTANCE,
  CAMERA_HEIGHT,
  CAMERA_LOOK_AHEAD,
} from './constants'
import type { GameSnapshot } from './types'
import { FinishLine } from './components/FinishLine'
import { Gate } from './components/Gate'
import { Hazard } from './components/Hazard'
import { Player } from './components/Player'
import { Track } from './components/Track'

interface RunnerSceneProps {
  game: GameSnapshot
  onStep: (delta: number) => void
}

function SceneContents({ game, onStep }: RunnerSceneProps) {
  const { camera } = useThree()
  const desiredCameraPosition = useRef(new Vector3(0, CAMERA_HEIGHT, -CAMERA_DISTANCE))
  const desiredLookTarget = useRef(new Vector3(0, 1.4, CAMERA_LOOK_AHEAD))
  const smoothedLookTarget = useRef(new Vector3(0, 1.4, CAMERA_LOOK_AHEAD))

  useFrame((_, delta) => {
    onStep(delta)

    const playerX = game.playerX

    desiredCameraPosition.current.set(playerX * 0.2, CAMERA_HEIGHT, game.playerZ - CAMERA_DISTANCE)
    desiredLookTarget.current.set(playerX * 0.1, 1.5, game.playerZ + CAMERA_LOOK_AHEAD)

    const damping = 1 - Math.exp(-delta * 4.5)
    camera.position.lerp(desiredCameraPosition.current, damping)
    smoothedLookTarget.current.lerp(desiredLookTarget.current, damping)
    camera.lookAt(smoothedLookTarget.current)
  })

  return (
    <>
      <color attach="background" args={['#f7d6a1']} />
      <fog attach="fog" args={['#f7d6a1', 28, game.level.length + 48]} />

      <ambientLight intensity={0.75} />
      <directionalLight
        castShadow
        intensity={1.4}
        position={[7, 14, 2]}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
      />

      <Track length={game.level.length} />
      <Player x={game.playerX} units={game.units} z={game.playerZ} />

      {game.level.gates.map((gate) => (
        <Gate
          key={gate.id}
          gate={gate}
          isResolved={game.appliedGateIds.has(gate.id) || game.playerZ > gate.z + 1.2}
        />
      ))}

      {game.level.hazards.map((hazard) => (
        <Hazard
          key={hazard.id}
          hazard={hazard}
          isResolved={game.hitHazardIds.has(hazard.id) || game.playerZ > hazard.z + 1.2}
        />
      ))}

      <FinishLine z={game.level.length} />
    </>
  )
}

export function RunnerScene({ game, onStep }: RunnerSceneProps) {
  return (
    <Canvas
      camera={{ fov: 46, position: [0, CAMERA_HEIGHT, -CAMERA_DISTANCE] }}
      dpr={[1, 1.75]}
      gl={{ antialias: true }}
      shadows
    >
      <SceneContents game={game} onStep={onStep} />
    </Canvas>
  )
}
