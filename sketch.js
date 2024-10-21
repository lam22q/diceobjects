let dice = [];
let numberOfDice = 5;
let rollCount = 0;
let maxRolls = 3;
let gameOver = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numberOfDice; i++) {
    dice[i] = new Die(50); // argument is the size of the die
  }
  textSize(24);
}

function draw() {
  background("darkolivegreen");
  
  // loop over the array and place+display each die
  for (let i = 0; i < dice.length; i++) {
    const die = dice[i]; // 'die' is a temporary variable for the current array item
    die.place(die.size*1.2*i+die.size, die.size*2); // place the die neatly in the row
    die.display(); // actually draw it on screen
  }

}

function mouseClicked() {
  // loop over the array of dice...
  for (let i = 0; i < dice.length; i++) {
    const die = dice[i];
    // if the cursor is over the current die, freeze/unfreeze that die
    if (die.isTouched(mouseX,mouseY)) {
      die.toggleFreeze();
    }
     // Display roll instructions and roll count
  fill(255);
  textAlign(LEFT, CENTER);
  text(`Rolls left: ${maxRolls - rollCount}`, 20, height - 60);

  if (gameOver) {
    const result = checkResult();
    text(`Game Over! Result: ${result}`, 20, height - 30);
  } else {
    text("Click dice to hold/freeze. Shake or press any key to roll.", 20, height - 30);
  }
}

// Roll the dice either by key press or device shake
function mouseClicked() {
  if (gameOver) return;

  for (let i = 0; i < dice.length; i++) {
    const die = dice[i];
    if (die.isTouched(mouseX, mouseY)) {
      die.toggleFreeze();
  }
}

// // Roll the dice either by key press or device shake.
function keyPressed() {
  if (!gameOver) {
    rollDice();
  }
}

// for phones...
function deviceShaken() {
  if (!gameOver) {
    rollDice();
  }
}

// loop over the array of dice and try to roll each one in turn
// (note that a die won't actually roll if it's frozen)
// also, output the list of values to the console
// Function to roll the dice (unless they are frozen)

function rollDice() {
  if (rollCount < maxRolls) {
    rollCount++;
  let list = "values: ";
  for (let i = 0; i < dice.length; i++) {
    const die = dice[i];
    die.roll();
    list = list + die.value + " ";
  }
  console.log(list);

   // Check if max rolls reached
   if (rollCount >= maxRolls) {
    gameOver = true;
  }
}

