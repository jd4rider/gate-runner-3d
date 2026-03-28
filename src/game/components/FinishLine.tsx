import { Html } from '@react-three/drei'
import { TRACK_WIDTH } from '../constants'

interface FinishLineProps {
  z: number
}

export function FinishLine({ z }: FinishLineProps) {
  return (
    <group position={[0, 0, z]}>
      <mesh castShadow position={[-TRACK_WIDTH / 2 + 0.7, 2.4, 0]}>
        <boxGeometry args={[0.42, 4.8, 0.42]} />
        <meshStandardMaterial color="#f0efe8" />
      </mesh>

      <mesh castShadow position={[TRACK_WIDTH / 2 - 0.7, 2.4, 0]}>
        <boxGeometry args={[0.42, 4.8, 0.42]} />
        <meshStandardMaterial color="#f0efe8" />
      </mesh>

      {Array.from({ length: 8 }, (_, column) =>
        Array.from({ length: 2 }, (_, row) => {
          const isDarkSquare = (column + row) % 2 === 0

          return (
            <mesh key={`${column}-${row}`} position={[-2.8 + column * 0.8, 4.18 - row * 0.62, 0]}>
              <boxGeometry args={[0.8, 0.62, 0.12]} />
              <meshStandardMaterial color={isDarkSquare ? '#102236' : '#fff6de'} />
            </mesh>
          )
        }),
      )}

      <mesh position={[0, 0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[TRACK_WIDTH, 2.5]} />
        <meshStandardMaterial color="#fff3dc" />
      </mesh>

      <Html
        distanceFactor={12}
        pointerEvents="none"
        position={[0, 5.2, 0]}
        sprite
        transform
        zIndexRange={[8, 0]}
      >
        <div className="world-label world-label--finish">finish</div>
      </Html>
    </group>
  )
}
