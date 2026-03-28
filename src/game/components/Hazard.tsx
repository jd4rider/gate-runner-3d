import { Html } from '@react-three/drei'
import { LANE_POSITIONS } from '../constants'
import type { HazardDefinition } from '../types'

interface HazardProps {
  hazard: HazardDefinition
  isResolved: boolean
}

export function Hazard({ hazard, isResolved }: HazardProps) {
  const x = LANE_POSITIONS[hazard.lane]
  const opacity = isResolved ? 0.2 : 1

  return (
    <group position={[x, 0, hazard.z]}>
      <mesh castShadow position={[0, 0.24, 0]}>
        <cylinderGeometry args={[1.02, 1.28, 0.28, 8]} />
        <meshStandardMaterial color="#61211d" opacity={opacity} transparent />
      </mesh>

      <mesh castShadow position={[0, 0.82, 0]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial
          color="#ff735c"
          emissive="#7f241b"
          emissiveIntensity={0.4}
          opacity={opacity}
          transparent
        />
      </mesh>

      {[
        [0.66, 0.48, 0.16],
        [-0.54, 0.58, -0.2],
        [0.12, 0.66, -0.62],
      ].map(([spikeX, spikeY, spikeZ], index) => (
        <mesh key={index} castShadow position={[spikeX, spikeY, spikeZ]}>
          <sphereGeometry args={[0.24, 10, 10]} />
          <meshStandardMaterial color="#ffc17a" opacity={opacity} transparent />
        </mesh>
      ))}

      <Html
        distanceFactor={9}
        pointerEvents="none"
        position={[0, 1.9, 0]}
        sprite
        transform
        zIndexRange={[8, 0]}
      >
        <div className={`world-label world-label--hazard ${isResolved ? 'world-label--muted' : ''}`}>
          -{hazard.damage}
        </div>
      </Html>
    </group>
  )
}
