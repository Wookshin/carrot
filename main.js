const $map = document.querySelector('.map')
const $menuCount = document.querySelector('.menu__count')
const $menuTimer = document.querySelector('.menu__timer')
const $play = document.querySelector('.play')
const $stop = document.querySelector('.stop')
const $menuPlay = document.querySelector('.menu__play')
const bugs = []
const carrots = []
const BUG_COUNT = 10
const CARROT_COUNT = 10
let count = CARROT_COUNT
const ICON_SIZE = 40
let limitTime = '10'
let isPlaying = false
let intervalId;

renderBugs()
renderCarrots()

$menuTimer.textContent = `${Math.floor(limitTime/60)}:${limitTime%60}`
$menuCount.textContent = carrots.length

/* 타이머를 클릭하면 게임이 시작된다. */
$menuPlay.addEventListener('click', (e) => {
  if (isPlaying) {
    stopTimer()
  }
  else {
    startTimer()
  }
  $stop.classList.toggle('hidden')
  $play.classList.toggle('hidden')
  isPlaying = !isPlaying
})

/* 당근을 클릭하면 클릭된 당근이 사라지고 Count가 줄어든다 */
$map.addEventListener('click', (e) => {
  if (!isPlaying) {
    return 
  }  
  
  if (e.target.matches('.carrot')) {
    let target = e.target
    carrots.filter(carrot => carrot.dataset.id !== target.dataset.id)
    $map.removeChild(target)
    count = count - 1
    $menuCount.textContent = count
  }
})

function renderBugs () {
  for (let i = 0; i < BUG_COUNT; i++) {
    const bug = createBug()
    bugs.push(bug)
  }
  bugs.forEach(bug => $map.appendChild(bug))
}

function renderCarrots () {
  for (let i = 0; i < CARROT_COUNT; i++) {
    const carrot = createCarrot(i)
    carrots.push(carrot)
  }
  carrots.forEach(carrot => $map.appendChild(carrot))
}

function createBug () {
  const leftPos = $map.offsetLeft + Math.random() * ($map.clientWidth - ICON_SIZE)
  const topPos = Math.random() * ($map.clientHeight - ICON_SIZE)
  const bug = document.createElement('div')
  bug.classList.add('bug')
  bug.style.left = `${leftPos}px`
  bug.style.top = `${topPos}px`

  return bug
}

function createCarrot (id) {
  const leftPos = $map.offsetLeft + Math.random() * ($map.clientWidth - ICON_SIZE)
  const topPos = Math.random() * ($map.clientHeight - ICON_SIZE)
  const carrot = document.createElement('div')
  carrot.classList.add('carrot')
  carrot.dataset.id = id
  carrot.style.left = `${leftPos}px`
  carrot.style.top = `${topPos}px`

  return carrot
}

function startTimer () {
  intervalId = window.setInterval(() => {
    limitTime = limitTime - 1
    $menuTimer.textContent = `${Math.floor(limitTime/60)}:${limitTime%60}`
    if (limitTime === 0) {
      window.clearInterval(intervalId)
    }
  }, 1000)
}

function stopTimer () {
  window.clearInterval(intervalId)
}