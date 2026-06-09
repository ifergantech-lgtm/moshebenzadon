import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sparkles, Float } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

// ---------- procedural textures (no network) ----------

function makeGlowTexture() {
  const s = 128
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0, 'rgba(255,244,200,1)')
  g.addColorStop(0.25, 'rgba(233,205,140,0.8)')
  g.addColorStop(0.65, 'rgba(200,160,60,0.25)')
  g.addColorStop(1, 'rgba(200,160,60,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  return new THREE.CanvasTexture(c)
}

// ---------- slow drifting background dust (manual points for depth) ----------

function DepthDust({ count = 180, zRange = [-6, -1] }) {
  const ref = useRef()
  const tex = useMemo(() => makeGlowTexture(), [])

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = zRange[0] + Math.random() * (zRange[1] - zRange[0])
      speeds[i] = 0.015 + Math.random() * 0.04
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
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={tex}
        color="#c8940a"
        size={0.07}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// ---------- single translucent geometric shard ----------

function GoldenShard({ position, rotation, scale, speed, rotIntensity, floatIntensity }) {
  const meshRef = useRef()

  return (
    <Float
      speed={speed}
      rotationIntensity={rotIntensity}
      floatIntensity={floatIntensity}
      floatingRange={[-0.3, 0.3]}
    >
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={scale}
      >
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#e9cd8c"
          emissive="#c8940a"
          emissiveIntensity={0.55}
          metalness={0.6}
          roughness={0.25}
          transparent
          opacity={0.18}
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </Float>
  )
}

// ---------- a subtle orb (icosahedron wireframe look via low-poly) ----------

function GoldenOrb({ position, scale, speed, floatIntensity }) {
  return (
    <Float
      speed={speed}
      rotationIntensity={0.4}
      floatIntensity={floatIntensity}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#f5e0a0"
          emissive="#d4a830"
          emissiveIntensity={0.7}
          metalness={0.8}
          roughness={0.15}
          transparent
          opacity={0.13}
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          wireframe
        />
      </mesh>
    </Float>
  )
}

// ---------- scene root: handles pointer parallax ----------

function Scene() {
  const groupRef = useRef()
  const { pointer } = useThree()

  useFrame(() => {
    const g = groupRef.current
    if (!g) return
    // Smooth lerp toward pointer — subtle, ~0.18 rad max
    g.rotation.y += (pointer.x * 0.18 - g.rotation.y) * 0.045
    g.rotation.x += (-pointer.y * 0.12 - g.rotation.x) * 0.045
    // Very slow continuous drift
    g.rotation.z += 0.00015
  })

  return (
    <group ref={groupRef}>
      {/* Ambient warm light */}
      <ambientLight intensity={0.4} color="#ffe8b0" />
      <pointLight position={[4, 6, 3]} intensity={1.2} color="#ffdf80" distance={18} decay={2} />
      <pointLight position={[-5, -3, 2]} intensity={0.5} color="#c88a20" distance={14} decay={2} />

      {/* Foreground Sparkles — golden embers, fills the view */}
      <Sparkles
        count={220}
        size={[3, 5, 2, 4, 3, 6, 2, 3, 5, 4, 3, 2]}
        speed={0.25}
        opacity={0.75}
        color="#e9cd8c"
        scale={[14, 9, 6]}
        noise={[0.6, 0.6, 0.6]}
      />

      {/* Mid-layer Sparkles — slightly deeper, slightly different colour */}
      <Sparkles
        count={90}
        size={[1.5, 2.5, 1, 2, 1.5, 2]}
        speed={0.12}
        opacity={0.45}
        color="#d4a830"
        scale={[18, 12, 5]}
        noise={[0.4, 0.3, 0.4]}
      />

      {/* Deep slow dust (manual points for z-depth parallax feel) */}
      <DepthDust count={160} zRange={[-5.5, -1.5]} />

      {/* Floating geometric shards */}
      <GoldenShard
        position={[-3.4, 1.2, 1.0]}
        rotation={[0.4, 0.7, 0.2]}
        scale={0.55}
        speed={0.7}
        rotIntensity={0.9}
        floatIntensity={0.8}
      />
      <GoldenShard
        position={[3.8, -1.0, 0.5]}
        rotation={[1.1, 0.3, 0.8]}
        scale={0.7}
        speed={0.5}
        rotIntensity={0.7}
        floatIntensity={1.0}
      />
      <GoldenShard
        position={[1.2, 2.6, -0.5]}
        rotation={[0.2, 1.2, 0.5]}
        scale={0.4}
        speed={0.9}
        rotIntensity={1.1}
        floatIntensity={0.6}
      />
      <GoldenShard
        position={[-4.5, -2.2, -1.0]}
        rotation={[0.9, 0.1, 1.3]}
        scale={0.5}
        speed={0.6}
        rotIntensity={0.6}
        floatIntensity={0.9}
      />

      {/* Floating orbs */}
      <GoldenOrb
        position={[2.5, 1.8, 0.2]}
        scale={0.45}
        speed={0.55}
        floatIntensity={1.1}
      />
      <GoldenOrb
        position={[-2.0, -1.6, -0.8]}
        scale={0.35}
        speed={0.8}
        floatIntensity={0.7}
      />
    </group>
  )
}

// ---------- export ----------

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 7], fov: 55 }}
      style={{ pointerEvents: 'none' }}
      frameloop="always"
    >
      <fog attach="fog" args={['#0a0608', 12, 30]} />
      <Scene />
    </Canvas>
  )
}
