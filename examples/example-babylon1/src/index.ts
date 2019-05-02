import * as BABYLON from 'babylonjs'

// ----------------------------------------------------------------------------
// DEBUG
// ----------------------------------------------------------------------------
if (module.hot) {
  let start = performance.now()

  module.hot.dispose(() => {
    start = performance.now()
  })

  module.hot.accept(() => {
    console.log(`Hotreload: took ${(performance.now() - start).toFixed(2)}ms`)
  })
}

// ----------------------------------------------------------------------------
//  SETUP
// ----------------------------------------------------------------------------
// Get the canvas element
const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement

// Generate the BABYLON 3D engine
const engine = new BABYLON.Engine(canvas, true)

// ----------------------------------------------------------------------------
// Scene Factory
// ----------------------------------------------------------------------------
function createScene () {
  // Create the scene space
  const scene = new BABYLON.Scene(engine)

  // Add a camera to the scene and attach it to the canvas
  const camera = new BABYLON.ArcRotateCamera(
    'Camera',
    Math.PI / 2,
    Math.PI / 2,
    2,
    new BABYLON.Vector3(0, 0, 5),
    scene
  )

  camera.attachControl(canvas, true)

  // Add lights to the scene
  const light1 = new BABYLON.HemisphericLight(
    'light1',
    new BABYLON.Vector3(1, 1, 0),
    scene
  )

  const light2 = new BABYLON.PointLight(
    'light2',
    new BABYLON.Vector3(0, 1, -1),
    scene
  )

  // Add and manipulate meshes in the scene
  const sphere = BABYLON.MeshBuilder.CreateSphere(
    'sphere',
    { diameter: 3 },
    scene
  )

  return scene
}

// ----------------------------------------------------------------------------
// MAIN
// ----------------------------------------------------------------------------
const scene = createScene()

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(() => {
  scene.render()
})

// Watch for browser/canvas resize events
window.addEventListener('resize', () => {
  engine.resize()
})
