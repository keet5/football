const buttonStart = document.getElementsByClassName('menu_button')[0]

buttonStart.addEventListener('click', gameStart)

const field = document.getElementById('field')
const ball = document.getElementsByClassName('ball')[0]
const frames = document.getElementsByClassName('frame')

function gameStart() {
  frames[0].style.display = ''
  frames[1].style.display = 'block'

  ball.classList.add('ball_appear')
  ball.addEventListener('animationend', ballAppeared, { once: true })
}

function ballAppeared() {
  ball.classList.remove('ball_appear')
  ball.classList.add('ball_move')
  document.addEventListener('keydown', ballKick, { once: true })
}

function ballKick(event) {
  console.log('kick')
  const bottom = ball.offsetTop - ball.offsetHeight
  const size = ball.offsetWidth
  ball.style.left = ball.offsetLeft + 'px'

  ball.animate(
    [
      { transform: 'perspective(500px) translate3D(0, 0, 0)' },
      { transform: 'perspective(500px) translate3D(0, -500px, -500px)' },
      { transform: 'perspective(500px) translate3D(0, -400px, -1000px)' },
      { transform: 'perspective(500px) translate3D(0, -200px, -1000px)' },
    ],
    {
      duration: 1000,
    }
  )
  ball.classList.remove('ball_move')
}

window.onload = function () {
  frames[0].style.display = 'block'
}
