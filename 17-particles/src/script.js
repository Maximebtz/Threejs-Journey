import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
// const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/1.png')

/** 
 * cube
 
*/

// Geometry
const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)

// Material
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x000})

// Mesh
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

// Add
scene.add(cube)


/**
* Particles
*/
// Geometry
const particlesGeometry = new THREE.BufferGeometry(
    
)
const count = 500

const position = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for(let  i = 0; i < count * 3; i++)
{
    position[i] = (Math.random() - 0.5) * 30
    colors[i] = Math.random()
}

particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(position, 3)
)
particlesGeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colors, 3)
)

// Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    sizeAttenuation: true,
    transparent: true,
    alphaMap: particleTexture,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor(0xffffff, 0)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // update points
    particles.rotation.y = elapsedTime * Math.cos(elapsedTime * 0.1) * 0.05;
    particles.rotation.x = elapsedTime * Math.cos(elapsedTime * 0.1) * 0.05;
    // particles.rotation.z = elapsedTime * Math.sin(elapsedTime * 0.1) * 0.05;
    cube.rotation.y = elapsedTime * Math.cos(elapsedTime * 0.1) * -0.05;
    cube.rotation.x = elapsedTime * Math.cos(elapsedTime * 0.1) * -0.05;
    // cube.rotation.z = elapsedTime * Math.sin(elapsedTime * 0.1) * -0.05;
 
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()