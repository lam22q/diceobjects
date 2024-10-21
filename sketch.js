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
    die.place(die.size * 1.2 * i + die.size, die.size * 2); // place the die neatly in the row
    die.display(); // actually draw it on screen
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

// Mouse click event: Freeze/unfreeze the clicked dice
function mouseClicked() {
  if (gameOver) return;

  for (let i = 0; i < dice.length; i++) {
    const die = dice[i];
    if (die.isTouched(mouseX, mouseY)) {
      die.toggleFreeze();
    }
  }
}

// Roll the dice either by key press or device shake
function keyPressed() {
  if (!gameOver) {
    rollDice();
  }
}

function deviceShaken() {
  if (!gameOver) {
    rollDice();
  }
}

// Function to roll the dice (unless they are frozen)
function rollDice() {
  if (rollCount < maxRolls) {
    rollCount++;
    let list = "values: ";
    for (let i = 0; i < dice.length; i++) {
      const die = dice[i];
      die.roll();
      list += die.value + " ";
    }
    console.log(list);

    // Check if max rolls reached
    if (rollCount >= maxRolls) {
      gameOver = true;
    }
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

