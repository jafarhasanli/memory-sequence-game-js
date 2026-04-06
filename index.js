// Create a game where you have to remember the order of flashing circles and then play them back from memory.

//     a. (2 pts) By moving the slider responsible for the number of circles, draw the amount of circles corresponding to the value of the slider in the element with the ID container. You can find an example of what a circle looks like in index.html.
//     b. (1 pt) When the "Start" button is pressed, fill the series array with 7 random integers ranging from 1 to the number of circles (inclusive). Output the series array to the console.
//     c. (1 pt) Also when the "Start" button is pressed, flash the first circle. Use the utility function toggleHighlight with the DOM element of the given circle as parameter. This function applies an animation to the selected element, then removes the animation as well.

//     d. (1 pt) If you are able to flash a circle then iterate over the generated series array and flash the circles which correspond to the stored elements. If we used a simple loop, all the circles would flash at the same time. Let's iterate over the array with 1 second delay. Use the idea from the lecture: rewrite the for loop as a while loop, then transform the loop into recursion, finally replace the recursive call with a timer.
// e. (1 pt) When a circle is clicked, read the circle's number and insert it into the solution array. Check whether the length of the solution array has reached the length of series. If the length is equal, then check whether the two arrays are the same. Output the result to the console.
// f. (1 pt) Write "Flashing circles..." while the circles are flashing and "Now, your turn..." when the flashing is over into the element with the ID output˙. Use the same element at the end of the game to display either "Nice job!" or "Failed!" depending on the result.
// g. (1 pt) Use a state variable (canGuess) to ignore the player's input if the flashing hasn't finished yet.



const inputCircleNumber = document.querySelector("#circle-number");
const buttonStart = document.querySelector("#start");
const divContainer = document.querySelector("#container");
const divOutput = document.querySelector("#output");

// Application state

let canGuess = false;
let solution = [];
let series = [];

// a. Draw circles when slider changes
inputCircleNumber.addEventListener("input", drawCircles);

drawCircles();

// b, c, d. Start button
buttonStart.addEventListener("click", startGame);

function startGame() {
  const n = parseInt(inputCircleNumber.value);

  series = [];
  solution = [];
  canGuess = false;

  for(let i = 0; i < 7; i++) {
    series.push(random(1, n));
  }

  console.log(series);

  divOutput.innerHTML = "Flashing circles...";

  flashSeries();
}

// d. Flash with delay using recursion + setTimeout
function flashSeries(i = 0) {
  if(i < series.length) {
    const circleNumber = series[i];
    const circle = divContainer.querySelector(`[data-number='${circleNumber}']`);
    if(circle) {
      toggleHighlight(circle);
    }

    setTimeout(() => flashSeries(i + 1), 1000);
  }
  else {
    canGuess = true;
    divOutput.innerHTML = "Now, your turn...";
  }
}

// e. Click on circles to build solution and compare
divContainer.addEventListener("click", clickedCircle);

function clickedCircle(e) {
  if(!canGuess) {
    return;
  }

  if(!e.target.classList.contains("circle")) {
    return;
  }

  const n = parseInt(e.target.dataset.number);
  solution.push(n);

  if(solution.length == series.length) {
    canGuess = false;

    let ok = true;
    for(let i = 0; i < series.length; i++) {
      if(series[i] != solution[i]) {
        ok = false;
      }
    }

    console.log(ok);

    // f. Output result
    if(ok) {
      divOutput.innerHTML = "Nice job!";
    }
    else {
      divOutput.innerHTML = "Failed!";
    }
  }
}

// a. Circle drawing function
function drawCircles() {
  const n = parseInt(inputCircleNumber.value);

  let circles = "";
  for(let i = 1; i <= n; i++) {
    circles += `<a class="circle" data-number="${i}"></a>`;
  }

  divContainer.innerHTML = circles;
}

// ========= Utility functions =========

function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function toggleHighlight(node) {
  node.classList.toggle("highlight")
  node.addEventListener("animationend", function (e) {
    node.classList.remove("highlight");
  }, {once: true});
}

// =====================================
