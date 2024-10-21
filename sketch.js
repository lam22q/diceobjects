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
// Evaluate the result after the final roll
function checkResult() {
  let valueCounts = {};


  // Count occurrences of each dice value
for (let i = 0; i < dice.length; i++) {
  let value = dice[i].value;
  if (valueCounts[value]) {
    valueCounts[value]++;
  } else {
    valueCounts[value] = 1;
  }
}
// Check for combinations (pairs, three-of-a-kind, etc.)
let counts = Object.values(valueCounts);
  counts.sort((a, b) => b - a); // sort counts in descending order

  if (counts[0] === 5) {
    return "Five of a Kind!";
  } else if (counts[0] === 4) {
    return "Four of a Kind!";
  } else if (counts[0] === 3 && counts[1] === 2) {
    return "Full House!";
  } else if (counts[0] === 3) {
    return "Three of a Kind!";
  } else if (counts[0] === 2 && counts[1] === 2) {
    return "Two Pairs!";
  } else if (counts[0] === 2) {
    return "One Pair!";
  } else {
    return "No special combination";
  }
}
// Class for creating and controlling individual dice
class Die {
  constructor(size) {
    this.size = size;
    this.value = 1;
    this.frozen = false;
  }

  place(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    fill(255);
    if (this.frozen) {
      fill(200, 0, 0); // Change color if frozen
    }
    rect(this.x, this.y, this.size, this.size, 10);

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(this.size / 2);
    text(this.value, this.x + this.size / 2, this.y + this.size / 2);
  }

  roll() {
    if (!this.frozen) {
      this.value = floor(random(1, 7)); // Random value between 1 and 6
    }
  }

  isTouched(mx, my) {
    return mx > this.x && mx < this.x + this.size && my > this.y && my < this.y + this.size;
  }

  toggleFreeze() {
    this.frozen = !this.frozen;
  }
}