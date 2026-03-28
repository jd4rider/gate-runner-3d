import { Html } from '@react-three/drei'
import { LANE_POSITIONS } from '../constants'
import type { GateDefinition } from '../types'

interface GateProps {
  gate: GateDefinition
  isResolved: boolean
}

export function Gate({ gate, isResolved }: GateProps) {
  const x = LANE_POSITIONS[gate.lane]
  const isPositive = gate.operation.tone === 'positive'
  const frameColor = isPositive ? '#2cd38d' : '#f26c5d'
  const panelColor = isPositive ? '#16392f' : '#522722'
  const opacity = isResolved ? 0.25 : 1

  return (
    <group position={[x, 0, gate.z]}>
      <mesh castShadow position={[-0.92, 1.5, 0]}>
        <boxGeometry args={[0.24, 3, 0.24]} />
        <meshStandardMaterial color={frameColor} opacity={opacity} transparent />
      </mesh>

      <mesh castShadow position={[0.92, 1.5, 0]}>
        <boxGeometry args={[0.24, 3, 0.24]} />
        <meshStandardMaterial color={frameColor} opacity={opacity} transparent />
      </mesh>

      <mesh castShadow position={[0, 3.03, 0]}>
        <boxGeometry args={[2.1, 0.24, 0.24]} />
        <meshStandardMaterial color={frameColor} opacity={opacity} transparent />
      </mesh>

      <mesh position={[0, 2.18, 0.14]}>
        <boxGeometry args={[2.02, 1.1, 0.18]} />
        <meshStandardMaterial color={panelColor} opacity={Math.max(opacity, 0.18)} transparent />
      </mesh>

      <Html
        distanceFactor={9}
        pointerEvents="none"
        position={[0, 2.18, 0.34]}
        sprite
        transform
        zIndexRange={[8, 0]}
      >
        <div
          className={[
            'world-label',
            isPositive ? 'world-label--positive' : 'world-label--negative',
            isResolved ? 'world-label--muted' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {gate.operation.label}
        </div>
      </Html>
    </group>
  )
}
