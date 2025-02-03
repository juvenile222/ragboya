// Typing effect JavaScript
var speed = 50
var speed2 = 400
var str = document.getElementById("str")
var i = 0
var isRemoving = false

var messages = ["Developer", "Pega CSSA", "Roller Skater", "Swimmer"]

function action() {
  if (isRemoving) {
    if (str.innerText.length > 0) {
      str.innerText = str.innerText.substr(0, str.innerHTML.length - 1)
      setTimeout(action, speed2)
      return
    }
    isRemoving = false
    i++
    if (i >= messages.length) {
      i = 0
    }
    setTimeout(action, speed)
    return
  }
  var message = messages[i]
  str.innerText = message.substr(0, str.innerHTML.length + 1)
  if (str.innerText.length === message.length) {
    isRemoving = true
  }
  setTimeout(action, isRemoving ? speed2 : speed)
}

setTimeout(action, speed)

// Particles.js initialization JavaScript (Make sure Particles.js library is loaded FIRST)
// Create a new script element to load particles.js library dynamically
var particlesScript = document.createElement("script")
particlesScript.src =
  "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
particlesScript.onload = function () {
  // Call particlesJS after library loads
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 75,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 1,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0,
          sync: false,
        },
      },
      size: {
        value: 5,
        random: true,
        anim: {
          enable: false,
          speed: 3,
          size_min: 0.3,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 3,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 250,
          size: 0,
          duration: 2,
          opacity: 0.8,
          speed: 3,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  })
}
document.head.appendChild(particlesScript) // Add the script to the <head>
