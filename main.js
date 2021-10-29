window.onload = function () {
  frames[0].style.display = 'block'
  buttonStart.addEventListener('click', gameInitialization)
  // gameInitialization()
  // frames[2].style.display = 'block'
}

// menu
//
const buttonStart = document.getElementsByClassName('menu_button')[0]

// move
//
const field = document.getElementsByClassName('field')[0]
const ball = document.getElementsByClassName('ball')[0]
const frames = document.getElementsByClassName('frame')
const attemps = document.getElementsByClassName('attemps')[0]
const slide = document.getElementsByClassName('slide')[0]
const data = JSON.parse(
  '[{"word":"\u0432<b>\u0440\u0435</b>\u043c\u044f","slides_passed":1,"slides_left":14,"percent_passed":5,"percent_left":95},{"word":"<b>\u0436\u0438</b>\u0437\u043d\u044c","slides_passed":2,"slides_left":13,"percent_passed":15,"percent_left":85},{"word":"\u0441<b>\u043b\u043e</b>\u0432\u043e","slides_passed":3,"slides_left":12,"percent_passed":20,"percent_left":80},{"word":"<b>\u043c\u0435</b>\u0441\u0442\u043e","slides_passed":4,"slides_left":11,"percent_passed":25,"percent_left":75},{"word":"<b>\u0447\u0430</b>\u0441\u0442\u044c","slides_passed":5,"slides_left":10,"percent_passed":35,"percent_left":65},{"word":"\u0437\u0435\u043c<b>\u043b\u044f</b>","slides_passed":6,"slides_left":9,"percent_passed":40,"percent_left":60},{"word":"\u043f<b>\u0440\u0430</b>\u0432\u043e","slides_passed":7,"slides_left":8,"percent_passed":45,"percent_left":55},{"word":"\u0434<b>\u0432\u0435</b>\u0440\u044c","slides_passed":8,"slides_left":7,"percent_passed":55,"percent_left":45},{"word":"<b>\u043e</b>\u0431\u0440\u0430\u0437","slides_passed":9,"slides_left":6,"percent_passed":60,"percent_left":40},{"word":"\u0432\u043e\u0439<b>\u043d\u0430</b>","slides_passed":10,"slides_left":5,"percent_passed":65,"percent_left":35},{"word":"\u043a<b>\u043d\u0438</b>\u0433\u0430","slides_passed":11,"slides_left":4,"percent_passed":75,"percent_left":25},{"word":"\u0447\u0438\u0441<b>\u043b\u043e</b>","slides_passed":12,"slides_left":3,"percent_passed":80,"percent_left":20},{"word":"<b>\u0444\u043e</b>\u0440\u043c\u0430","slides_passed":13,"slides_left":2,"percent_passed":85,"percent_left":15},{"word":"\u0441<b>\u0432\u044f</b>\u0437\u044c","slides_passed":14,"slides_left":1,"percent_passed":95,"percent_left":5}]'
).sort((a, b) => {
  if (a.slides_passed > b.slides_passed) {
    return 1
  } else {
    return -1
  }
})

let attempCounter
let currentWord

function gameInitialization() {
  attempCounter = 4
  Array(attempCounter)
    .fill(0)
    .forEach((_) => {
      const attemp = document.createElement('div')
      attemp.classList.add('attemp')
      attemps.appendChild(attemp)
    })

  frames[0].style.display = ''
  frames[2].style.display = ''
  frames[1].style.display = 'block'
  currentWord = 0

  gameStart()
}

function gameEnd() {
  console.log('the end')
  frames[1].style.display = ''
  frames[2].style.display = 'block'
}

function gameStart() {
  slide.innerHTML = data[currentWord].word
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

function attempCounterDecrease() {
  attempCounter--
  attemps.children[0].remove()
}

async function ballKick() {
  const bottom = ball.offsetTop - ball.offsetHeight
  const size = ball.offsetWidth
  const offset = ball.offsetLeft
  const gateSize = 420 + size
  const gateOffset = (perspective(field.offsetWidth) - gateSize) / 2

  const perspectiveOffset = perspective(offset)
  ball.classList.remove('ball_move')

  let animation
  if (
    perspectiveOffset > gateOffset + size &&
    perspectiveOffset < gateOffset + gateSize
  ) {
    // goal
    const sizeCSS = ball.offsetWidth * 0.5 + 'px'
    animation = ball.animate(
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
      }
    )

    currentWord++

    if (currentWord == data.length) {
      gameEnd()
    } else {
      gameStart()
    }
  } else {
    // miss
    animation = ball.animate(
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

    if (attempCounter) {
      attempCounterDecrease()
      gameStart()
    } else {
      gameEnd()
    }
  }

  await new Promise((resolve) => {
    animation.onfinish = resolve
  })
}
