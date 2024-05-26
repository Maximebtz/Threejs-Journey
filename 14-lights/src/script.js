import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

// directional light (like sun)
// const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
// scene.add(directionalLight)

// Hemisphere light
// const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xff0000, 1)
// scene.add(hemisphereLight)
// hemisphereLight.position.set(1, 2, 2)

// point light (like lamp)
// const pointLight = new THREE.PointLight(0xffffff, 20, 15)
// pointLight.position.set(1, 2, 2)
// scene.add(pointLight)

// rectAreaLight (like photography light or television)
// const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 6,  1, 7)
// rectAreaLight.position.set(-1, 0, 1)
// rectAreaLight.lookAt(new THREE.Vector3) // look at the center
// scene.add(rectAreaLight)

// spotLight (like lamp round shape)
const spotLight = new THREE.SpotLight(0x78ff00, 5, 20, Math.PI * 0.1, 0.5, 3)
spotLight.position.set(0, 3, 0)
scene.add(spotLight)

// gui.add(hemisphereLight, 'intensity').min(0).max(10).step(0.001)
// gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001)
// gui.add(directionalLight, 'intensity').min(0).max(3).step(0.001)
// gui.add(pointLight, 'intensity').min(0).max(10).step(0.001)
// gui.add(rectAreaLight, 'intensity').min(0).max(10).step(0.001)


/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()