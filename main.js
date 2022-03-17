/* 필요한 변수 선언 */
const $map = document.querySelector('.map')
const $menuCount = document.querySelector('.menu__count')
const $menuTimer = document.querySelector('.menu__timer')
const $play = document.querySelector('.play')
const $stop = document.querySelector('.stop')
const $menuPlay = document.querySelector('.menu__play')
const $modal = document.querySelector('.modal')
const $modalContent = document.querySelector('.modal__content')
const bugs = []
const carrots = []
const BUG_COUNT = 10
const CARROT_COUNT = 10
let count = CARROT_COUNT
const ICON_SIZE = 40
let limitTime = '10'
let isPlaying = false
let intervalId
const bgAudio = new Audio('./sound/bg.mp3')
const bugAudio = new Audio('./sound/bug_pull.mp3')
bugAudio.loop = false
const carrotAudio = new Audio('./sound/carrot_pull.mp3')
carrotAudio.loop = false
const winAudio = new Audio('./sound/game_win.mp3')
winAudio.loop = false
const alertAudio = new Audio('./sound/alert.wav')
alertAudio.loop = false

/* 화면 오픈 시 수행되는 로직 */
renderBugs()
renderCarrots()
renderMenu()
bgAudio.play()

/* 타이머를 클릭하면 게임이 시작된다. */
$menuPlay.addEventListener('click', (e) => {
  if (isPlaying) {
    stopTimer()
  }
  else {
    startTimer()
  }

  isPlaying = !isPlaying
})

/* 당근을 클릭하면 클릭된 당근이 사라지고 Count가 줄어든다 */
$map.addEventListener('click', (e) => {
  if (!isPlaying) {
    return
  }

  if (e.target.matches('.carrot')) {
    carrotAudio.play()
    const target = e.target
    carrots.filter(carrot => carrot.dataset.id !== target.dataset.id)
    $map.removeChild(target)
    count = count - 1
    $menuCount.textContent = count

    if (count === 0) {
      winGame()
    }
  }
})

/* Bug를 클릭하면 클릭된 버그가 사라지고 게임이 종료된다 */
$map.addEventListener('click', (e) => {
  if (!isPlaying) {
    return
  }

  if (e.target.matches('.bug')) {
    bugAudio.play()
    const target = e.target
    $map.removeChild(target)
    lostGame()
  }
})

/* restart를 누르면 게임이 다시 시작된다 */
$modal.querySelector('.restart').addEventListener('click', restartHandler)

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
  $stop.classList.toggle('hidden')
  $play.classList.toggle('hidden')
  intervalId = window.setInterval(() => {
    limitTime = limitTime - 1
    $menuTimer.textContent = `${Math.floor(limitTime/60)}:${limitTime%60}`
    if (limitTime === 0) {
      window.clearInterval(intervalId)
      lostGame()
    }
  }, 1000)
}

function stopTimer () {
  $stop.classList.toggle('hidden')
  $play.classList.toggle('hidden')
  window.clearInterval(intervalId)
}

function lostGame () {
  alertAudio.play()
  stopTimer()
  $modal.classList.toggle('hidden')
  $modalContent.textContent = 'Game end 😥'
}

function winGame () {
  winAudio.play()
  stopTimer()
  $modal.classList.toggle('hidden')
  $modalContent.textContent = 'Congratularion ✨'
}

function restartHandler () {
  initState() 
  renderBugs()
  renderCarrots()
  renderMenu()
  $modal.classList.toggle('hidden')
}

function initState () {
  bugs.length = 0
  carrots.length = 0
  count = CARROT_COUNT
  limitTime = '10'
  isPlaying = false
  $map.innerHTML = ''
}

function renderMenu () {
  $menuTimer.textContent = `${Math.floor(limitTime/60)}:${limitTime%60}`
  $menuCount.textContent = carrots.length
}