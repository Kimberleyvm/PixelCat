let honger = 0;
let geluk = 100;
let energie = 100;
let isAnimating = false;
let blinkInterval;
const frameWidth = 200; // Breedte van elk frame
const blinkFrames = 5; // Aantal frames in de standaard animatie
let blinkCurrentFrame = 0;

let feedClicks = 0;
let playClicks = 0;
let sleepClicks = 0;

document.getElementById('feed-btn').addEventListener('click', function() {
  honger -= 10; // Verlaag de hongerwaarde
  feedClicks++;
  updateStatus();
  animateSprite('feed', 5); // Geef het aantal frames voor de voeranimatie mee
});

document.getElementById('play-btn').addEventListener('click', function() {
  if (energie > 0) {
    geluk += 10;
    energie -= 10;
    playClicks++;
    updateStatus();
    animateSprite('play', 5); // Geef het aantal frames voor de speelanimatie mee
  }
});

document.getElementById('sleep-btn').addEventListener('click', function() {
  energie += 20;
  sleepClicks++;
  updateStatus();
});

function updateStatus() {
  document.getElementById('status').innerText = `
    ${feedClicks} mensen hebben mij gevoerd!
    ${playClicks} mensen hebben met mij gespeeld!
    ${sleepClicks} mensen hebben mij laten slapen!
  `;
}

// Timer om de status bij te werken
setInterval(function() {
  honger += 1;
  geluk -= 1;
  energie -= 1;
  updateStatus();
}, 10000); // Elke 10 seconden

function animateSprite(action, frames) {
  if (isAnimating) return; // Voorkom overlappende animaties
  isAnimating = true;
  clearInterval(blinkInterval); // Pauzeer de standaard animatie

  let currentFrame = 0;
  let spritesheet; 

  if (action === 'feed') {
    spritesheet = 'img/spritesheetfood.png'; // Vervang met het juiste pad naar de voeranimatie spritesheet
  } else if (action === 'play') {
    spritesheet = 'img/spritesheet5.png'; // Vervang met het juiste pad naar de speelanimatie spritesheet
  }

  document.getElementById('dier').style.backgroundImage = `url(${spritesheet})`;

  function showNextFrame() {
    currentFrame++;
    if (currentFrame < frames) {
      let offsetX = -currentFrame * frameWidth;
      document.getElementById('dier').style.backgroundPosition = `${offsetX}px 0`;
      setTimeout(showNextFrame, 500); // Pas de tijd aan tussen frames
    } else {
      // Direct terug naar de standaard animatie zonder vertraging
      isAnimating = false;
      document.getElementById('dier').style.backgroundImage = 'url(img/spritesheetblink2.png)'; // Terug naar de standaard animatie spritesheet
      startBlinkingAnimation(); // Hervat de standaard animatie
    }
  }

  showNextFrame();
}

// Start de standaard animatie (knipperen) bij het laden van de pagina
function startBlinkingAnimation() {
  blinkInterval = setInterval(function() {
    if (!isAnimating) {
      blinkCurrentFrame = (blinkCurrentFrame + 1) % blinkFrames;
      let offsetX = -blinkCurrentFrame * frameWidth;
      document.getElementById('dier').style.backgroundPosition = `${offsetX}px 0`;
    }
  }, 1000); // Pas de tijd aan tussen frames
}

// Start de standaard animatie
startBlinkingAnimation();
