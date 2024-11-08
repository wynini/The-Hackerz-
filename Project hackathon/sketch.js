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
let coins_amount = 0;

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

function startGame() {
  gameState = "workout"; 
  startButton.hide();
  showWorkoutMenu();
}

function draw() {
  if (gameState === "welcome") {
    drawWelcomeScreen();
  } else if (gameState === "workout") {
    drawWorkoutMenu();
  } else if (gameState === "countdown") {
    drawCountdown();
  }
  drawCoin();
}

function drawCoin() {
  fill(255, 215, 0);
  strokeWeight(5);
  stroke(218, 165, 32);
  ellipse(50, 40, 60, 60);

  fill(0);
  noStroke();
  textSize(15);
  text(`Coins: ${nf(coins_amount, 3, 0)}`, 150, 50);
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
  if (workout === '1-min Push-Ups' || workout === '1-min Planks') {
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

  let minutesPassed = floor(timePassed / 60);
  if (minutesPassed > coins_amount) {
    coins_amount = minutesPassed; // Add 1 coin for every minute passed
  }

  textFont('Poppins');
  textAlign(CENTER);
  textSize(128);
  fill(0);
  text(timeString, width / 2, height / 2);
}

function drawGradient() {
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(173, 216, 230), color(138, 43, 226), inter);
    stroke(c);
    line(0, i, width, i);
  }
}
