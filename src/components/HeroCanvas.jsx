import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function makeDotTexture() {
  const s = 64
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0, 'rgba(255,244,214,1)')
  g.addColorStop(0.3, 'rgba(233,205,140,0.85)')
  g.addColorStop(1, 'rgba(233,205,140,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  const tex = new THREE.CanvasTexture(c)
  return tex
}

function GoldDust({ count = 300 }) {
  const ref = useRef()
  const tex = useMemo(() => makeDotTexture(), [])
  const { positions, speeds, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 7 - 2
      speeds[i] = 0.04 + Math.random() * 0.13
      sizes[i] = 0.5 + Math.random()
    }
    return { positions, speeds, sizes }
  }, [count])

  useFrame((state, dt) => {
    const g = ref.current
    if (!g) return
    const d = Math.min(dt, 0.05)
    const pos = g.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i] * d
      if (pos[i * 3 + 1] > 5.2) pos[i * 3 + 1] = -5.2
    }
    g.geometry.attributes.position.needsUpdate = true
    const px = state.pointer.x, py = state.pointer.y
    g.rotation.y += ((px * 0.22) - g.rotation.y) * 0.04
    g.rotation.x += ((-py * 0.14) - g.rotation.x) * 0.04
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        map={tex}
        color="#e9cd8c"
        size={0.11}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 7], fov: 55 }}
      style={{ pointerEvents: 'none' }}
      frameloop="always"
    >
      <GoldDust />
    </Canvas>
  )
}
