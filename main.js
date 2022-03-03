const $map = document.querySelector('.map')
const $menuCount = document.querySelector('.menu__count')
const $menuTimer = document.querySelector('.menu__timer')
const bugs = []
const carrots = []
const BUG_COUNT = 10
const CARROT_COUNT = 10
const ICON_SIZE = 60
let limitTime = '10'

renderBugs()
renderCarrots()

$menuTimer.textContent = `${Math.floor(limitTime/60)}:${limitTime%60}`
$menuCount.textContent = carrots.length

startTimer()

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

function startTimer () {
  var intervalId = window.setInterval(() => {
    limitTime = limitTime - 1
    $menuTimer.textContent = `${Math.floor(limitTime/60)}:${limitTime%60}`
    if (limitTime === 0) {
      window.clearInterval(intervalId)
    }
  }, 1000)
}