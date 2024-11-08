let gameState = "welcome"; 
let fadeAmount = 0;
let startButton, backButton;
let cardioButton, strengthButton;
let cardioDropdown, strengthDropdown;
let showCardio = false;
let showStrength = false;
let selectedWorkout = "";
let countdownTime = 0;
let startTime = 0;
let level = 1;
let min_Xp = 0;
let max_Xp = 100;
let XP_increment = 1;
var outer_Xp;

function setup() {
  createCanvas(1000, 1000);

  textFont('Poppins');

  startButton = createButton('Start');
  startButton.position(width / 2 - 75, height / 2 + 50);
  startButton.size(150, 50);
  startButton.style('font-size', '24px');
  startButton.style('font-family', 'Poppins');
  startButton.style('background-color', '#ffffff');
  startButton.style('color', '#000000');
  startButton.mousePressed(startGame);

  cardioButton = createButton('Cardio');
  cardioButton.position(width / 2 - 100, 300);
  cardioButton.size(250, 70);
  cardioButton.style('font-size', '28px');
  cardioButton.style('font-family', 'Poppins');
  cardioButton.style('background-color', '#ffffff');
  cardioButton.style('color', '#000000');
  cardioButton.hide();
  cardioButton.mousePressed(toggleCardioDropdown);

  strengthButton = createButton('Strength');
  strengthButton.position(width / 2 - 100, 400);
  strengthButton.size(250, 70);
  strengthButton.style('font-size', '28px');
  strengthButton.style('font-family', 'Poppins');
  strengthButton.style('background-color', '#ffffff');
  strengthButton.style('color', '#000000');
  strengthButton.hide();
  strengthButton.mousePressed(toggleStrengthDropdown);

  backButton = createButton('Back');
  backButton.position(width / 2 - 50, height - 100);
  backButton.size(100, 40);
  backButton.style('font-size', '20px');
  backButton.style('font-family', 'Poppins');
  backButton.style('background-color', '#ffffff');
  backButton.style('color', '#000000');
  backButton.hide();
  backButton.mousePressed(goBackToWorkoutMenu);

  cardioDropdown = createSelect();
  cardioDropdown.position(width / 2 - 100, 370);
  cardioDropdown.option('Select your workout');
  cardioDropdown.option('15-min Run');
  cardioDropdown.option('30-min Run');
  cardioDropdown.hide();
  cardioDropdown.changed(startSelectedCardio);

  strengthDropdown = createSelect();
  strengthDropdown.position(width / 2 - 100, 470);
  strengthDropdown.option('Select your workout');
  strengthDropdown.option('1-min Push-Ups');
  strengthDropdown.option('1-min Planks');
  strengthDropdown.hide();
  strengthDropdown.changed(startSelectedStrength);

  outer_Xp = {
    height: 300,
    length: 50,
    size: 1
  };
}

function draw() {
  if (gameState === "welcome") {
    drawWelcomeScreen();
  } else if (gameState === "workout") {
    drawWorkoutMenu();
  } else if (gameState === "countdown") {
    drawCountdown();
  }
  
  drawXPBar();
}

function drawXPBar() {
  // Outer rectangle
  noFill();
  strokeWeight(4);
  stroke(0);
  rect(50, 30, outer_Xp.height * outer_Xp.size, outer_Xp.length * outer_Xp.size);

  noStroke();
  fill(0, 0, 128);
  let barWidth = (min_Xp / max_Xp) * (outer_Xp.height + 100);
  rect(50, 30, barWidth, outer_Xp.length * outer_Xp.size);

  fill(0);
  textSize(16);
  text(`Level: ${level}`, 50, 20);
}

function drawCountdown() {
  background(173, 216, 230);

  let timePassed = floor((millis() - startTime) / 1000);
  let remainingTime = countdownTime - timePassed;

  if (remainingTime <= 0) {
    remainingTime = 0;
  }

  let minutes = floor(remainingTime / 60);
  let seconds = remainingTime % 60;
  let timeString = nf(minutes, 2) + ":" + nf(seconds, 2);

  textFont('Poppins');
  textAlign(CENTER);
  textSize(128);
  fill(0);
  text(timeString, width / 2, height / 2);

  if (remainingTime === 0) {
    setTimeout(() => {
      gameState = "workout"; 
      showWorkoutMenu();
      backButton.hide();
    }, 1000);
  }

  if (remainingTime > 0) {
    updateXP();
  }
}

function updateXP() {
  min_Xp += XP_increment;
  min_Xp = min(min_Xp, max_Xp - 25); 
  if (min_Xp >= max_Xp) {
    levelUp();
  }
}

function levelUp() {
  level += 1;
  min_Xp = 0; 
  max_Xp += 50; 
}

function drawWelcomeScreen() {
  background(173, 216, 230);

  textFont('Poppins');
  textAlign(CENTER);
  textSize(64);
  textStyle(BOLD);
  fill(0);
  text('Welcome to FitQuest', width / 2, height / 2 - 100);
}

function startGame() {
  gameState = "workout"; 
  startButton.hide();
  showWorkoutMenu();
}

function drawWorkoutMenu() {
  drawGradient();
  fill(0);
  textSize(48);
  textStyle(BOLD);
  textAlign(CENTER);
  text('Select Your Workout', width / 2, 150);

  cardioButton.position(width / 2 - 125, 300);
  strengthButton.position(width / 2 - 125, 400);
}

function showWorkoutMenu() {
  cardioButton.show();
  strengthButton.show();
}

function toggleCardioDropdown() {
  showCardio = !showCardio;
  if (showCardio) {
    cardioDropdown.show();
    strengthDropdown.hide();
  } else {
    cardioDropdown.hide();
  }
}

function toggleStrengthDropdown() {
  showStrength = !showStrength;
  if (showStrength) {
    strengthDropdown.show();
    cardioDropdown.hide();
  } else {
    strengthDropdown.hide();
  }
}

function startSelectedCardio() {
  let workout = cardioDropdown.value();
  if (workout === '15-min Run') {
    countdownTime = 15 * 60;
  } else if (workout === '30-min Run') {
    countdownTime = 30 * 60;
  }
  if (workout !== 'Select your workout') {
    startCountdown();
  }
}

function startSelectedStrength() {
  let workout = strengthDropdown.value();
  if (workout === '1-min Push-Ups') {
    countdownTime = 1 * 60;
  } else if (workout === '1-min Planks') {
    countdownTime = 1 * 60;
  }
  if (workout !== 'Select your workout') {
    startCountdown();
  }
}

function startCountdown() {
  gameState = "countdown"; 
  startTime = millis();
  cardioButton.hide();
  strengthButton.hide();
  cardioDropdown.hide();
  strengthDropdown.hide();
  backButton.show();
}

function goBackToWorkoutMenu() {
  gameState = "workout"; 
  showWorkoutMenu();
  backButton.hide();
}

function drawGradient() {
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(173, 216, 230), color(138, 43, 226), inter);
    stroke(c);
    line(0, i, width, i);
  }
}