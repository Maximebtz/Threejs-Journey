import * as THREE from 'three'

//* Canvas *//
const canvas = document.querySelector('canvas.webgl')

//* Scene *//
const scene = new THREE.Scene()

/**
 * Objects
 */
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 3, 2),
    new THREE.MeshBasicMaterial({ color: 0x00FF00 })
) 
cube1.position.x = -2
cube1.position.y = -2
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 3, 2),
    new THREE.MeshBasicMaterial({ color: 0xFF0000 })
)            
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 3, 2),
    new THREE.MeshBasicMaterial({ color: 0xFFF000 })
)
cube2.position.x = 2
cube2.position.y = 2
group.add(cube1, cube2, cube3)


// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)


// //* Positions *//
// // mesh.position.x = 0.7
// // mesh.position.y = - 0.6
// // mesh.position.z = 1
// mesh.position.set(0.7, 0, 1)


// //* Scale *//
// group.scale.set(2, 0.5, 0.5)


// //* Rotation *//
// mesh.rotation.reorder('YXZ') // Remettre dans l'axe si on a plusieurs rotations
// mesh.rotation.z = Math.PI / 2

// scene.add(mesh)

//* Helper *//
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 5
scene.add(camera)

//* LookAt *//
// camera.lookAt(mesh.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)