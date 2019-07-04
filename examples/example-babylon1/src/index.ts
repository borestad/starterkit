import * as B from 'babylonjs'

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
const engine = new B.Engine(canvas, true)

// ----------------------------------------------------------------------------
// Scene Factory
// ----------------------------------------------------------------------------
function createScene() {
  // Create the scene space
  const scene = new B.Scene(engine)

  // Add a camera to the scene and attach it to the canvas
  const camera = new B.ArcRotateCamera(
    'Camera',
    Math.PI / 2,
    Math.PI / 2,
    2,
    new B.Vector3(0, 0, 5),
    scene
  )

  camera.attachControl(canvas, true)

  // Add lights to the scene
  const o: any = {}

  o.light1 = new B.HemisphericLight('light1', new B.Vector3(1, 1, 0), scene)
  o.light2 = new B.PointLight('light2', new B.Vector3(0, 1, -1), scene)
  // Add and manipulate meshes in the scene
  o.sphere = B.MeshBuilder.CreateSphere('sphere', { diameter: 3 }, scene)

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
