import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group } from 'three'

interface PlayerProps {
  x: number
  units: number
  z: number
}

export function Player({ x, units, z }: PlayerProps) {
  const groupRef = useRef<Group>(null)
  const orbitRef = useRef<Group>(null)

  useFrame((state, delta) => {
    if (!groupRef.current || !orbitRef.current) {
      return
    }

    groupRef.current.position.x = x
    groupRef.current.position.z = z
    groupRef.current.position.y = 0.95 + Math.sin(state.clock.elapsedTime * 5) * 0.05

    orbitRef.current.rotation.y += delta * 1.35
  })

  const coreScale = 1 + Math.min(units * 0.03, 0.45)
  const satelliteCount = Math.min(Math.max(units - 1, 0), 8)

  return (
    <group ref={groupRef} position={[x, 0.95, z]}>
      <mesh castShadow receiveShadow position={[0, -0.5, 0]}>
        <cylinderGeometry args={[1.18, 1.5, 0.34, 8]} />
        <meshStandardMaterial color="#355d79" />
      </mesh>

      <mesh castShadow position={[0, 0.22, 0]} scale={coreScale}>
        <sphereGeometry args={[0.72, 18, 18]} />
        <meshStandardMaterial color="#72f1ff" emissive="#1a7185" emissiveIntensity={0.4} />
      </mesh>

      <mesh castShadow position={[0, 0.92, 0]}>
        <cylinderGeometry args={[0.16, 0.24, 0.58, 8]} />
        <meshStandardMaterial color="#ffe39f" />
      </mesh>

      <group ref={orbitRef} position={[0, 0.2, 0]}>
        {Array.from({ length: satelliteCount }, (_, index) => {
          const angle = (index / satelliteCount) * Math.PI * 2
          const radius = 1.2 + (index % 2) * 0.2

          return (
            <mesh
              key={index}
              castShadow
              position={[Math.cos(angle) * radius, 0.12 + (index % 3) * 0.12, Math.sin(angle) * radius]}
            >
              <sphereGeometry args={[0.2, 12, 12]} />
              <meshStandardMaterial color="#ffd57a" emissive="#ad6e1f" emissiveIntensity={0.25} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}
