import { TRACK_WIDTH } from '../constants'

interface TrackProps {
  length: number
}

const dashSpacing = 6

export function Track({ length }: TrackProps) {
  const dashCount = Math.ceil(length / dashSpacing) + 1

  return (
    <group>
      <mesh position={[0, -0.04, length / 2]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[TRACK_WIDTH + 18, length + 42]} />
        <meshStandardMaterial color="#d9b58a" />
      </mesh>

      <mesh position={[0, 0, length / 2]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[TRACK_WIDTH, length + 10]} />
        <meshStandardMaterial color="#18324c" />
      </mesh>

      {[-1.7, 1.7].map((dividerX) =>
        Array.from({ length: dashCount }, (_, index) => (
          <mesh key={`${dividerX}-${index}`} position={[dividerX, 0.05, index * dashSpacing + 2]}>
            <boxGeometry args={[0.18, 0.1, 2.2]} />
            <meshStandardMaterial color="#f7e7be" />
          </mesh>
        )),
      )}

      {[-TRACK_WIDTH / 2 - 0.4, TRACK_WIDTH / 2 + 0.4].map((wallX) => (
        <mesh key={wallX} castShadow position={[wallX, 0.42, length / 2]}>
          <boxGeometry args={[0.55, 0.84, length + 12]} />
          <meshStandardMaterial color="#31506d" />
        </mesh>
      ))}

      <mesh position={[0, 0.06, 2]} receiveShadow>
        <boxGeometry args={[TRACK_WIDTH - 1, 0.1, 4]} />
        <meshStandardMaterial color="#254562" />
      </mesh>
    </group>
  )
}
