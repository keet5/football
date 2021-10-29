window.onload = function () {
  // frames[1].style.display = 'block'
  // buttonStart.addEventListener('click', gameStart)
  gameStart()
}

// menu
//
const buttonStart = document.getElementsByClassName('menu_button')[0]

// move
//
const field = document.getElementsByClassName('field')[0]
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

// kick

const perspectiveRation = 0.8

function perspective(offset) {
  const fieldSize = field.offsetWidth
  const perspectiveSize = fieldSize * perspectiveRation

  return (fieldSize - perspectiveSize) / 2 + offset * 0.8
}

async function ballKick() {
  const bottom = ball.offsetTop - ball.offsetHeight
  const size = ball.offsetWidth
  const offset = ball.offsetLeft
  const gateSize = 420 - size
  const gateOffset = (perspective(field.offsetWidth) - gateSize) / 2

  const perspectiveOffset = perspective(offset)
  ball.classList.remove('ball_move')

  if (
    perspectiveOffset > gateOffset &&
    perspectiveOffset < gateOffset + gateSize
  ) {
    await goal(offset)
  } else {
    await miss(offset)
  }

  console.log('ok')
}

function goal(offset) {
  const sizeCSS = ball.offsetWidth * 0.5 + 'px'
  const animation = ball.animate(
    [
      { left: offset + 'px', bottom: '10px' },
      {
        left: perspective(offset) + 'px',
        bottom: '200px',
        width: sizeCSS,
        height: sizeCSS,
      },
      {
        left: perspective(offset) + 'px',
        bottom: '100px',
        width: sizeCSS,
        height: sizeCSS,
      },
    ],
    {
      duration: 1000,
      // fill: 'forwards',
    }
  )

  return new Promise((resolve) => {
    animation.onfinish = resolve
  })
}

function miss(offset) {
  const animation = ball.animate(
    [
      { left: offset + 'px', bottom: '10px' },
      {
        left: perspective(offset) + 'px',
        bottom: '300px',
        width: 0,
        height: 0,
      },
    ],
    {
      duration: 1000,
    }
  )

  return new Promise((resolve) => {
    animation.onfinish = resolve
  })
}
