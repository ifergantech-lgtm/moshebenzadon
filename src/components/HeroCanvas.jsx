import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

// ---------- procedural glow texture (no network) ----------
function makeGlowTexture() {
  const s = 128
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0, 'rgba(255,244,200,1)')
  g.addColorStop(0.25, 'rgba(233,205,140,0.85)')
  g.addColorStop(0.65, 'rgba(200,160,60,0.25)')
  g.addColorStop(1, 'rgba(200,160,60,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  return new THREE.CanvasTexture(c)
}

// ---------- slow drifting golden star-dust (manual points for depth) ----------
function DepthDust({ count = 170, zRange = [-5.5, -1.5] }) {
  const ref = useRef()
  const tex = useMemo(() => makeGlowTexture(), [])

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = zRange[0] + Math.random() * (zRange[1] - zRange[0])
      speeds[i] = 0.012 + Math.random() * 0.035
    }
    return { positions, speeds }
  }, [count, zRange])

  useFrame((_, dt) => {
    const g = ref.current
    if (!g) return
    const d = Math.min(dt, 0.05)
    const pos = g.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i] * d
      if (pos[i * 3 + 1] > 6.5) pos[i * 3 + 1] = -6.5
    }
    g.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial map={tex} color="#d8b46a" size={0.07} sizeAttenuation transparent opacity={0.6} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

// ---------- scene: just the star/light field, with gentle pointer parallax ----------
function Scene() {
  const groupRef = useRef()
  const { pointer } = useThree()

  useFrame(() => {
    const g = groupRef.current
    if (!g) return
    g.rotation.y += (pointer.x * 0.14 - g.rotation.y) * 0.04
    g.rotation.x += (-pointer.y * 0.09 - g.rotation.x) * 0.04
    g.rotation.z += 0.0001
  })

  return (
    <group ref={groupRef}>
      {/* Foreground golden sparkles — the small star-like lights */}
      <Sparkles
        count={230}
        size={[3, 5, 2, 4, 3, 6, 2, 3, 5, 4, 3, 2]}
        speed={0.22}
        opacity={0.78}
        color="#e9cd8c"
        scale={[14, 9, 6]}
        noise={[0.6, 0.6, 0.6]}
      />
      {/* Mid-layer, deeper + dimmer for depth */}
      <Sparkles
        count={100}
        size={[1.5, 2.5, 1, 2, 1.5, 2]}
        speed={0.1}
        opacity={0.45}
        color="#d4a830"
        scale={[18, 12, 5]}
        noise={[0.4, 0.3, 0.4]}
      />
      {/* Slow drifting depth dust */}
      <DepthDust count={170} zRange={[-5.5, -1.5]} />
    </group>
  )
}

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 7], fov: 55 }}
      style={{ pointerEvents: 'none' }}
      frameloop="always"
    >
      <Scene />
    </Canvas>
  )
}
