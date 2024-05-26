import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/** 
 * Textures
*/
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {
    console.log('onStart')
}
loadingManager.onLoaded = () => {
    console.log('onLoaded')
}
loadingManager.onProgress = () => {
    console.log('onProgress')
}
loadingManager.onError = () => {
    console.log('onError')
}

const textureLoader = new  THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/Fence007C_2K-JPG/Fence007C_2K-JPG_Color.jpg')

colorTexture.colorSpace = THREE.SRGBColorSpace

const heightTexture = textureLoader.load('/textures/Fence007C_2K-JPG/Fence007C_2K-JPG_Displacement.jpg')
const metalnessTexture = textureLoader.load('/textures/Fence007C_2K-JPG/Fence007C_2K-JPG_Metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/Fence007C_2K-JPG/Fence007C_2K-JPG_Roughness.jpg')
const normalDxTexture = textureLoader.load('/textures/Fence007C_2K-JPG/Fence007C_2K-JPG_NormalDX.jpg')
const normalGlTexture = textureLoader.load('/textures/Fence007C_2K-JPG/Fence007C_2K-JPG_NormalGL.jpg')
const opacityTexture = textureLoader.load('/textures/Fence007C_2K-JPG/Fence007C_2K-JPG_Opacity.jpg')




// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

// colorTexture.generateMipmaps = false
// colorTexture.minFilter = THREE.LinearMipmapLinearFilter
// colorTexture.magFilter = THREE.NearestFilter

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshStandardMaterial({ 
    map: colorTexture,
    displacementMap: heightTexture,
    metalnessMap: metalnessTexture,
    roughnessMap: roughnessTexture,
    normalMap: normalDxTexture,
    alphaMap: opacityTexture,
    transparent: true,
    opacity: 1
})
 
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 10);
scene.add(ambientLight);

// Ajouter une lumière directionnelle
const directionalLight = new THREE.DirectionalLight(0xffffff, 20);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

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
camera.position.z = 1
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
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor( 0x000000, 0 );

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()