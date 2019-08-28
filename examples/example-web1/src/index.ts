import cat from './cat.jpg'

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

const main = document.getElementById('main')

main.innerHTML = `
  <h1>Hello world<h1>
  <img src="${cat}" width=400 />
`
