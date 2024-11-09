let gameState = "welcome";
let fadeAmount = 0;
let startButton, backButton, profileButton;
let cardioButton, strengthButton;
let cardioDropdown, strengthDropdown;
let showCardio = false;
let showStrength = false;
let selectedWorkout = "";
let countdownTime = 0;
let startTime = 0;
let coins_amount = 10;
let shopButton;
let lastCoinTime = 0;
let petsButton, accessoriesButton;
let backButton2;
let purchasedItems = [];
let catImg, dogImg, bowImg, hatImg, swordImg, shieldImg;

let messageVisibleTime = 0;
let showMessage = false;
let showBought = false;

let notificationVisible = false;
let notificationMessage = "";
let notificationStartTime = 0;
let notificationDuration = 3000;

function preload() {
  catImg = loadImage('Cat.png');
  dogImg = loadImage('Dog.png');
  bowImg = loadImage('Bow.png');
  hatImg = loadImage('Hat.png');
  swordImg = loadImage('Sword.png');
  shieldImg = loadImage('Shield.png');
}


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

  profileButton = createButton('👤');
  profileButton.position(width - 70, 30);
  profileButton.size(60, 60);
  profileButton.style('font-size', '32px');
  profileButton.style('background-color', '#ffffff');
  profileButton.style('color', '#000000');
  profileButton.mousePressed(openProfilePage);
  profileButton.hide();

  shopButton = createButton('🛒');
  shopButton.position(width - 70, 30);
  shopButton.size(60, 60);
  shopButton.style('font-size', '32px');
  shopButton.style('background-color', '#ffffff');
  shopButton.style('color', '#000000');
  shopButton.mousePressed(openShop);
  shopButton.hide();

  petButton = createButton('Pets');
  petButton.position(width / 2 - 125, 500);
  petButton.size(250, 70);
  petButton.style('font-size', '28px');
  petButton.style('font-family', 'Poppins');
  petButton.style('background-color', '#ffffff');
  petButton.style('color', '#000000');
  petButton.hide();
  petButton.mousePressed(openPetPage);

  accessoriesButton = createButton('Accessories');
  accessoriesButton.position(width / 2 - 125, 600);
  accessoriesButton.size(250, 70);
  accessoriesButton.style('font-size', '28px');
  accessoriesButton.style('font-family', 'Poppins');
  accessoriesButton.style('background-color', '#ffffff');
  accessoriesButton.style('color', '#000000');
  accessoriesButton.hide();
  accessoriesButton.mousePressed(openAccessoriesPage);

  backButton3 = createButton('Back');
  backButton3.position(width / 2 - 50, height - 100);
  backButton3.size(100, 40);
  backButton3.style('font-size', '20px');
  backButton3.style('font-family', 'Poppins');
  backButton3.style('background-color', '#ffffff');
  backButton3.style('color', '#000000');
  backButton3.hide();
  backButton3.mousePressed(goBackToWorkoutMenu);

  backButton4 = createButton('Back');
  backButton4.position(width / 2 - 50, height - 100);
  backButton4.size(100, 40);
  backButton4.style('font-size', '20px');
  backButton4.style('font-family', 'Poppins');
  backButton4.style('background-color', '#ffffff');
  backButton4.style('color', '#000000');
  backButton4.hide();
  backButton4.mousePressed(goBackToWorkoutMenu);

  backButton = createButton('Back');
  backButton.position(width / 2 - 50, height - 100);
  backButton.size(100, 40);
  backButton.style('font-size', '20px');
  backButton.style('font-family', 'Poppins');
  backButton.style('background-color', '#ffffff');
  backButton.style('color', '#000000');
  backButton.hide();



  backButton2 = createButton('Back');
  backButton2.position(width / 2 - 50, height - 100);
  backButton2.size(100, 40);
  backButton2.style('font-size', '20px');
  backButton2.style('font-family', 'Poppins');
  backButton2.style('background-color', '#ffffff');
  backButton2.style('color', '#000000');
  backButton2.hide();
  backButton2.mousePressed(goBackToWelcomePage);

  if (gameState === "workout") {
    shopButton.show();
    backButton.show();
  }

  function goBackToWelcomePage() {
    gameState = "welcome";
    backButton2.hide();
    cardioButton.hide();
    strengthButton.hide();
    startButton.show();
    profileButton.show();
  }


  cardioButton = createButton('Cardio');
  cardioButton.position(width / 2 - 125, 300);
  cardioButton.size(250, 70);
  cardioButton.style('font-size', '28px');
  cardioButton.style('font-family', 'Poppins');
  cardioButton.style('background-color', '#ffffff');
  cardioButton.style('color', '#000000');
  cardioButton.hide();
  cardioButton.mousePressed(toggleCardioDropdown);

  strengthButton = createButton('Strength');
  strengthButton.position(width / 2 - 125, 400);
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
}

function startGame() {
  gameState = "workout";
  startButton.hide();
  profileButton.hide();
  showWorkoutMenu();
  fadeAmount = 255;
  backButton2.show();
}

function draw() {
  if (gameState === "welcome") {
    drawWelcomeScreen();
  } else if (gameState === "workout") {
    drawWorkoutMenu();
  } else if (gameState === "countdown") {
    drawCountdown();
  } else if (gameState === "shop") {
    drawShopMenu();
  } else if (gameState === "profile") {
    drawProfilePage();
  } else if (gameState === "petPage") {
    drawPetPage();
  } else if (gameState === "accessoriesPage") {
    drawAccessoriesPage();
  }

  drawCoin();

  if (fadeAmount > 0) {
    fadeAmount -= 5;
    fill(255, 255, 255, fadeAmount);
    rect(0, 0, width, height);
  }

  if (notificationVisible) {
    let elapsedTime = millis() - notificationStartTime;
    if (elapsedTime < notificationDuration) {
      fill(0); // Set text color
      textSize(24); // Set text size
      textAlign(CENTER, CENTER);
      text(notificationMessage, width / 2, 300); // Display the message
    } else {
      notificationVisible = false; // Hide the notification after the duration
    }
  }
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
  shopButton.hide();
  profileButton.show();
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

  if (gameState === "workout") {
    shopButton.show();
    backButton2.show();
  }
}

function openPetPage() {
  gameState = "petPage"; // Switch to pet page
  backButton3.show();
}

function openAccessoriesPage() {
  gameState = "accessoriesPage"; // Switch to accessories page
  backButton4.show();
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
  fadeAmount = 255;
  shopButton.show();
  hideBuyButtons();
  petButton.hide(); // Hide pet and accessories buttons
  accessoriesButton.hide();
  backButton3.hide();
  backButton4.hide();
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

  if (minutesPassed > (coins_amount - 10)) {
    //coins_amount = 10 + minutesPassed;
    coins_amount++;
    //text("Congrats! You have earned one coin! ", 500, 700);
    //print("Congrats! You have earned one coin!")
    // text("Congrats! You have earned one coin! ", 500, 700);
  }

  // Check if one minute has passed since the last coin was awarded
  if (timePassed - lastCoinTime >= 60) {
    lastCoinTime = timePassed; // Update the lastCoinTime
    //coins_amount++; // Increment the coin count
    showMessage = true;
    messageVisibleTime = millis();
    //text("Congratulations! You have earned one coin!", 500, 700);
    //console.log("Congratulations! You have earned one coin!");
  }

  // Display the congratulatory message for 5 seconds
  if (showMessage) {
    textSize(45);
    text("Congratulations! You have earned one coin!", 500, 700);
    if (millis() - messageVisibleTime > 5000) { // Check if 5 seconds have passed
      showMessage = false; // Hide the message
    }

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

function openShop() {
  gameState = "shop";
  shopButton.hide();
  fadeAmount = 255;
  hideWorkoutButtons();
  createShopButtons();
  drawShopMenu();
}

function hideWorkoutButtons() {
  cardioButton.hide();
  strengthButton.hide();
}

let shopItems = [
  { name: "Cat 🐱", price: 5 },
  { name: "Dog 🐶", price: 5 },
  { name: "Bow 🎀", price: 3 },
  { name: "Hat 🎩", price: 3 },
  { name: "Sword 🗡️", price: 8 },
  { name: "Shield 🛡️", price: 10 }
];

let itemButtons = [];

function createShopButtons() {
  let itemHeight = 60;
  let totalHeight = shopItems.length * itemHeight;
  let startY = height / 2 - totalHeight / 2;

  for (let i = 0; i < shopItems.length; i++) {
    let item = shopItems[i];

    let button = createButton(item.name + " - " + item.price + " coins");
    button.position(width / 2 - 150, startY + i * itemHeight);
    button.size(300, 50);
    button.style('font-size', '18px');
    button.style('font-family', 'Poppins');
    button.style('background-color', '#ffffff');
    button.style('color', '#000000');
    button.mousePressed(() => buyItem(item));
    itemButtons.push(button);
  }
}

function hideBuyButtons() {
  for (let button of itemButtons) {
    button.hide();
  }
  itemButtons = [];
}

function buyItem(item) {
  if (coins_amount >= item.price) {
    coins_amount -= item.price;
    purchasedItems.push(item.name); // Track the purchased item
    console.log("Bought", item.name);
  } else {
    console.log("Not enough coins to buy", item.name);
  }
}

function drawShopMenu() {
  background(173, 216, 230);
  fill(0);
  textAlign(CENTER);
  textSize(35);
  text('Shop', width / 2, 150);
  backButton.show();
  profileButton.hide();
}


function openProfilePage() {
  gameState = "profile";
  profileButton.hide();
  backButton.show();
}

function drawProfilePage() {
  background(173, 216, 230);
  fill(0);
  textSize(50);
  textAlign(CENTER);


  text('Profile', width / 2, 200);
  petButton.show();
  accessoriesButton.show();
  startButton.hide()
  petButton.position(width / 2 - 125, 300);
  accessoriesButton.position(width / 2 - 125, 400);

}


function drawPetPage() {
  background(173, 216, 230);
  fill(0);
  textSize(48);
  textAlign(CENTER);
  text("Pets Page", width / 2, 150);
  backButton3.show();
  petButton.hide();
  accessoriesButton.hide();


  for (let itemName of purchasedItems) {
    if (itemName === 'Cat 🐱') {
      image(catImg, width / 3, height / 3, 300, 300,);
    } else if (itemName === 'Dog 🐶') {
      image(dogImg, width / 2, height / 2, 300, 300, x = 40);
    }
  }


}

function drawAccessoriesPage() {
  background(173, 216, 230);
  fill(0);
  textSize(48);
  textAlign(CENTER);
  text("Accessories Page", width / 2, 150);
  backButton4.show();
  petButton.hide();
  accessoriesButton.hide();

  let yOffset = 100;
  for (let itemName of purchasedItems) {
    imageMode(100, 100);
    if (itemName === 'Bow 🎀') {
      image(bowImg, width / 2, yOffset + 100, 100, 100);
    } else if (itemName === 'Hat 🎩') {
      image(hatImg, width / 2, yOffset + 200, 100, 100);
    } else if (itemName === 'Sword 🗡️') {
      image(swordImg, width / 2, yOffset + 300, 100, 100);
    } else if (itemName === 'Shield 🛡️') {
      image(shieldImg, width / 2, yOffset + 400, 100, 100);
    }
  }
}
