import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap from 'gsap'

/**
 * Debug
 */
const gui = new GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor')
    .onChange(() => {
        material.color.set(parameters.materialColor)   
    })

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/** 
 * textures
 */

const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter
const particlesTexture = textureLoader.load('/textures/particles/1.png')

/**
 * Objects
 */
const objectsDistance = 4
// Material
const material = new THREE.MeshToonMaterial({ 
    color: parameters.materialColor,
    gradientMap: gradientTexture
})

// Mesh
const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material,
)

const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    material
)

const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
)

mesh1.position.y = - objectsDistance * 0
mesh2.position.y = - objectsDistance * 1
mesh3.position.y = - objectsDistance * 2

mesh1.position.x = 2
mesh2.position.x = -2
mesh3.position.x = 2

scene.add(mesh1, mesh2, mesh3)

const sectionMeshes = [mesh1, mesh2, mesh3]

for(const mesh of sectionMeshes) {
    // change mesh color when hover
    mesh.addEventListener('mouseover', () => {
        gsap.to(mesh.material.color, {
            r: 1,
            g: 1,
            b: 1,
            duration: 0.5
        })
    })
}

/** 
 * Particles
 */

const particlesGeometry = new THREE.BufferGeometry()
const count = 500
const position = new Float32Array(count * 3)

for (let i = 0; i < count * 3; i++) {
    position[i * 3] = (Math.random() - 0.5) * 10
    position[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * sectionMeshes.length
    position[i * 3 + 2] = (Math.random() - 0.5) * 10
}



particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(position, 3)
)


// Material
const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    size: 0.025,
    sizeAttenuation: true,
    transparent: true,
    alphaMap: particlesTexture,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    // vertexColors: true,
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
 * Lights
 */
const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight) 

/**
 * Camera
 */
// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
scene.add(camera)
cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/** 
 * Scroll
 */

let scrollY = window.scrollY
let currentSection = 0


window.addEventListener('scroll', () => {

    scrollY = window.scrollY

    const newSection = Math.round(scrollY / sizes.height)

    if (newSection !== currentSection) {
        currentSection = newSection
        
        gsap.to(sectionMeshes[currentSection].rotation, {
            x: '+=6',
            y: '+=3',
            duration: 1.5,
            ease: 'power2.inOut'
        })
    }
    
})

/** 
 * Cursor
 */

const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) => {

    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)

})

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    const paralaxX = cursor.x * 0.5
    const paralaxY = - cursor.y * 0.5

    // Update objects
    for(const meshes of sectionMeshes) {
        meshes.rotation.x += deltaTime * 0.1
        meshes.rotation.y += deltaTime * 0.12
    }

    // Update camera
    camera.position.y = - scrollY / sizes.height * objectsDistance
    cameraGroup.position.x +=  (paralaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y +=  (paralaxY - cameraGroup.position.y) * 5 * deltaTime

    // object animation 
    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()