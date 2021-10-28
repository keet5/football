const field = document.getElementById('field')
const ball = document.getElementsByClassName('ball')[0]

// const field_width = game.getBoundingClientRect().width
// const ball_diametr = ball.getBoundingClientRect().width
// const ball_length_radius = Math.PI * ball.getBoundingClientRect().width
//
//
function ballKick(event) {
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

  // ball.classList.remove('ball_here')
  // ball.classList.add('ball_goal')
  // ball.classList.add('ball_there')
  // ball.animate([])
  document.removeEventListener('keydown', ballKick)
}

function ballAppeared(event) {
  ball.classList.remove('ball_appear')
  ball.classList.add('ball_move')
}

window.onload = function () {
  ball.classList.add('ball_here')
  ball.classList.add('ball_appear')
  ball.addEventListener('animationend', ballAppeared)
  document.addEventListener('keydown', ballKick)
}
