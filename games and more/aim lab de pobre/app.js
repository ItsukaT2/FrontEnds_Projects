const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeElement = document.querySelector('#time')
const board = document.querySelector('#board')
const startAgainBtn = document.querySelector('.start-btn')
const colors = 
['radial-gradient(circle farthest-side at 10% 0,hsla(0,0%,100%,.5),hsla(0,0%,100%,0) 30%),linear-gradient(158deg, #8000ff, #ff75c0 44%, #ffd452)', 
'radial-gradient(circle farthest-side at 10% 0,hsla(0,0%,100%,.5),hsla(0,0%,100%,0) 30%),linear-gradient(158deg, #ff3737, #ffcc59 44%, #c6ffdd)', 
'radial-gradient(circle farthest-side at 10% 0,hsla(0,0%,100%,.5),hsla(0,0%,100%,0) 30%),linear-gradient(158deg, #0a1cbf, #764aef 44%, #fc35c6)', 
'radial-gradient(circle farthest-side at 10% 0,hsla(0,0%,100%,.5),hsla(0,0%,100%,0) 30%),linear-gradient(158deg, #ff1ddc, #2083d9 44%, #2bfff8)', 
'radial-gradient(circle farthest-side at 10% 0,hsla(0,0%,100%,.5),hsla(0,0%,100%,0) 30%),linear-gradient(158deg, #b1028e, #ff0286 44%, #ffc973)',
'radial-gradient(circle farthest-side at 10% 0,hsla(0,0%,100%,.5),hsla(0,0%,100%,0) 30%),linear-gradient(158deg, #fffb79, #15a80e 44%, #39dfff)',
'radial-gradient(circle farthest-side at 10% 0,hsla(0,0%,100%,.5),hsla(0,0%,100%,0) 30%),linear-gradient(158deg, #ff00a1, #ff7100 44%, #f9fcb0)',
'radial-gradient(circle farthest-side at 10% 0,hsla(0,0%,100%,.5),hsla(0,0%,100%,0) 30%),linear-gradient(158deg, #3d1635, #b8235a 44%, #ffe8eb)', 
'radial-gradient(circle farthest-side at 10% 0,hsla(0,0%,100%,.5),hsla(0,0%,100%,0) 30%),linear-gradient(158deg, #ff00ad, #d451ab 44%, #c5fff1)']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => 
{
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => 
{
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
       score++
       event.target.remove()
       createRandomCircle()
    }
})

function startGame () {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
      finishGame()   
    } else {
    let currentTime = --time
    if (currentTime < 10) {
        currentTime = `0${currentTime}`
    }
    setTime(currentTime)
   }
}

function setTime(value) {
    timeElement.innerHTML =`00:${value}`
}

function finishGame() {
    timeElement.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`
    setTimeout(() => 
       startAgainBtn.classList.add('visible'), 1500)
}

function startAgain() {
    window.location.reload()
}
startAgainBtn.addEventListener('click', startAgain) 


function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(5, width - size - 10)
    const y = getRandomNumber(5, height - size - 10)
    const color = getRandomColor()

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.left = `${x}px`
    circle.style.top = `${y}px`
    circle.style.background = color
    
    board.append(circle)
}

function getRandomNumber(min, max) {
   return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}