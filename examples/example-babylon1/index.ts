import * as BABYLON from 'babylonjs'

const win: any = window
const engine: any = win.engine

window.onload = function() {
  win.canvas = document.getElementById('renderCanvas') // Get the canvas element
  win.engine = new BABYLON.Engine(win.canvas, true) // Generate the BABYLON 3D engine

  let scene = templateScene() // For purposes of this test we can set scene manually here.

  // Register a render loop to repeatedly render the scene
  engine.runRenderLoop(function() {
    scene.render()
  })

  // Watch for browser/canvas resize events
  win.addEventListener('resize', function() {
    engine.resize()
  })
}

let templateScene = function() {
  let engine = (window as any).engine
  let canvas = (window as any).canvas

  // Create the scene space
  let scene = new BABYLON.Scene(engine)

  // Add a camera to the scene and attach it to the canvas
  let camera = new BABYLON.ArcRotateCamera(
    'Camera',
    Math.PI / 2,
    Math.PI / 2,
    10,
    new BABYLON.Vector3(0, 0, 5),
    scene
  )

  camera.attachControl(canvas, true)

  // Add lights to the scene
  let light1 = new BABYLON.HemisphericLight(
    'light1',
    new BABYLON.Vector3(1, 1, 0),
    scene
  )

  console.log(light1)

  let light2 = new BABYLON.PointLight(
    'light2',
    new BABYLON.Vector3(0, 1, -1),
    scene
  )
  console.log(light2)

  // Add and manipulate meshes in the scene
  BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene)

  return scene
}
