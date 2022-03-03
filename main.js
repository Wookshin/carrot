const $map = document.querySelector('.map')
const bugs = []
const carrots = []
const BUG_COUNT = 10
const CARROT_COUNT = 10
const ICON_SIZE = 60

renderBugs()
renderCarrots()

function renderBugs () {
  for (let i = 0; i < BUG_COUNT; i++) {
    const bug = createBug()
    bugs.push(bug)
  }
  bugs.forEach(bug => $map.appendChild(bug))
}

function renderCarrots () {
  for (let i = 0; i < CARROT_COUNT; i++) {
    const carrot = createCarrot()
    carrots.push(carrot)
  }
  carrots.forEach(carrot => $map.appendChild(carrot))
}

function createBug () {
  const leftPos = $map.offsetLeft + Math.random() * ($map.clientWidth - ICON_SIZE)
  const topPos = $map.offsetTop + Math.random() * ($map.clientHeight - ICON_SIZE)
  const bug = document.createElement('div')
  bug.classList.add('bug')
  bug.style.left = `${leftPos}px`
  bug.style.top = `${topPos}px`

  return bug
}

function createCarrot () {
  const leftPos = $map.offsetLeft + Math.random() * ($map.clientWidth - ICON_SIZE)
  const topPos = $map.offsetTop + Math.random() * ($map.clientHeight - ICON_SIZE)
  const carrot = document.createElement('div')
  carrot.classList.add('carrot')
  carrot.style.left = `${leftPos}px`
  carrot.style.top = `${topPos}px`

  return carrot
}